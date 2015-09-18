[defn coor[x y]
  [hash x x y y ]]

[def points [list 
  [coor 0 0]
  [coor $width 0]
  [coor $width $height]
  [coor 0 $height]
]]

[def point-number 0]

[defn get-current-point[point]
  [nth points point]]

[defn switch-point[point][
  [if [eq point-number 3]
      [def point-number 0]
      [def point-number [+ 1 point-number]]]
]]

[phase goto-point [
  [let current-point [get-current-point point-number]]
  [let dist-to-point [do dist-to current-point]]

  [if [< dist-to-point 10]
      [switch-point point-number]
      [do goto current-point]]
]]

[for 0 [
  [phase goto-point]
]]