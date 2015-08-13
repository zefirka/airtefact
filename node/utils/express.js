module.exports = {
	nocache : nocache
}


/**
 * Express.js No-Cache middleware for GETs
 * @param {object} _
 * @param {object} res 
 * @param {function} next
 */
function nocache(_, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}