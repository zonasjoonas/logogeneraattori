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

  colors = [
    [39, 37, 37],    //1
    [51, 52, 142],   //2
    [140, 140, 140], //3
    [125, 43, 139],  //4
    [163, 36, 48],   //5
    [107, 78, 47],   //6
    [309, 82, 48],   //7
    [209, 112, 156], //8
    [255, 242, 45],  //9
    [51, 164, 87]    //10
  ];

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
        //createGradient(mouseX, mouseY);
        //createRgbGradient(mouseX, 39, 51, 37, 52, 39, 142);
        multiRgbGradient(mouseX);
        interpolateKerning(mouseY);
        changeFonts(mouseY);
        //interpolateSize(mouseY);
      }
    });

  $("#liuku").on("input",
    function ()
    {
      $('#text').css("letter-spacing", $(this).val() + "px");
    }
  );

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


function multiRgbGradient (mouseX) {

  if(mouseX > 0.9) {
    var nMouse = (mouseX - 0.9) / (1 - 0.9);
    console.log(nMouse);
    createRgbGradient(nMouse,
        colors[8][0], colors[8][1], colors[8][2],
        colors[9][0], colors[9][1], colors[9][2]);
  }
  else if (mouseX > 0.8) {
    var nMouse = (mouseX - 0.8) / (0.9 - 0.8);
    createRgbGradient(nMouse,
        colors[7][0], colors[7][1], colors[7][2],
        colors[8][0], colors[8][1], colors[8][2]);
  }
  else if (mouseX > 0.7) {
    var nMouse = (mouseX - 0.7) / (0.8 - 0.7);
    createRgbGradient(nMouse,
        colors[6][0], colors[6][1], colors[6][2],
        colors[7][0], colors[7][1], colors[7][2]);
  }
  else if (mouseX > 0.6) {
    var nMouse = (mouseX - 0.6) / (0.7 - 0.6);
    createRgbGradient(nMouse,
        colors[5][0], colors[5][1], colors[5][2],
        colors[6][0], colors[6][1], colors[6][2]);
  }
  else if (mouseX > 0.5) {
    var nMouse = (mouseX - 0.5) / (0.6 - 0.5);
    createRgbGradient(nMouse,
        colors[4][0], colors[4][1], colors[4][2],
        colors[5][0], colors[5][1], colors[5][2]);
  }
  else if (mouseX > 0.4) {
    var nMouse = (mouseX - 0.4) / (0.5 - 0.4);
    createRgbGradient(nMouse,
        colors[3][0], colors[3][1], colors[3][2],
        colors[4][0], colors[4][1], colors[4][2]);
  }
  else if (mouseX > 0.3) {
    var nMouse = (mouseX - 0.3) / (0.4 - 0.3);
    createRgbGradient(nMouse,
        colors[2][0], colors[2][1], colors[2][2],
        colors[3][0], colors[3][1], colors[3][2]);
  }
  else if (mouseX > 0.2) {
    var nMouse = (mouseX - 0.2) / (0.3 - 0.2);
    createRgbGradient(nMouse,
        colors[1][0], colors[1][1], colors[1][2],
        colors[2][0], colors[2][1], colors[2][2]);
  }
  else if (mouseX > 0.1) {
    var nMouse = (mouseX - 0.1) / (0.2 - 0.1);
    createRgbGradient(nMouse,
        colors[0][0], colors[0][1], colors[0][2],
        colors[1][0], colors[1][1], colors[1][2]);
  }
  else {
    var nMouse = mouseX / 0.1;
    //laita RGB ylos suoraan
    createRgbGradient(nMouse,
        255, 255, 255,
        colors[0][0], colors[0][1], colors[0][2]);
  }
}

function createRgbGradient (mouse, r1, g1, b1, r2, g2, b2) {
  r = linearInterpolation(r1, r2, mouse);
  g = linearInterpolation(g1, g2, mouse);
  b = linearInterpolation(b1, b2, mouse);
  c = surfacecurve.color('rgb(' + r + "," + g + "," + b + ")");
  r = c.red();
  g = c.green();
  b = c.blue();
  //console.log(r, g, b);
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
  return p0 + (t * (p1 - p0));
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