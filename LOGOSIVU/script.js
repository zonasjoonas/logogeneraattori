/*
TODO: muista laittaa niin etta teksti ei mene ruudun yli
niin etta tekstin koko pienenee dynaamisesti

TODO: tee fontin vertical keskityksestä sivun koon mukaan muuttuva
silleen etta se pysyy keskellä
 */

$(document).ready(function()
{
  var mouseX;
  var mouseY;
  var h, s, l;
  var r, g, b;
  var c;
  var stop = false;

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
      if(!stop) {
        mouseX = event.pageX/$(window).width();
        mouseY = event.pageY/$(window).height();
        //console.log("X: " + mouseX);
        //console.log("Y: " + mouseY);
        createGradient(mouseX, mouseY);
        interpolateKerning(mouseY);
        changeFonts(mouseY);
        //interpolateSize(mouseY);
      }
    });

  $("#liuku").on("input",
  function ()
  {
    $('#text').css("letter-spacing", $(this).val() + "px");
  });

    $(window).resize(function() {
        checkMaxlength();
    });
  $(document).keypress(function(e) {
    if(e.keyCode === 27) {
      stop = !stop;
    }
    //console.log(stop);
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
  //console.log(l);
  //console.log(c.red() + ' ' + c.green() + ' ' + c.blue());
  r = c.red();
  g = c.green();
  b = c.blue();
  //console.log(r + " " + g + " " + b);
  $('#text').css("color", "rgb(" + r + "," + g + "," + b + ")");
}

function interpolateKerning (mouseY) {
  if(mouseY <= 0.66) {
    var kerning = linearInterpolation(50, -20, mouseY);
    //console.log(kerning);
  }
  else {
    var kerning = linearInterpolation(16, -43, mouseY);
  }
  $('#text').css("letter-spacing", kerning);
}

function interpolateSize (mouseY) {
  var size = linearInterpolation(200, 500, mouseY);
  //var place = linearInterpolation(100, 0, mouseY);
  $('#text').css("font-size", size);
  //$('#text').css("line-height", place + "%");
}

function changeFonts (mouseY) {
  if(mouseY > 0.66) {
    $('#text').css("font-family", "Logofont_bold");
    $('#text').css("line-height", "80%");
  }
  else if (mouseY > 0.33) {
    $('#text').css("font-family", "Logofont_reg");
    $('#text').css("line-height", "80%");
  }
  else {
    $('#text').css("font-family", "Logofont_a");
    $('#text').css("line-height", "100%");
  }
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
          $(this).attr('maxlength', 9);
          //console.log(width)
      }
      else if(width >= 900) {
      $(this).attr('maxlength', 5);
      //console.log(width)
    }
  });
};