const fs = require('fs');
const archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = (res, asset, callback) => {
  const encoding = {encoding: 'utf8'};
  fs.readFile(archive.paths.siteAssets + asset, encoding,(err, data) => {
    if (err) {
      // file doesn't exist in public!
      fs.readFile(archive.paths.archivedSites + asset, encoding, (err, data) => {
        if (err) {
          // file doesn't exist in archive!
          callback ? callback() : exports.send404(res);
        } else {
          exports.sendResponse(res, data);
        }
      });
    } else {
      exports.sendResponse(res, data);
    }
  });
};



