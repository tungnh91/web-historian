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
      archive.isUrlInList(data);
      archive.addUrlToList(data);
      urlFromPost = data;
    });
    res.writeHead(201, httpHelpers.headers);
    // scan sites archive
    // render loading.html if it wasn't found
    res.end(html);
  } else {
    res.end(html);
  }
  // res.end(archive.paths.list);
};
