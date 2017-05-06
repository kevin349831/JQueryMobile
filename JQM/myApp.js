//$ can use jQuery to replace
//there can use pagecreate or pageshow
//pageshow is while open this page and loaded , run

/*第一版
$(document).on("pagecreate","#page1",function(){ //run this when #page1 created
  $("#page6").on("pageshow",function(event){ // run this when #page6 created
    var url= "http://data.kaohsiung.gov.tw/Opendata/DownLoad.aspx?Type=2&CaseNo1=AV&CaseNo2=1&FileType=1&Lang=C&FolderType=";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200){
        myObj = JSON.parse(this.responseText);
        var htmlText = "<table border='1'><tr><th>景點名稱</th><th>緯度(Px)</th><th>經度(Py)</th></tr>"
        for(i=0;i<myObj.length;i++){
          htmlText +=	"<tr><td>" + myObj[i].Name + "</td><td>" + myObj[1].Px + "</td><td>" + myObj[2].Py + "</td></tr>";
        }
        document.getElementById("demo").innerHTML = htmlText + "</table>";
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  })
});
*/

/*第二版-顯示景點*/
$(document).on("pagecreate","#page6",function(){ // run this when #page6 created
  //http://gph.is/1cYmtb9
  var url= "http://data.kaohsiung.gov.tw/Opendata/DownLoad.aspx?Type=2&CaseNo1=AV&CaseNo2=1&FileType=1&Lang=C&FolderType=";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      myObj = JSON.parse(this.responseText);
      var htmlText = "<table border='1'><tr><th>景點名稱</th><th>緯度(Px)</th><th>經度(Py)</th></tr>"
      for(i=0;i<myObj.length;i++){
        htmlText +=	"<tr><td>" + myObj[i].Name + "</td><td>" + myObj[1].Px + "</td><td>" + myObj[2].Py + "</td></tr>";
      }
      document.getElementById("demo").innerHTML = htmlText + "</table>";
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
});

//顯示目前位置 show current position

$(document).on("pagecreate","#page5",function(){ // run this when #page6 created
  var x = document.getElementById("demo2");

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }

  function showPosition(position) {
      x.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
  }

  getLocation();
});
