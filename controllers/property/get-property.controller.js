const ApiUrl = require("@/constants/ApiUrl");
const HttpMethod = require("@/constants/HttpMethod");
const AuthenticationMiddleware = require("@/middleware/AuthenticationMiddleware");
const PropertySuplimentaryInfo = require("@/middleware/PropertySuplimentaryInfo");
const formatPropertyData = require("@/utils/formatPropertyData");
const { failed, getErrorCode, success } = require("@/utils/response");
const WebController = require("@/www/WebController");
const { default: axios } = require("axios");

class GetPropertyController extends WebController {
  constructor() {
    super("/:propertyId", HttpMethod.GET, [
      AuthenticationMiddleware,
      PropertySuplimentaryInfo,
    ]);
  }

  async handler(req, res) {
    try {
      const { propertyId } = req.params;
      const config = {
        headers: {
          ...res.locals.credentials,
        },
      };

      const { data: propertyResponse } = await axios.get(
        ApiUrl + "/property/" + propertyId,
        config
      );

      const property = formatPropertyData(
        propertyResponse,
        res.locals.propertySuplimentaryInfo
      );

      return res.status(200).json(success({ property }));
    } catch (err) {
      console.error(err);
      return res.status(getErrorCode(err)).json(failed(err));
    }
  }
}

module.exports = new GetPropertyController();
