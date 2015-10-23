(function() {
  'use strict';
  /*browser*/

  var request, config, doTests, args = process.argv.slice(2),
    runUsers;

  var http = require('http');
  request = require('request');

  runUsers = parseInt(args[0], 10);



  //var userAgent = 'Mozilla/5.0 (iPad; CPU OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) CriOS/36.0.1985.57 Mobile/11D257 Safari/9537.53'; // CHROME IPAD
  // var userAgent = 'Mozilla/5.0 (iPad; CPU OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53'; // SAFARI IPAD
  // var userAgent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'; //??
  // var userAgent = 'Mozilla/5.0 (Linux; U; Android 4.3; fr-fr; GT-I9300 Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'; // ANDROID NATIVE
  // var userAgent = 'Mozilla/5.0 (Linux; Android 4.3; GT-I9300 Build/JSS15J) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.131 Mobile Safari/537.36'; // ANDROID CHROME
  // var userAgent = 'Mozilla/5.0 (Android; Mobile; rv:31.0) Gecko/31.0 Firefox/31.0'; // ANDROID FIREFOX
  // var userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53'; //IPHONE SAFARI
  // var userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) CriOS/36.0.1985.57 Mobile/11D257 Safari/9537.53 (000817)'; // IPHONE CHROME


  // var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:31.0) Gecko/20100101 Firefox/31.0'; // FIREFOX MAC
  // 
  // var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.79 Safari/537.4'; // MAC CHROME

  // var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.78.2 (KHTML, like Gecko) Version/7.0.6 Safari/537.78.2'; // MAC SAFARI
  // var userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0'; // NEED TO BE TESTED
  //var userAgent = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.2; WOW64; Trident/6.0; .NET4.0E; .NET4.0C; InfoPath.3; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; BRI/2)'; // IE 10 ?
  // userAgent *= 2;
  // console.log(userAgent);
  // var userAgent = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; HTC; Windows Phone 8S by HTC)'; // WINDOWS PHONE

  // var userAgent = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.2; WOW64; Trident/6.0; .NET4.0E; .NET4.0C; InfoPath.3; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; BRI/2';

  // var userAgent = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.2; WOW64; Trident/6.0; .NET4.0E; .NET4.0C; InfoPath.3; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; BRI/2';
  // var userAgent = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.2; WOW64; Trident/6.0; .NET4.0E; .NET4.0C; InfoPath.3; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; BRI/2';


  // var userAgent = 'Mozilla/5.0 (iPad; CPU OS 8_1_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/42.0.2311.47 Mobile/12B440 Safari/600.1.4';
  var userAgent = 'Mozilla/5.0 (iPad; CPU OS 8_1_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/42.0.2311.47 Mobile/12B440 Safari/600.1.4';
  // console.log(userAgent);
  // http.get({
  //   hostname: 'localhost',
  //   path: '/wddev/',
  //   headers: {
  //     'User-Agent': userAgent
  //   }
  // }, function(res) {
  //   if (res.statusCode === 200) {
  //     var body = [];
  //     res.setEncoding('utf8');
  //     res.on('data', function(chunk) {
  //       body.push(chunk);
  //     });
  //     res.on('end', function() {
  //       body = body.join('');
  //       console.log(body);
  //     });
  //   } else {
  //     console.log('Received non-ok response: ' + res.statusCode);
  //   }
  // });



  // return;
  config = {
    server: 'localhost/wddev/',
    // server: 'evolve2015t1/evolve/',
    userNames: 'USERSCALETEST',
    userIndexZero: 0
  };



  request({
      url: 'http://' + config.server + '/Account/LoginWithHeader',
      headers: {
        'UserName': 'POUYAM',
        'Password': 'gDj10qWcQaFYH/H1vdquoA=='
      },
      method: 'GET'
    },
    function(error, response, body) {
      if (error) {} else if (response !== undefined) {
        console.log(body);
      }
    });
  return;



  // config = {
  //   server: '192.168.22.83/evolve/',
  //   userNames: 'AUTOUSER',
  //   userIndexZero: 200
  // };
  //'AUTOUSER'

  // var SERVER = '192.168.22.83/evolve/';

  function logout(id, user) {
    setTimeout(function() {

      request
        .get('http://' + config.server + '/account/logout')
        .on('response', function(error, response, body) {
          if (response !== undefined) {
            console.log(id, user, 'logout');
          }
          // console.log(id, response.statusCode, body, 'get index_applications'); // 200
        });

    }, Math.floor(Math.random() * 1e3));
  }


  function login(id, user, password) {
    var timer;
    timer = new Date();

    if (password === undefined) {
      password = '';
    }
    // var user = 'AUTOUSER' + userId;
    console.log(id, 'connect with ', user);
    request({
        url: 'http://' + config.server + '/Account/Login?ReturnUrl=%2f',
        headers: {
          'User-Agent': userAgent,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        form: {
          UserName: user,
          Password: password
        }
      },
      function(error, response, body) {
        var diff = Math.abs(new Date() - timer);

        if (error) {
          console.error(id, diff / 1000 + 's', error);
        } else if (response !== undefined) {
          console.log(id, diff / 1000 + 's', 'res', user, response.statusCode, body);
          var cookies = response.headers['set-cookie'];
          // console.log(cookies);

          openPage('index_applications', cookies, function() {
            openPage('index_locations2', cookies, function() {
              // logout(id, user, cookies);
            });
          });
          // logout(id, user);
          // request
          //   .get('http://' + config.server + '/page/index_applications')
          //   .on('response', function(error, response, body) {
          //     console.log(id, response.statusCode, body, 'get index_applications'); // 200
          //   });
        }
        // if (!error && response.statusCode == 200) {
        //   console.log(body)
        // }
      }
    );

  }

  function getUserName() {
    var userId, user;
    userId = Math.floor((Math.random() * 100)) + config.userIndexZero;
    user = config.userNames + userId;
    return user;
  }

  function startServer() {
    console.log('start server', config.server);
    request({
        method: 'GET',
        url: 'http://' + config.server + '/',
        headers: {
          'User-Agent': userAgent,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(response.statusCode, 'server ready'); // 200
          doTests();
        }
      });
  }

  doTests = function() {
    function login_local(index) {
      setTimeout(function() {
        login(index, getUserName());
      }, index * 0);
    }

    // login(0, 'WRONG_USER', '');
    // login(0, getUserName(), 'WRONG_PASSWORD');

    var i;
    for (i = 0; i < runUsers; i += 1) {
      // console.log(i);
      login_local(i);
    }
  };



  function openPage(indexview, cookies, callback) {
    var c = cookies.join(';');
    var url = 'http://' + config.server + '/bootme/page/' + indexview;
    var timer = new Date();

    console.log('open url', url);
    request({
        method: 'GET',
        url: url,
        headers: {
          'User-Agent': userAgent,
          'Cookie': c,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      function(error, response, body) {
        var diff = Math.abs(new Date() - timer);

        if (error) {
          console.error('error', error);
        } else {
          console.log(response.statusCode);
        }
        if (!error && response.statusCode == 200) {
          // console.error(id,, error);

          console.log(response.statusCode, 'page open', indexview, diff / 1000 + 's'); // 200
          if (callback) {
            return callback();
          }
        }
      });
  }


  return startServer();
  //#cwtype=index&cwview=index_applications
  // request
  //   .get('http://' + config.server + '/index.html')
  //   .on('response', function(r) {
  //     console.log(r, 'get index_applications'); // 200
  //   });

  // request('http://' + config.server + '/page/index_applications', function(error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     console.log(body); // Print the google web page.
  //   }
  // });

}());