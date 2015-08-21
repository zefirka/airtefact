# DVASTULA Syntax

`,-/   ,-/`

Предлагай свои варианты.

## v.1

#### Комменты
```
# comment
```

### Определения
```
# variable definition
[def variable-name 123]

# dereference of variable
@variable-name

# function definition
[def increment [ x -> {x + 1} ]]

# lambda function
[[ x -> {x + 1} ] 10] # 11
```

### Поток управления
```
# condition
[ if {@x > 10}
  then [js console.log('test')]
  else [def x {x + 1}]
]

# loop
[ loop-of {@x [x -> {x > 5}]}
  do [js console.log('test')]
  finish [def x 123]
]
```

### Абстракция над объектами
```
[ describe $ID-объекта-или-имя [    # описываем поведение объекта
  [ algorithm [                     # линейный алгоритм
    [go-to @left @top ]    -> trail # сначала идти налево вверх (этап называем trail)
    [go-to @left @bottom ] -> down  # потом налево вниз (этот этап называем down)

    [when trail [                   # во время этапа trail
      [try-to @avoid]               # пытаться вызвать метод avoid
      [try-to @whirle               # а еще метод whirl
        [only-when {@@ == 'ok'}]    # но только если результат равен 'ok'
      ]
      [never @collide]              # не пытаться вызвать collide
    ]]

    [when down [                    # во время этапа down
      [compose @avoid @whirle       # совмсетить методы avoid и whirle

        [when {$y > @y50%} [        # если мы спустились ниже 50% высоты
          [@avoid 25%]              # avoid вызывать 25% попыток
          [@whirle 75%]             # whirle вызывать 75% попыток
        ]]

        [otherwise [                # в других случаях
          [@avoid --once--]         # вызывать avoid 1 раз
          [@whirle --default--]     # все оставшеемся всермя
        ]]
      ]
    ]]
  ]]

  [def whirle [
    ### реализация whirle для этого объекта ###
  ]]

  [triggers ] ... ну ты понел
]]

# определение глобальной функции для каждого объекта
[def avoid [object -> [
  ### реализация avoid ###
]]]

```

#### Плюсы
 - Легко парсить
 - Вроде понятно глазу

#### Минусы
 - Сложная логика, трудно интерпретировать контекст
 - Незнакомый синтаксис (никаких аналогов)
