# DVASTULA Syntax

`,-/   ,-/`

Предлагай свои варианты.

## v.2

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
[defn increment[x] [+ x 1 ]]

[defn increment[x] {x + 1}]

# lambda function
[lambda [x] [+ x 1]]
```

### Поток управления
```
# condition
[ if  {x > 10}
      [js console.log('test')]
      [def x {x + 1}]
]

# loop
[ dolist [x [list 1 2 3 4]]
  {alert(x)}
]
```

### Абстракция над объектами
```
[ for object-id [
  [set-algorithm [
    [go-to $left $top] as phase-1
    [make-namaz 'Allah!'] as namaz
    [boom 100] as phase-2]]

  [when phase-1 [
    [cond [len @lookAround]
          0 : [call @moveRandomly]
          1 : [setPhase follower {this.get('lookAround')[0]}
    ]]
  ]]

  [when follower(object)
      if(distance(this, object) < 10)
        this.MoveTo(object);
      else
        setPhase(phase-1);
      ]

  [when namaz [
    ...
  ]]

  [when phase-2 [
    ...
  ]]
]]

```
#### Плюсы
 - Легко парсить
 - Вроде понятно глазу

#### Минусы
 - Сложная логика, трудно интерпретировать контекст
 - Незнакомый синтаксис (никаких аналогов)
