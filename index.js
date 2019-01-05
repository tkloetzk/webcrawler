const resultParse = require('./resultParse');
const fs = require('fs');
const csv = require('fast-csv');

var dataArr = [];
csv
  .fromPath('books.csv')
  .on('data', data => {
    dataArr.push(data);
  })
  .on('end', () => {
    Promise.all(dataArr.map(row => resultParse(row[0], row[1])))
      .then(results => {
        fs.writeFile('data.json', JSON.stringify(results), err => {
          if (err) return console.log(err);
          console.log('saved');
        });
        console.log(results);
      })
      .catch(err => {
        //handle error
        console.log(err);
      });
  });
