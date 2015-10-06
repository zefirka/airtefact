'use strict';

var Cookies = require('./cookies'),
    LS      = require('./ls');

/**
 @module User
*/
var User = {};

User.identity = function(){
  return {
    id : this.id,
    uid : this.uid,
    session : this.getSession()
  };
};

/* Cookies */
