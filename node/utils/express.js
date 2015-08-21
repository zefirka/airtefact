/**
  Модуль утилит для фреймворка express-js
  @module node/utils/express
 */
module.exports = {
  nocache : nocache
};

/**
  Middleware, который предотвращает кэширование запроса
  @public
  @param {object} _
  @param {object} res - объект HTTP-ответа
  @param {function} next - коллбек для перехода к следующему middleware
  @return {object}
 */
function nocache(_, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}
