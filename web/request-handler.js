var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('../web/http-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, html) {
      res.writeHead(200, httpHelpers.headers);
      res.end(html);
    });
  } else if (req.method === 'POST') {
    req.on('data', function (data) {
      if (!archive.isUrlInList(data) ) {
        archive.addUrlToList(data);
      } else {
        archive.isUrlArchived();
      }

    });
    res.writeHead(201, httpHelpers.headers);
    res.end();
  } else {
    res.end();
  }
  // res.end(archive.paths.list);
};
