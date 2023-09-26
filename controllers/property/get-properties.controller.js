const ApiUrl = require("@/constants/ApiUrl");
const HttpMethod = require("@/constants/HttpMethod");
const AuthenticationMiddleware = require("@/middleware/AuthenticationMiddleware");
const PropertySuplimentaryInfo = require("@/middleware/PropertySuplimentaryInfo");
const filterBuilder = require("@/utils/filterBuilder");
const formatPropertyData = require("@/utils/formatPropertyData");
const { failed, getErrorCode, success } = require("@/utils/response");
const WebController = require("@/www/WebController");
const { default: axios } = require("axios");

class GetPropertiesController extends WebController {
  constructor() {
    super("/", HttpMethod.GET, [
      AuthenticationMiddleware,
      PropertySuplimentaryInfo,
    ]);
  }

  async handler(req, res) {
    try {
      const filters = filterBuilder(req.query);
      const config = {
        headers: {
          ...res.locals.credentials,
        },
      };

      // get al properties
      const { data: propertiesResponse } = await axios.post(
        ApiUrl + "/property/search",
        filters,
        config
      );

      // functopm that gets a single property
      const getSinglePropertyPromise = (property) => {
        return axios
          .get(ApiUrl + "/property/" + property.property_id, config)
          .then((res) => {
            const propertyIndex = propertiesResponse.properties.findIndex(
              (p) => p.property_id === res.data.property_id
            );

            if (propertyIndex > -1) {
              propertiesResponse.properties[propertyIndex] = {
                ...propertiesResponse.properties[propertyIndex],
                ...res.data,
              };
            }
          });
      };

      const singlePropertyPromises = propertiesResponse.properties.map(
        getSinglePropertyPromise
      );

      await Promise.all(singlePropertyPromises);

      const properties = propertiesResponse.properties.map((property) =>
        formatPropertyData(property, res.locals.propertySuplimentaryInfo)
      );

      return res.status(200).json(
        success({
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
