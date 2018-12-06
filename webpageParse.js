const rp = require('request-promise');
const $ = require('cheerio');

const webpageParse = function(url) {
  return rp(url)
    .then(function(html) {
      return {
        summary: $('#iframeContent', html).text(),
        //section: $('.s-item-container', html)
      };
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = webpageParse