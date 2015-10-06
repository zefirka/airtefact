;; goes to the random point on canvas

[defn random-point[]
  [hash 
    x [rand-int 0 $width]
    y [rand-int 0 $height]
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