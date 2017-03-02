var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('../web/http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(req.url);
  httpHelpers.serveAssets(res, null, null, req);
  // res.end(archive.paths.list);
};
