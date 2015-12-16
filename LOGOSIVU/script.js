$(document).ready(function()
{
  $('#picarea').hide();
  for(var i = 1; i <= 8; i++) {
    $('#t'+i).hide();
  }

  var mouseX;
  var mouseY;
  var stop = false;
  var showPics = false;

  colors = [
    [176, 179, 176],    //1
    [77, 80, 158],   //2
    [140, 140, 140], //3
    [136, 72, 151],  //4
    [206, 57, 60],   //5
    [158, 119, 57],   //6
    [243, 98, 59],   //7
    [213, 110, 166], //8
    [255, 242, 45],  //9
    [51, 164, 87]    //10
  ];

  checkMaxlength();

  $(".color1").mouseover(function() {
    $(this).css("height", "5.25cm");
    //$(".color1").css("height", "200px");
    $(this).css("z-index", "1000");
    var idNum = $(this).attr('id');
    $('#t'+idNum).show();
  });

  $(".color1").mouseleave(function() {
    $(this).css("height", "3.5%");
    var idNum = $(this).attr('id');
    $('#t'+idNum).hide();
  });

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
        positionColors(mouseX, mouseY);
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
      showPics = !showPics;
      if(!showPics) {
        $('#picarea').hide();
      }
      else {
        $('#picarea').show();
      }

    }
    //console.log(stop);
  });
});

function positionColors (mouseX, mouseY) {
  if(mouseX > 0.875) {
    changeTextColor(colors[9][0], colors[9][1], colors[9][2], mouseY)
  }
  else if(mouseX > 0.750) {
    changeTextColor(colors[8][0], colors[8][1], colors[8][2], mouseY)
  }
  else if(mouseX > 0.625) {
    changeTextColor(colors[7][0], colors[7][1], colors[7][2], mouseY)
  }
  else if(mouseX > 0.500) {
    changeTextColor(colors[6][0], colors[6][1], colors[6][2], mouseY)
  }
  else if(mouseX > 0.375) {
    changeTextColor(colors[5][0], colors[5][1], colors[5][2], mouseY)
  }
  else if(mouseX > 0.250) {
    changeTextColor(colors[4][0], colors[4][1], colors[4][2], mouseY)
  }
  else if(mouseX > 0.125) {
    changeTextColor(colors[1][0], colors[1][1], colors[1][2], mouseY)
  }
  else if(mouseX < 0.125) {
    changeTextColor(colors[0][0], colors[0][1], colors[0][2], mouseY)
  }

}

function changeTextColor(r, g, b, mouseY) {
  var c = surfacecurve.color('rgb(' + r + "," + g + "," + b + ")");
  r = c.red();
  g = c.green();
  b = c.blue();
  mouseY = exponentialInterpolation(1, 0, mouseY);
  //console.log(Math.floor((g * mouseY)));
  $('#text').css("text-shadow", "0 0 0 rgb(" + Math.floor(r * mouseY)
      + "," + Math.floor(g * mouseY) + "," + Math.floor(b * mouseY) + ")");
}

function interpolateKerning (mouseY) {
  if(mouseY <= 0.33) {
    var kerning = linearInterpolation(50, -30, mouseY);
    //console.log(kerning);
  }
  else if(mouseY <= 0.66) {
    var kerning = linearInterpolation(50, 10, mouseY);
    //console.log(kerning);
  }
  else {
    var kerning = linearInterpolation(16, 0, mouseY);
  }
  $('#text').css("letter-spacing", kerning);
}

function changeFonts (mouseY) {
  if(mouseY > 0.66) {
    $('#text').css("font-family", "Logofont_bold");
    $('#text').css("line-height", "130%");
  }
  else if (mouseY > 0.33) {
    $('#text').css("font-family", "Logofont_reg");
    $('#text').css("line-height", "80%");
  }
  else {
    $('#text').css("font-family", "Logofont_a");
    $('#text').css("line-height", "130%");
  }
}

function linearInterpolation (p0, p1, t) {
  return p0 + (t * (p1 - p0));
}

function exponentialInterpolation(p0, p1, t) {
  return (p0*2) + (t * ((p1*2) - (p0*2)));
}

function checkMaxlength () {
  $("#text").each(function() {
    var width = $(window).width();
    if(width >= 1600) {
      $(this).attr('maxlength', 9);
    }
    else if(width >= 1400) {
      $(this).attr('maxlength', 8);
    }
    else if(width >= 1200) {
      $(this).attr('maxlength', 7);
    }
    else if(width >= 1000) {
      $(this).attr('maxlength', 6);
    }
    else if(width >= 900) {
      $(this).attr('maxlength', 5);
    }
    else {
      $(this).attr('maxlength', 4);
    }
  });
};