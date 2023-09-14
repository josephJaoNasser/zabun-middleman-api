const ApiUrl = require("@/constants/ApiUrl");
const HttpMethod = require("@/constants/HttpMethod");
const AuthenticationMiddleware = require("@/middleware/AuthenticationMiddleware");
const { failed, getErrorCode, success } = require("@/utils/response");
const WebController = require("@/www/WebController");
const { default: axios } = require("axios");

class GetPropertyController extends WebController {
  constructor() {
    super("/:propertyId", HttpMethod.GET, [AuthenticationMiddleware]);
  }

  async handler(req, res) {
    try {
      const { propertyId } = req.params;
      const config = {
        headers: {
          ...res.locals.credentials,
        },
      };

      const results = {
        property: {},
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

      const propertyResponse = axios
        .get(ApiUrl + "/property/" + propertyId, config)
        .then((property) => {
          results.property = property.data;
        });

      await Promise.all([
        transactionTypesPromise,
        statusTypesPromise,
        propertyTypesPromise,
        propertyResponse,
      ]);

      const transaction = results.transactionTypes.find(
        (trans) => trans.id === results.property.transaction_id
      )?.name;

      const type = results.propertyTypes.find(
        (type) => type.id === results.property.type_id
      )?.name;

      const status = results.statusTypes.find(
        (status) => status.id === results.property.status_id
      )?.name;

      const property = {
        ...results.property,
        transaction,
        type,
        status,
      };

      return res.status(200).json(success({ property }));
    } catch (err) {
      console.error(err);
      return res.status(getErrorCode(err)).json(failed(err));
    }
  }
}

module.exports = new GetPropertyController();
