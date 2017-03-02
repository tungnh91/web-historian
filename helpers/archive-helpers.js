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
};

exports.isUrlInList = function(url, callback) {
  var isUrlInList = false;
  var decodedUrl = exports.decoder(url);
  var file = lineReader.createInterface({
    input: fs.createReadStream('/Users/student/Desktop/hrsf72-web-historian/web/archives/sites.txt')
  });
  file.on('line', function(line) {
    if (line === decodedUrl) {
      isUrlInList = true;
      console.log('a');
    }
  });
  console.log('b');
  return isUrlInList;
};

exports.addUrlToList = function(url, callback) {
  var decodedUrl = exports.decoder(url);
  fs.appendFile('/Users/student/Desktop/hrsf72-web-historian/web/archives/sites.txt', decodedUrl + '\n');
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

