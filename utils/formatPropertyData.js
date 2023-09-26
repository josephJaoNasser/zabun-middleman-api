module.exports = function formatPropertyData(property, suplimentaryInfo) {
  const {
    layouts: layoutTypes,
    facilities: facilityTypes,
    transactions: transactionTypes,
    status: statusTypes,
    types: propertyTypes,
    environments: environmentTypes,
  } = suplimentaryInfo;

  // transaction type
  const transaction = transactionTypes.find(
    (trans) => trans.id === property.transaction_id
  )?.name;

  // property type
  const type = propertyTypes.find((type) => type.id === property.type_id)?.name;

  // property status
  const status = statusTypes.find(
    (status) => status.id === property.status_id
  )?.name;

  // layouts
  const propertyLayouts = property.layouts.map((layout) => {
    const layoutName = layoutTypes.find(
      (layoutInfo) => layoutInfo.id === layout.layout_id
    )?.name;

    return {
      ...layout,
      name: layoutName,
    };
  });

  // facilities
  const propertyFacilities = property.facilities.map((facility) => {
    const facilityName = facilityTypes.find(
      (facilityInfo) => facilityInfo.id === facility.facility_id
    )?.name;

    return {
      ...facility,
      name: facilityName,
    };
  });

  // environments
  const propertyEnvironments = property.environments.map((environment) => {
    const environmentName = environmentTypes.find(
      (environmentInfo) => environmentInfo.id === environment.environment_id
    )?.name;

    return {
      ...environment,
      name: environmentName,
    };
  });

  return {
    ...property,
    transaction,
    type,
    status,
    layouts: propertyLayouts,
    facilities: propertyFacilities,
    environments: propertyEnvironments,
  };
};
