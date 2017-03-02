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
    fs.setTimeout(5000);


    });
    res.writeHead(201, httpHelpers.headers);
    // scan sites archive
    // render loading.html if it wasn't found
    res.end()

  } else {
    fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, html) {
      console.log('this is the html', html)
      if (err) {
        throw err;
      }
      res.writeHead(200, httpHelpers.headers);
      res.end(html);
    })
    res.end(html)
    fs.setTimeout(5000);

  }
  // res.end(archive.paths.list);
};
