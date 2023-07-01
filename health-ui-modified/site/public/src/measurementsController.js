function retrieveMeasurementInformation() {

  if (!sessionStorage.getItem("patientid")) {
    console.log("Redirecting to login");
    window.location = '/login.html';
    return;
  }

  var url = "./measurements";
  var params = "id="+sessionStorage.getItem("patientid");

  var http = new XMLHttpRequest();

  http.open("GET", url + "?" + params, true);

  http.onreadystatechange = function() {

    if (http.readyState == 4 && http.status == 200) {

      var measurementdata = JSON.parse(http.responseText);

      var smoker = document.getElementById('smoker');
      smoker.innerHTML = measurementdata.smokerstatus;

      var height = document.getElementById('height');
      height.innerHTML = measurementdata.height + 'm';

      var weight = document.getElementById('weight');
      weight.innerHTML = 'Weight: ' + measurementdata.weight + ' kg';

      var bmi = document.getElementById('bmi');
      var bmicalc = Math.round(measurementdata.weight / (measurementdata.height * measurementdata.height))

      bmi.innerHTML = 'BMI: ' + bmicalc + ' [' + measurementdata.bmirange + ']';

      drawBloodPressureChart(measurementdata.sys, measurementdata.dia, measurementdata.date);

      var patientlogout = document.getElementById('logout');
      patientlogout.innerHTML = sessionStorage.getItem("patientusername") + "/logout";
    }
  }
  http.send(null);
}


function drawBloodPressureChart(sys, dia, date) {

  var c = document.getElementById("canvas");

  if (c != undefined) {

    var ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.strokeStyle = "#99DDE5"
    ctx.beginPath();
    ctx.stroke();
    ctx.lineWidth = 0.8;

    var xbaseline = 57.5;
    var ybaseline = 59.5;
    var numberOfBoxes = 6;
    var boxcount = 0;
    var increment = 30;
    var widthLimit = 240;
    var heightLimit = 200;
    var x = xbaseline;
    var y = ybaseline;

    if (sys < 120) {
      if (dia < 80) {
        selectedBox = 5;
      } else if (dia >= 80 && dia < 85) {
        selectedBox = 4;
      } else if (dia >= 85 && dia < 90) {
        selectedBox = 3;
      } else if (dia >= 90 && dia < 100) {
        selectedBox = 2;
      } else if (dia >= 100 && dia < 110) {
        selectedBox = 1;
      } else if (dia >= 110 && dia < 120) {
        selectedBox = 0;
      }
    } else if (sys >= 120 && sys < 130) {
      if (dia < 85) {
        selectedBox = 4;
      } else if (dia >= 85 && dia < 90) {
        selectedBox = 3;
      } else if (dia >= 90 && dia < 100) {
        selectedBox = 2;
      } else if (dia >= 100 && dia < 110) {
        selectedBox = 1;
      } else if (dia >= 110 && dia < 120) {
        selectedBox = 0;
      }
    } else if (sys >= 130 && sys < 140) {
      if (dia < 90) {
        selectedBox = 3;     
      } else if (dia >= 90 && dia < 100) {
        selectedBox = 2;                   
      } else if (dia >= 100 && dia < 110) {
        selectedBox = 1;
      } else if (dia >= 110 && dia < 120) {
        selectedBox = 0;                                       
      }
    } else if (sys >= 140 && sys < 160) {
      if (dia < 100) {
        selectedBox = 2;
      } else if (dia >= 100 && dia < 110) {
        selectedBox = 1;
      } else if (dia >= 110 && dia < 120) {
        selectedBox = 0;
      }
    } else if (sys >= 160 && sys < 180) {
      if (dia < 110) {
        selectedBox = 1;
      } else if (dia >= 110 && dia < 120) {
        selectedBox = 0;
      }
    } else if (sys >= 180 && sys < 200) {
      if (dia < 120) {
        selectedBox = 0;
      }
    }

    if (sys > 70 && sys < 120) {
      y += 150 + (120 - sys);   
    } else if (sys >= 120 && sys <140) {
      y += 90 + ((140 - sys) * 3 );
    } else if (sys >= 140 && sys <200) {
      y += (200 - sys) * 1.5;
    }
 
    if (dia > 50 && dia < 80) {
      x += (dia - 50) * 3; 
    } else if (dia >=80 && dia <90) {
      x += 90 + ((dia - 80)*6);
    } else if (dia >=90 && dia <120){
      x += 150 + ((dia - 90)*3);
    }
    var yLabels = ['120', '130', '140', '160', '180', '']
    var yLabelsRail = 20;

    var labels = ['Grade 3 Hypertension', 'Grade 2 Hypertension', 'Grade 1 Hypertension', 'High-Normal', 'Normal', 'Optimal']

    var labelRail = 75;

    for (boxcount = 0; boxcount < numberOfBoxes; boxcount++) {

      if (boxcount == selectedBox) {
        ctx.fillStyle = "#CCEEF2";
      } else {
        ctx.fillStyle = "white";
      }

      var delta = increment * boxcount;
      ctx.fillRect(xbaseline, ybaseline + delta, widthLimit - delta, heightLimit - delta);
      ctx.strokeRect(xbaseline, ybaseline + delta, widthLimit - delta, heightLimit - delta);

      ctx.fillStyle = "#0F4C81";
      ctx.font = '12px sans-serif';

      var yLabelpoint = (heightLimit + 15) - boxcount * increment;
      var labelPoint = (heightLimit - 120) + boxcount * increment;

      ctx.fillText(yLabels[boxcount], yLabelsRail, yLabelpoint);

      ctx.fillStyle = "#00ABC0"
      ctx.font = '11px sans-serif';

      ctx.fillText(labels[boxcount], labelRail, labelPoint);
    }

    ctx.fillStyle = "#0F4C81";
    ctx.strokeStyle = "#0F4C81";

    ctx.font = '12px sans-serif';

    ctx.fillText('SYS', 20, 265);
    ctx.fillText('DIA', 50, 285);

    ctx.fillStyle = "#0F4C81";
    ctx.font = '12px sans-serif';

    ctx.fillText('80', 143, 285);
    ctx.fillText('85', 175, 285);
    ctx.fillText('90', 205, 285);
    ctx.fillText('100', 230, 285);
    ctx.fillText('110', 260, 285);

    ctx.font = '14px sans-serif';
    ctx.fillText('Blood Pressure, last tested '+ date, 20, 35)

    // ctx.lineWidth = 3;
    ctx.fillStyle = "#0F4C81";
    ctx.beginPath();
    ctx.arc(x,y, 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}
