;; Moves right and left 

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