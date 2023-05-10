import asyncHandler from "./asyncHandler.js";
import { getPageAndLimit, getPagination } from "../utils/pagination.js";

const advancedResults = asyncHandler(async (req, res) => {
  let { page: pageNum, limit: limitNum, select, sort, ...filters } = req.query;

  filters = JSON.parse(
    JSON.stringify(filters).replace(/\b(lt|lte|in|gt|gte)\b/g, str => `$${str}`)
  );

  const controllerFilters = req.controllerFilters
    ? { ...req.controllerFilters }
    : {};

  let query = req.model[req.queryMethod]({
    ...filters,
    ...controllerFilters,
  });

  if (sort) {
    query = query.sort(sort);
  } else {
    query = query.sort("-createdAt");
  }

  if (select) {
    select = select.replace(/,/g, " ");
    query = query.select(select);
  }

  if (req.populate) {
    query = query.populate(req.populate);
  }

  const { page, limit, startIndex } = getPageAndLimit(pageNum, limitNum);

  const total = await req.model.countDocuments(controllerFilters);
  const result = await query.skip(startIndex).limit(limit);

  const pagination = getPagination(page, limit, total, result.length);

  res.json({
    success: true,
    data: result,
    pagination,
    total,
  });
});

export default advancedResults;
