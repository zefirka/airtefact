;; goes to the random point on canvas

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