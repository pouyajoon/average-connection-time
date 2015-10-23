(function() {
  'use strict';

  var request = require('request'),
    evolveServer, userIdCount = 0,
    PASSWORD = '',
    maximumUsers = 5;

  evolveServer = function(config) {
    this.config = config;
    this.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.78.2 (KHTML, like Gecko) Version/7.0.6 Safari/537.78.2'; // MAC SAFARI
    this.sessions = {};
    this.pages = {};
    this.pages.login = {};
    this.pages.logout = {};

    this.totalTime = {};
    this.averages = {};
  };


  evolveServer.prototype.getUserName = function() {
    var userId, userName;
    userId = Math.floor((Math.random() * maximumUsers)) + this.config.userIndexZero;
    userName = this.config.userNames + userId;
    // console.log('GET USER ', userName);
    return userName;
  };

  evolveServer.prototype.runBenchmark = function(runUsers) {
    var that = this,
      i;

    this.runnedUsers = 0;
    this.runUsers = runUsers;

    function login_local(index) {
      setTimeout(function() {
        that.login(that.getUserName(), PASSWORD, function(err, user) {
          that.browseIndexPage(err, user, {
            viewName: 'index_applications2'
          }, function(err, user) {
            that.logout(err, user, that.endUserTests.bind(that));
          });
        });
      }, index);
    }
    for (i = 0; i < runUsers; i += 1) {
      login_local(i);
    }
  };


  evolveServer.prototype.endUserTests = function() {
    this.runnedUsers += 1;
    if (this.runnedUsers >= this.runUsers) {
      this.computeAverage();
      console.info('AVERAGE OF TESTS (' + this.runUsers + ')', this.averages);
    }
  };


  evolveServer.prototype.computeAverage = function() {
    var page, pageTotal, pageForUser;
    for (page in this.pages) {
      if (this.pages.hasOwnProperty(page)) {
        pageTotal = 0;
        for (pageForUser in this.pages[page]) {
          if (this.pages[page].hasOwnProperty(pageForUser)) {
            pageTotal += this.pages[page][pageForUser];
          }
        }
        this.totalTime[page] = pageTotal;
      }
    }

    for (page in this.totalTime) {
      if (this.totalTime.hasOwnProperty(page)) {
        this.averages[page] = this.totalTime[page] / this.runUsers;
      }
    }

  };


  evolveServer.prototype.startServer = function(callback) {
    console.info('start server', this.config.server);
    request({
        method: 'GET',
        url: 'http://' + this.config.server + '/',
        headers: {
          'User-Agent': this.userAgent,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      function(error, response) {
        if (!error && response.statusCode === 200) {
          console.info(response.statusCode, 'server ready'); // 200
          if (callback) {
            return callback(null);
          }
        }
      });
  };

  evolveServer.prototype.browseIndexPage = function(err, user, options, callback) {
    if (err && callback) {
      return callback(err);
    }
    var that = this,
      timer = new Date(),
      url;
    url = 'http://' + that.config.server + that.config.siteId + '/page/' + options.viewName;
    request({
        method: 'GET',
        url: url,
        headers: {
          'User-Agent': that.userAgent,
          'Cookie': user.cookies,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      function(error, response, body) {
        var diff, session;
        diff = Math.abs(new Date() - timer);

        // console.error(error, body);
        if (error) {
          session = that.sessions[user.id];
          return console.error('error on index page load', user.id, session.username, error);
        }
        if (response && response.statusCode === 200 && JSON.parse(body).status !== "Ko") {
          if (!that.pages[options.viewName]) {
            that.pages[options.viewName] = {};
          }
          that.pages[options.viewName][user.id] = diff;
          if (callback) {
            return callback(null, user, options);
          }
        }
      });
    // 
  };


  evolveServer.prototype.logout = function(err, user, callback) {
    if (err && callback) {
      return callback(err);
    }
    var that = this,
      timer = new Date();
    request({
        method: 'GET',
        url: 'http://' + that.config.server + '/account/logout',
        headers: {
          'User-Agent': that.userAgent,
          'Cookie': user.cookies,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      function(error, response, body) {
        var diff, session;
        diff = Math.abs(new Date() - timer);
        if (error) {
          session = that.sessions[user.id];
          return console.error('error on login', user.id, session.username, error);
        }
        if (response && response.statusCode === 200 && JSON.parse(body).status === "Ok") {
          that.pages.logout[user.id] = diff;
          // console.info(user.id, 'logout done', body, that.pages);
          if (callback) {
            return callback(null, user);
          }
        }
      });
  };

  evolveServer.prototype.login = function(userName, password, callback) {
    var timer, that = this,
      id;
    timer = new Date();

    id = userIdCount;
    userIdCount += 1;

    if (password === undefined) {
      password = '';
    }

    request({
        url: 'http://' + this.config.server + '/Account/Login?ReturnUrl=%2f',
        headers: {
          'User-Agent': this.userAgent,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        form: {
          UserName: userName,
          Password: password
        }
      },
      function(error, response, body) {
        var diff = Math.abs(new Date() - timer);
        if (error) {
          return console.error(id, diff / 1000 + 's', error);
        }

        if (response && JSON.parse(body).status === "Ok") {
          // console.info(id, 'login done ', userName, JSON.parse(body));
          that.pages.login[id] = diff;
          that.sessions[id] = {
            'id': id,
            'username': userName,
            'loginTime': diff,
            'cookies': response.headers['set-cookie'].join(';')
          };
          return callback && callback(null, that.sessions[id]);
        }
      }
    );
  };

  module.exports = evolveServer;
}());