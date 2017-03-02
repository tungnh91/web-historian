var http = require('http');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback, req) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  // console.log(res);
  if (req.url === '/') {
    console.log('hi');
    fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, html) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html);
    });
  }
};



// As you progress, keep thinking about what helper functions you can put here!
