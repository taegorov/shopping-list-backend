'use strict';

const { user } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    // console.log('req headers ☀️', req.headers)
    // COMMENT THIS BACK IN WHEN AUTH IMPLEMENTED ON FRONT END
    if (!req.headers.authorization) { _authError() }

    const token = req.headers.authorization.split(' ').pop();
    // console.log('TOKEN TOKEN TOKEN', token)
    const validUser = await user.authenticateBearer(token);
    req.user = validUser.dataValues;
    req.token = validUser.token;

    // // THEN COMMENT THIS OUT
    // req.user = {
    //   id: 1,
    //   username: "willow",
    //   role: "user",
    // }
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login (bearer)');
  }
}
