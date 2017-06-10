const fs = require('fs');
const path = require('path');
const request = require('request');
const _ = require('underscore');

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
exports.initialize = (pathsObj) => {
  _.each(pathsObj, (path, type)  => {
    exports.paths[type] = path;
  });
};


exports.readListOfUrls = (callback) => {
  fs.readFile(exports.paths.list, (err, sites) => {
    sites = sites.toString().split('\n');
    if (callback) {
      callback(sites);
    }
  });
};

exports.isUrlInList = (url, callback) => {
  exports.readListOfUrls((sites) => {
    const found = _.any(sites, (site, i) => {
      return site.match(url);
    });
    callback(found);
  });
};

exports.addUrlToList = (url, callback) => {
  fs.appendFile(exports.paths.list, url + '\n', (err, file) => {
    callback();
  });
};

exports.isUrlArchived = (url, callback) => {
  const sitePath = path.join(exports.paths.archivedSites, url);

  fs.exists(sitePath, (exists) => {
    callback(exists);
  });
};

exports.downloadUrls = (urls) => {
  // Iterate over urls and pipe to new files
  _.each(urls, (url) => {
    if (!url) { return; }
      request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
};
