const ApiUrl = require("@/constants/ApiUrl");
const HttpMethod = require("@/constants/HttpMethod");
const AuthenticationMiddleware = require("@/middleware/AuthenticationMiddleware");
const filterBuilder = require("@/utils/filterBuilder");
const { failed, getErrorCode, success } = require("@/utils/response");
const WebController = require("@/www/WebController");
const { default: axios } = require("axios");

class GetPropertiesController extends WebController {
  constructor() {
    super("/", HttpMethod.GET, [AuthenticationMiddleware]);
  }

  async handler(req, res) {
    try {
      const filters = filterBuilder(req.query);
      const config = {
        headers: {
          ...res.locals.credentials,
        },
      };

      const results = {
        properties: {},
        transactionTypes: [],
        statusTypes: [],
        propertyTypes: [],
      };

      const transactionTypesPromise = axios
        .get(ApiUrl + "/property/transactions", config)
        .then((transactionTypes) => {
          results.transactionTypes = transactionTypes.data;
        });

      const statusTypesPromise = axios
        .get(ApiUrl + "/property/status", config)
        .then((statusTypes) => {
          results.statusTypes = statusTypes.data;
        });

      const propertyTypesPromise = axios
        .get(ApiUrl + "/property/types", config)
        .then((propertyTypes) => {
          results.propertyTypes = propertyTypes.data;
        });

      const propertyResultsPromise = axios
        .post(ApiUrl + "/property/search", filters, config)
        .then((properties) => {
          results.properties = properties.data.properties;
        });

      await Promise.all([
        propertyResultsPromise,
        transactionTypesPromise,
        statusTypesPromise,
        propertyTypesPromise,
      ]);

      const singlePropertyPromises = results.properties.map((property) => {
        return axios
          .get(ApiUrl + "/property/" + property.property_id, config)
          .then((res) => {
            const propertyIndex = results.properties.findIndex(
              (p) => p.property_id === res.data.property_id
            );

            if (propertyIndex > -1) {
              results.properties[propertyIndex] = {
                ...results.properties[propertyIndex],
                ...res.data,
              };
            }
          });
      });

      await Promise.all(singlePropertyPromises);

      const properties = results.properties.map((property) => {
        const transaction = results.transactionTypes.find(
          (trans) => trans.id === property.transaction_id
        )?.name;

        const type = results.propertyTypes.find(
          (type) => type.id === property.type_id
        )?.name;

        const status = results.statusTypes.find(
          (status) => status.id === property.status_id
        )?.name;

        return { ...property, transaction, type, status };
      });

      return res.status(200).json(
        success({
          ...results,
          properties,
        })
      );
    } catch (err) {
      console.error(err);
      return res.status(getErrorCode(err)).json(failed(err));
    }
  }
}

module.exports = new GetPropertiesController();
