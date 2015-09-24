[phase test
  [
    [cond [> $width @x]  [do move-right] ]
    [cond [< $width @x]  [do move-left]  ]
  ]

]

[for 1 [[phase test]] ]
