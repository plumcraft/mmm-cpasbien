const NodeHelper = require('node_helper');
const rq = require('request-promise');
const cheerio = require('cheerio');
const base_url = 'http://www.cpasbien.cm'

module.exports = NodeHelper.create({
    socketNotificationReceived: function(notification, payload) {

        if (notification === 'GET_IP') {
            this.search();
        }
    },

    search: function () {
      var self = this;
      var search_url = base_url + '/top-100.php'
      var options = {
        uri: search_url,
        transform: function (body) {
          return cheerio.load(body)
        }
      }

      rq(options).then(function ($) {
        if ($('div .ligne0').length > 0) {
          var torrents = []
          $("div[class^='ligne']").each(function (index, element) {
            var torrent = {}
            torrent.title = $(element).children('a').text();
            torrent.seeds = $(element).find('.seed_ok').text();
            torrent.down = $(element).find('.down').text();

            torrents.push(torrent);
          });
         self.sendSocketNotification('IP', torrents);
        }
      });
    }
});
