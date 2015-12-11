$(document).ready(function()
{
  var mouseX;
  var mouseY;
  var h, s, l;
  var r, g, b;
  var c;

  checkMaxlength();

  $("body").flowtype({
    minumum: 200,
    maximum: 1200
  });

  $("#text").flowtype({
    minFont: 20,
    maxFont: 300,
    fontRatio: 2
  });

  $("#area").mousemove(function(event) {
    mouseX = event.pageX/$(window).width();
    mouseY = event.pageY/$(window).height();
    //console.log("X: " + mouseX);
    //console.log("Y: " + mouseY);
    createGradient(mouseX, mouseY);
    interpolateKerning(mouseY);
  });

  $("#liuku").on("input",
  function ()
  {
    $('#text').css("letter-spacing", $(this).val() + "px");

  });

    $(window).resize(function() {
        checkMaxlength();
    });
});

function createGradient (mouseX, mouseY) {
  l = (mouseX + mouseY) * 0.5;
  var hp0 = 360;
  var hp1 = 235;
  var hp2 = 56;
  h = linearInterpolation(hp1, hp2, mouseX);
  l = linearInterpolation(100, 0, l);
  c = surfacecurve.color('hsl', [h, 100, l]);
  console.log(l);
  //console.log(c.red() + ' ' + c.green() + ' ' + c.blue());
  r = c.red();
  g = c.green();
  b = c.blue();
  //console.log(r + " " + g + " " + b);
  $('#text').css("color", "rgb(" + r + "," + g + "," + b + ")");
}

function interpolateKerning (mouseY) {
  var kerning = linearInterpolation(0, 10, mouseY);
  $('#text').css("letter-spacing", kerning);
}

function linearInterpolation (p0, p1, t) {
  return p0 + t * (p1 - p0);
}

function quadraticInterpolation (p0, p1, p2, t) {
  return ((1-t)*((1-t*(p0) + t*p1)) + (t*((1-t)*p1 + (t*p2))));
}

function checkMaxlength () {
  $("#text").each(function() {
    var width = $(window).width();
      if(width >= 1000) {
          $(this).attr('maxlength', 7);
          //console.log(width)
      }
      else if(width >= 900) {
      $(this).attr('maxlength', 5);
      //console.log(width)
    }
  });
};