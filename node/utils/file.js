var join = require('path').join;
var fs   = require('fs');

/**
  * Проверяет существует ли данный файл.
  *
  * @param {string} url Адрес файла в fs
  * @param {function} yes Коллбэк, вызывается, если файл найден
  * @param {function} no Коллбэк, вызывается, если файл не найден
  * @return {NodePromise}
  */
function isFileExist(url, yes, no){
  return fs.stat(url, function(err){
    return err ? yes() : no();
  });
}

/**
 * Прикрепляет к строке файла расширение
 * @param {string} file
 * @param {ext} ext
 * @return {string}
 */
function ext(file, exts){
  return file + '.' + exts;
}

module.exports = {
  ext : ext,
  isFileExist : isFileExist
};
