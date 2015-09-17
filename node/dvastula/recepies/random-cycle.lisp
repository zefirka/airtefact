;; goes to the random point on canvas

[let gx $width]
[let gy $height]

[defn random-point[]
  [hash 
    x [rand-int 0 gx]
    y [rand-int 0 gy]
  ]
]

[def point [random-point]]

[phase goto-point [
  [let dist-to-point [do dist-to point]]

  [if [< dist-to-point 10] 
      [
      	[def point [random-point]]
      	point
      ]
      [do goto point]]
]]

[for 0 [
  [phase goto-point]
]]