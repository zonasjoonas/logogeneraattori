$(window).load(function()
{
  
  $("body").flowtype({
    minumum: 200,
    maximum: 1200
  });


  $("#text").flowtype({
    minFont: 20,
    maxFont: 300,
    fontRatio: 2
  });


  $("#liuku").on("input",
  function ()
  {
    $('#text').css("letter-spacing", $(this).val() + "px");

  });

  $("#liuku2").on("input",
  function hueChanger ()
  {
    var thisVal = $(this).val();
    var r = thisVal - 103; // r 24
    var g = thisVal + 100; // g 217
    var b = thisVal + 62;  // b 182

    if(thisVal < 127 && thisVal > 24)
    {
      //r = (thisVal * -1) - 103; //this thing makes the value a negative!
      r = 24;
      g = 217;
      b = thisVal;
      //window.alert(r);
    }
    else if(thisVal <= 24)
    {
      r = thisVal;
      g = 217;
      b = 24;
    }
    else if(thisVal >= 127) //&& thisVal < 217 //so the values change differently after 217
    {
      r = 24;
      g = 217;
      b = thisVal;
    }
    /*
    else
    {
      r = 24;
      g = thisVal--; //217 - 1 - 1 - 1
      b = 217;
    }
    */
    $('#text').css("color", "rgb(" + r + "," + g + "," + b + ")");
  });
});
