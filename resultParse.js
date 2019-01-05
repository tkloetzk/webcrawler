const rp = require('request-promise');
const $ = require('cheerio');

const resultParse = (isbn, category) => {
  const url =
    'http://api.scraperapi.com/?key=90d416faaa0849a3aac0e060f6faf854&url=' +
    encodeURIComponent(
      `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=${isbn}&rh=n%3A283155%2Ck%3A${isbn}`
    );
  return rp(url)
    .then(html => {
      return {
        name: $(
          '.a-size-medium.s-inline.s-access-title.a-text-normal',
          html
        ).text(),
        rating: $('i.a-icon.a-icon-star > span', html)
          .text()
          .split(' o')[0],
        reviews: $('div.a-column.a-span5.a-span-last > div > a', html).text(),
        price: $('.a-offscreen', html).text(),
        image: $('a.a-link-normal.a-text-normal > img', html).attr('src'),
        href: $('a.a-link-normal.a-text-normal', html).attr('href'),
        isbn,
        category,
      };
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = resultParse;
