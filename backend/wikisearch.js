const request = require('postman-request')

const wikisearch = (haku, callback) => {
  const url =
    "https://fi.wikipedia.org/w/api.php?action=query&titles=" +
    haku +
    "&format=json&formatversion=2&prop=extracts|pageimages&piprop=thumbnail&pithumbsize=600&exintro&explaintext&exsentences=4";

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Ei saada yhteyttä", undefined);
    } else if (body.error) {
      callback("Ei oo paikkaa", undefined);
    } else {
      callback(undefined, body.query.pages);
    }
  });
};

module.exports = {
  wikisearch,
};
