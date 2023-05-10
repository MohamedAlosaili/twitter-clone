export const getPageAndLimit = (pageNum, limitNum) => {
  let page = Math.abs(parseInt(pageNum)) || 1;
  let limit = Math.abs(parseInt(limitNum)) || 25;

  const startIndex = (page - 1) * limit;

  return { startIndex, page, limit };
};

export const getPagination = (page, limit, total, pageSize) => {
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
