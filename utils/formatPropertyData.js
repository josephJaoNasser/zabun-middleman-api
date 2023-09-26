module.exports = function formatPropertyData(property, suplimentaryInfo) {
  const {
    layouts: layoutTypes,
    facilities: facilityTypes,
    transactions: transactionTypes,
    status: statusTypes,
    types: propertyTypes,
    environments: environmentTypes,
    flooding_sensitivities,
    heritage_inventorieds,
    building_licenses,
    garden_directions,
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

  // heritage inventories
  const heritage_inventory = heritage_inventorieds.find(
    (heritage) => heritage.id === property.heritage_inventoried_id
  )?.name;

  // flooding sensitivity
  const flooding_sensitivity = flooding_sensitivities.find(
    (trans) => trans.id === property.transaction_id
  )?.name;

  // building license
  const building_license = building_licenses.find(
    (lic) => lic.id === property.building_license_id
  )?.name;

  // building license
  const garden_direction = garden_directions.find(
    (gd) => gd.id === property.direction_garden_id
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
    flooding_sensitivity,
    heritage_inventory,
    building_license,
    garden_direction,
  };
};
