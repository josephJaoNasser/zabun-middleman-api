module.exports = function (query) {
  const {
    page,
    pageSize,
    sortBy,
    sortOrder,
    priceMin,
    priceMax,
    bedroomMin,
    bedroomMax,
    bathroomMin,
    bathroomMax,
    archived,
    kind,
    transaction_ids,
    type_ids,
  } = query;

  const searchParams = {
    filtering: {
      kind,
      archived,
      public: true,
      price: {
        minimum: +priceMin,
        maximum: +priceMax,
      },
      bedroom_count: {
        minimum: +bedroomMin,
        maximum: +bedroomMax,
      },
      bathroom_count: {
        minimum: +bathroomMin,
        maximum: +bathroomMax,
      },
    },
    paging: {
      page: +page,
      size: +pageSize,
    },
    sorting: {
      sort: sortBy,
      order: sortOrder,
    },
  };

  if (transaction_ids?.length) {
    searchParams.filtering.transaction_ids = transaction_ids.split(",");
  }

  if (type_ids?.length) {
    searchParams.filtering.type_ids = type_ids.split(",");
  }

  if (query.public == "false") {
    searchParams.filtering.public = false;
  }

  return searchParams;
};
