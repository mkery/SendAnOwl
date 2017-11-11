#! /usr/bin/env node

console.log('This script populates a some test friends and communication modes to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var CommMode = require('./models/commMode')
var Friend = require('./models/friend')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var friends = []
var commModes = []

function friendCreate(first_name, family_name, d_birth, friend_title, contact_method, cb) {
  var friend = new Friend({first_name: first_name, family_name: family_name, date_of_birth: d_birth, friend_title: friend_title, contact_method: contact_method});

  friend.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Friend: ' + friend);
    friends.push(friend)
    cb(null, friend)
  }  );
}

function modeCreate(title, cb) {
  var mode = new CommMode({ title: title });

  mode.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New CommMode: ' + mode);
    commModes.push(mode)
    cb(null, mode);
  }   );
}


function createFriends(cb) {
    async.parallel([
        function(callback) {
          friendCreate('Ron', 'Weasley', 'March 1st', 'Best Friend', [commModes[0],commModes[1]], callback);
        },
        function(callback) {
          friendCreate('Hermione', 'Granger', 'September 19th', 'Best Friend', [commModes[4],commModes[2]], callback);
        },
        function(callback) {
          friendCreate('Ginny', 'Weasley', 'August 11th', 'Wife', [commModes[2],commModes[3]], callback);
        },
        function(callback) {
          friendCreate('Severus', 'Snape', 'January 9th', 'Frenemy', [commModes[5],], callback);
        },
        function(callback) {
          friendCreate('Albus', 'Dumbledore', '???', 'Mentor', [commModes[5],], callback);
        },
        function(callback) {
          friendCreate('Voldemort', '', 'December 31st', 'Arch Nemesis', [commModes[5],], callback);
        },
        ],
        // optional callback
        cb);
}


function createModes(cb) {
    async.parallel([
        function(callback) {
          modeCreate('Skype', callback);
        },
        function(callback) {
          modeCreate('Steam chat', callback);
        },
        function(callback) {
          modeCreate('Text', callback);
        },
        function(callback) {
          modeCreate('Call', callback);
        },
        function(callback) {
          modeCreate('Facebook Messenger', callback);
        },
        function(callback) {
          modeCreate('Seance', callback);
        },
        ],
        // optional callback
        cb);
}


async.series([
    createModes,
    createFriends,
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Friends: '+friends);

    }
    //All done, disconnect from database
    mongoose.connection.close();
});
