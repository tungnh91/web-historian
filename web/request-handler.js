const archive = require('../helpers/archive-helpers');
// require more modules/folders here!
/* START SOLUTION */
const url = require('url');
const helpers = require('./http-helpers');

const actions = {
  GET: (request, response) => {
    let urlPath = url.parse(request.url).pathname;

    // / means index.html
    if (urlPath === '/') { urlPath = '/index.html'; }

    helpers.serveAssets(response, urlPath, () => {
      // trim leading slash if present
      if (urlPath[0] === '/') { urlPath = urlPath.slice(1); }

      archive.isUrlInList(urlPath, (found) => {
        if (found) {
          helpers.sendRedirect(response, '/loading.html');
        } else {
          helpers.send404(response);
        }
      });
    });
  },
  POST: (request, response) => {
    helpers.collectData(request, (data) => {
      let url = data.split('=')[1].replace('http://', '');
      // check sites.txt for web site
      archive.isUrlInList(url, (found) => {
        if (found) { // found site
          // check if site is on disk
          archive.isUrlArchived(url, (exists) =>{
            if (exists) {
              // redirect to site page (/www.google.com)
              url = `/ + ${url}`;
              helpers.sendRedirect(response, url);
            } else {
              // Redirect to loading.html
              helpers.sendRedirect(response, '/loading.html');
            }
          });
        } else { // not found
          // add to sites.txt
          archive.addUrlToList(url, () => {
            // Redirect to loading.html
            helpers.sendRedirect(response, '/loading.html');
          });
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  var handler = actions[req.method];
  if (handler) {
    handler(req, res);
  } else {
    helpers.send404(res);
  }
};
