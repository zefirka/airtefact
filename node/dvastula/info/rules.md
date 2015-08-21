# Пробуем парсер

`,-/   ,-/`

 - забираем последниюю версию парсера и переходим нужную ветку
  ```
  git checkout master
  git pull
  git checkout parser
  ```

 - переходим в дирректорую парсера (API еще нет)
  ```
  cd node/dvastule
  ```
 - запускаем REPL с парсером
  ```
  node repl.js
  есть два стула...>
  ```
 - вводим команды (например `[def x "value"]`) и смотрим, что вышло:
  ```
  function (){ return $I["def"]; },function (){ return $I["x"]; },value
  ```
  Какая-то ересь, ведь repl.js - вызывает `.toString()`.

 - если хотим увидеть во что транслируется dvastula-код делаем так:
  ```
  node
  >var s2 = require('./s2');
  >s2('[def x "value"]');
  >[ [ [Function], [Function], 'value' ] ]
  ```

[Результат можно вывести в консоль или поймать здесь](https://github.com/zefirka/nadmozg/blob/parser/node/dvastula/s2.js#L13)
