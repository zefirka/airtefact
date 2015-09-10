[def left-top [hash  
  x 0
  y 0
]]

[def right-top [hash 
  x $width
  y 0
]]

[def left-bottom [hash  
  x 0
  y $height
]]

[def right-bottom [hash 
  x $width
  y $height
]]

[def points [list 
  left-top
  right-top
  right-bottom
  left-bottom
]]

[def point-number 0]
[def current-point [nth points point-number]]

[defn switch-point[point][
  [def point-number [+ 1 point-number]]
  [def current-point [nth points point-number]]
]]

[phase goto-point [
  [def dist-to-point [do dist-to current-point]]

  [if [< dist-to-point 10]
      [switch-point null]
      [do goto point]]
]]

[def point left-top]

[for 0 [
  [phase goto-point]
]]