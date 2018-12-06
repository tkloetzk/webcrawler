const rp = require('request-promise');
const fs = require('fs')
const $ = require('cheerio');
const resultParse = require('./resultParse');
const webpageParse = require('./webpageParse');
const url = 'https://www.amazon.com/s/rstripbooks&ie=UTF8&keywords=';

rp(url)
  .then(function(html) {
    //success!

    const isbnArray = [
      9781782491156,
      9780684863177,
      9780449901427,
      9781501118739,
      9781599956831,
      9781414391328,
      9781414388229,
      9780811868952,
      9780553393071,
      9781939754684,
      9781440505362,
      9781548921811,
      9780801018978,
      9781452102511,
      'B001TKTQ1Y',
      9780830773084,
      9780800723491,
      9781533498809,
      9780842321624,
      9780800759902,
      9780800723132,
      9781935071273,
      9780306820205,
      9781557091031,
    ];
    return Promise.all(
      isbnArray.map(isbns => resultParse(url + isbns))
    );
  })
  .then(results => {
    //results.map(result => webpageParse(result.href))
    fs.writeFile('data.json', JSON.stringify(results), err => {
      if (err) return console.log(err)
      console.log('saved')
    })
    console.log(results);
  })
  .catch(err => {
    //handle error
    console.log(err);
  });