[def min-x 10]
[def max-x [- $width 10]]

[phase left [
  [do move-left]
  [if [< @x min-x]
      [phase 'right']]
]]

[phase right [
  [do move-right]
  [if [> @x max-x]
      [phase 'left']]
]]

[for 0 [
  [phase [if [< @x [/ 2 $width]] 'right' 'left']]
]]

###########

[def point {{ x:$width, y:$height }}]

[phase idle []]

[phase goto-point [
  [def dist-to-point [do dist-to point]]
  [if [< dist-to-point 10] 
      [phase idle]
      [do goto point]]
]]

[for 0 [
  [phase goto-point]
]]

#############

[def point [hash  
  x [rand-int 0 $width]
  y [rand-int 0 $height]
]]

[phase goto-point [
  [let dist-to-point [do dist-to point]]

  [if [< dist-to-point 10] 
      [idle]
      [do goto point]]
]]

[for 0 [
  [phase goto-point]
]]