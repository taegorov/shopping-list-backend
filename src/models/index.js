'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./user.schema.js');
const listSchema = require('./list.schema.js')

// const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
// const DATABASE_URL = 'postgres://postgres@localhost:5432/shoppinglist';
const DATABASE_URL = process.env.NODE_ENV === 'production' ? process.env.DATABASE_PROD : process.env.DATABASE_DEV


// below: throw a !== instead of ===  if you want to connect to ElephantSQL database LOCALLY (instead of local)
// for PRODUCTION, use ===
// === === // THE BELOW IS DATABASE URL FOR WHEN NODE_ENV IS SET UP // === === //
// const DATABASE_URL = process.env.NODE_ENV === 'production' ? process.env.DATABASE_PROD : process.env.DATABASE_DEV


// Heroku needs this to run Sequelize
let sequelize = new Sequelize(DATABASE_URL, {
  // dialectOptions: {
  //   ssl: {
  //     require: false,
  //     rejectUnauthorized: false,
  //   }
  // }
});

const user = userSchema(sequelize, DataTypes);
const list = listSchema(sequelize, DataTypes);


// --- if you need to add a new column or whatevs --- //
// list.sync({ alter: true })

// --- if you need to drop the table --- //
// user.drop();
// console.log("user table dropped!");

user.hasMany(list, { foreignKey: 'userId', sourceKey: 'id' })
list.belongsTo(user, { foreignKey: 'userId', targetKey: 'id' })

// customers.hasMany(notes, { foreignKey: 'customerId', sourceKey: 'id' });
// notes.belongsTo(customers, { foreignKey: 'customerId', targetKey: 'id' });


module.exports = {
  db: sequelize,
  user: user,
  list: list,
}






const tim = {
  "kind": "customsearch#search",
  "url": {
    "type": "application/json",
    "template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
  },
  "queries": {
    "request": [
      {
        "title": "Google Custom Search - milk duds",
        "totalResults": "8000000",
        "searchTerms": "milk duds",
        "count": 1,
        "startIndex": 1,
        "inputEncoding": "utf8",
        "outputEncoding": "utf8",
        "safe": "off",
        "cx": "933ac617728bd44c9"
      }
    ],
    "nextPage": [
      {
        "title": "Google Custom Search - milk duds",
        "totalResults": "8000000",
        "searchTerms": "milk duds",
        "count": 1,
        "startIndex": 2,
        "inputEncoding": "utf8",
        "outputEncoding": "utf8",
        "safe": "off",
        "cx": "933ac617728bd44c9"
      }
    ]
  },
  "context": {
    "title": "timba"
  },
  "searchInformation": {
    "searchTime": 0.269951,
    "formattedSearchTime": "0.27",
    "totalResults": "8000000",
    "formattedTotalResults": "8,000,000"
  },
  "items": [
    {
      "kind": "customsearch#result",
      "title": "MILK DUDS Chewy Caramels in Chocolate | Classic Hershey Candy",
      "htmlTitle": "<b>MILK DUDS</b> Chewy Caramels in Chocolate | Classic Hershey Candy",
      "link": "https://www.hersheyland.com/milk-duds",
      "displayLink": "www.hersheyland.com",
      "snippet": "MILK DUDS Candies were introduced by \ufeffF. Hoffman & Co. · MILK DUDS Candy got their name because their maker found it impossible to get the chocolate-covered ...",
      "htmlSnippet": "<b>MILK DUDS</b> Candies were introduced by \ufeffF. Hoffman &amp; Co. &middot; <b>MILK DUDS</b> Candy got their name because their maker found it impossible to get the chocolate-covered&nbsp;...",
      "cacheId": "L9vtbrwVEBAJ",
      "formattedUrl": "https://www.hersheyland.com/milk-duds",
      "htmlFormattedUrl": "https://www.hersheyland.com/<b>milk</b>-<b>duds</b>",
      "pagemap": {
        "cse_thumbnail": [
          {
            "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLmRpX6iNuLVqOB4EMu8-GOy1bQLjDX0PBuizBRHSnut3S0PFZ6B3VgA",
            "width": "186",
            "height": "79"
          }
        ],
        "aggregaterating": [
          {
            "ratingvalue": "4.7",
            "reviewcount": "31"
          },
          {
            "ratingvalue": "4.7",
            "reviewcount": "31"
          }
        ],
        "metatags": [
          {
            "template": "home-page",
            "pagetype": "home-page",
            "msapplication-square70x70logo": "/etc.clientlibs/hershey/clientlibs/clientlib-site/resources/icon-70x70.png",
            "ps-language": "en",
            "ps-country": "US",
            "msapplication-wide310x150logo": "/etc.clientlibs/hershey/clientlibs/clientlib-site/resources/icon-310x150.png",
            "ps-library": "widget,wtb4",
            "msapplication-square150x150logo": "/etc.clientlibs/hershey/clientlibs/clientlib-site/resources/icon-150x150.png",
            "facebook-domain-verification": "n6xte1tf1qztk72haf0gh18zp21io7",
            "publisheddatetime": "2022-03-18T12:51:24.00Z",
            "viewport": "width=device-width, minimum-scale=1.0",
            "msapplication-square310x310logo": "/etc.clientlibs/hershey/clientlibs/clientlib-site/resources/icon-310x310.png",
            "templatetype": "home-page",
            "subcategory1": "MILK DUDS",
            "articleauthor": "admin",
            "primarycategory": "Our Brands",
            "ps-key": "2366-5f71878b223bcc002525bac4",
            "ps-token": "128fec6d7f8b49a1816e216e7a40afb8"
          }
        ],
        "cse_image": [
          {
            "src": "https://www.hersheyland.com/content/dam/hersheyland/en-us/life-style/brands/milk-duds/milk-duds-logo.png?im=Resize=(186)"
          }
        ]
      }
    }
  ]
}

console.log(tim.items[0].pagemap.cse_image[0].src)