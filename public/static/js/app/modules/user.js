'use strict';
var Cookies = require('js-cookie'),
    utils   = require('../../../../../common/utils');

/**
 @module User
*/
var User = {};
var priv = {};

User.identity = function(){
  return {
    id : priv.id,
    uid : priv.uid,
    session : priv.session
  };
};

User.create = function(){
  priv.id = Number(Cookies.get('u-total')) + 1;
  priv.uid = utils.guid(16);
  priv.session = new Array(4,4,4,4).map(utils.guid).join('-');

  Cookies.set('user-id', priv.id);
  Cookies.set('user-uid', priv.uid);
  Cookies.set('session', priv.session);

  return this.identity();
};

User.destuct = function(){
  Cookies.remove('session');
};

User.init = function(){
  return this[ Cookies.get('user-id') ? 'identity' : 'create'].call(this);
};

module.exports = User;
