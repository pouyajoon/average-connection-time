(function() {
  'use strict';

  var config, server, EvolveConnect = require('./evolve_connect');

  config = {
    server: 'localhost/evolve/',
    userNames: 'USERSCALETEST',
    siteId: 'bootme',
    userIndexZero: 0
  };

  server = new EvolveConnect(config);
  server.startServer(function(err) {
    var args, numberOfUsers;
    if (err) {
      console.error(err);
      return false;
    }
    args = process.argv.slice(2);
    numberOfUsers = parseInt(args[0], 10);
    server.runBenchmark(numberOfUsers);
  });

  // create server
  // run benchmark 1 for 1 user
  // run benchmark 1 for 5 users

}());
