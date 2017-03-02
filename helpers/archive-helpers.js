var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var StringDecoder = require('string_decoder').StringDecoder;
var lineReader = require('readline');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
<<<<<<< HEAD
  var isUrlInList = false;
  var decodedUrl = exports.decoder(url);
  var path = exports.paths.list;
  fs.mkdir(exports.paths.list, _.identity)
  var file = lineReader.createInterface({
    input: fs.createReadStream(path)
  });
  file.on('line', function(line) {
    if (line === decodedUrl) {
      isUrlInList = true;
    }
  });
  return isUrlInList;
=======
  exports.readListOfUrls(function (data) {
    var decodedUrl = exports.decoder(url);
    console.log('-------------', data, '------ decoded url', decodedUrl );
    callback(_.contains(data, decodedUrl));
  }); 
>>>>>>> 00033fa6095bc627004ebeaa9ddab3c4fc1c106b
};

exports.addUrlToList = function(url, callback) {
  var decodedUrl = exports.decoder(url);
<<<<<<< HEAD
  var path = exports.paths.list;
  fs.mkdir(path, _.identity)
=======
>>>>>>> 00033fa6095bc627004ebeaa9ddab3c4fc1c106b
  fs.appendFile(exports.paths.list, decodedUrl + '\n');
};

exports.isUrlArchived = function(url, callback) {

};

exports.downloadUrls = function(urls) {
};

exports.decoder = function(url) {
  var decoder = new StringDecoder('utf8');
  var decodedUrl = decoder.write(url).split('=')[1];
  return decodedUrl;
};

