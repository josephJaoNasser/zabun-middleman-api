const ApiUrl = require("@/constants/ApiUrl");
const { default: axios } = require("axios");

module.exports = async function PropertySuplimentaryInfo(req, res, next) {
  const config = {
    headers: {
      ...res.locals.credentials,
    },
  };

  /**
   * Add items here in the results
   */
  const supplimentaryItems = [
    "layouts",
    "facilities",
    "transactions",
    "status",
    "types",
    "environments",
  ];

  const results = {};
  const propertySuplimentaryInfoPromises = [];

  for (const key of supplimentaryItems) {
    results[key] = [];
    const promise = axios
      .get(ApiUrl + "/property/" + key, config)
      .then((res) => {
        results[key] = res.data;
      })
      .catch((err) => console.log(err));

    propertySuplimentaryInfoPromises.push(promise);
  }

  Promise.all(propertySuplimentaryInfoPromises)
    .then(() => {
      res.locals.propertySuplimentaryInfo = {
        ...results,
      };

      next();
    })
    .catch((err) => {
      console.log(err);
    });
};
