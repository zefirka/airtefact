# Interpreter vs. Compiler

Надо рассмотреть что как будет потенциально работать.


## Исходный код на dvastula и его суть

```
# в текущем скопе задаем переменную x со значением 10
[def x 10]

# для объекта с айдишником allah
[for $allah
    # в скопе объекта задаем переменную algorith, из которой потом будет читать надмозг
    [def algorithm
        # список
        [list
            # какая-то глобальная функция go-to c параметрами 0 0 :as go-to-start
            [go-to 0 0 :as go-to-start]
            [go-to $game.width $game.height :as go-to-end]
    ]]

    # внутри скопа объекта определяем поведение декларативно, мол
    [when go-to-start : # когда находишься в фазе go-to-start
      # и если позиция объекта больше половины ширины игры, то  исполняй функцию be-green
      [if { this.x > $game.halfwidth } be-green idle]
    ]

    # определяем в скопе объекта функцию be-green
    [def be-green [ lambda[]
      { this.color = 'green' }
    ]]
]
```

Если мы пишем компилятор, то должно выйти нечто подобное, которое один раз исполнится в контексте игры и таким образом привяжется к скоупам объекта и прочее.

```js
(function comp(globalEnv){
    this.set('x', 10);

    (function(){

        this.set('algorithm', [
            globalEnv.get('go-to').call(this, 0, 0, 'go-to-start'),
            globalEnv.get('go-to').call(this, globalEnv.get('game.width'), globalEnv.get('game.height'), 'go-to-end')
        ]);

        this.get('when').call(this.childScope(), 'go-to-start',
          (function(){
            if ( this.get('x') > globalEnv.get('game.halfwidth') ){
              this.call('be-green', this);
            } else {
              this.call('idle', this)
            }
          }).bind(this)
        );

        this.set('be-green', function(){
          return this.color = 'green';
        });

    }).call(getObjectScope('allah'));

}).call(globalScope)
```
