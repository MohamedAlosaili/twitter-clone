import asyncHandler from "./asyncHandler.js";

const advancedResults = asyncHandler(async (req, res) => {
  let { page: pageNum, limit: limitNum, select, sort, ...filters } = req.query;

  filters = JSON.parse(
    JSON.stringify(filters).replace(
      /\b(lt|lte|in|nin|gt|gte|ne)\b/g,
      str => `$${str}`
    )
  );

  const controllerFilters = req.controllerFilters
    ? { ...req.controllerFilters }
    : {};

  const queryArg = req.aggregatePipeline
    ? req.aggregatePipeline
    : {
        ...filters,
        ...controllerFilters,
      };

  let query = req.model[req.queryMethod](queryArg);

  if (sort) {
    query = query.sort(sort);
  } else {
    query = query.sort("-createdAt");
  }

  // aggregate.select() is not a function
  if (select && !req.aggregatePipeline) {
    select = select.replace(/,/g, " ");
    query = query.select(select);
  }

  if (req.populate) {
    query = query.populate(req.populate);
  }

  const { page, limit, startIndex } = getPageAndLimit(pageNum, limitNum);

  const countDocuments = req.countDocuments
    ? req.countDocuments
    : req.model.countDocuments(controllerFilters);

  let [result, total] = await Promise.all([
    query.skip(startIndex).limit(limit),
    countDocuments,
  ]);

  // aggregate() queryMethod will come with countDocuments result like this => [{ count: number }]
  if (Array.isArray(total)) {
    total = total[0]?.count ?? 0;
  }

  const pagination = getPagination(page, limit, total, result.length);

  res.json({
    success: true,
    data: result,
    pagination,
    total,
  });
});

const getPageAndLimit = (pageNum, limitNum) => {
  let page = Math.abs(parseInt(pageNum)) || 1;
  let limit = Math.abs(parseInt(limitNum)) || 25;

  const startIndex = (page - 1) * limit;

  return { startIndex, page, limit };
};

const getPagination = (page, limit, total, pageSize) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const pagination = {
    next: false,
    prev: false,
    limit,
    page,
    pageSize,
    totalPages: Math.ceil(total / limit),
  };

  if (endIndex < total) {
    pagination.next = true;
  }

  if (startIndex > 0) {
    pagination.prev = true;
  }

  return pagination;
};

export default advancedResults;
