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
// run this when #page6 created
$(document).on("pagecreate","#page6",function(){
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
// run this when #page6 created
$(document).on("pagecreate","#page5",function(){
  var x = document.getElementById("showLatLon");

  function getLocation() {
      if (navigator.geolocation) {
        // timeout 10 s
        var options = {timeout:10000}
        //showPositon, showError, options
          navigator.geolocation.getCurrentPosition(showPosition, showError, options);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }

  //get position and how to use this data
  function showPosition(position) {
      x.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;

      lat = position.coords.latitude;
      lon = position.coords.longitude;
      latlon = new google.maps.LatLng(lat, lon);
      mapholder = document.getElementById('showMap');
      mapholder.style.height = '300px';
      mapholder.style.width = '350px';

      var myOptions = {
        center:latlon,zoom:14,
        //google.maps.MapTypeId.ROADMAP,'satellite','hybrid'
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
      }

      var map = new google.maps.Map(mapholder, myOptions);
      //mark a red point on map
      var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});

      /*there is a static maps
      //lat and lon save in latlon
      var latlon = position.coords.latitude + "," + position.coords.longitude;
      //this is a google map picture
      var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
      document.getElementById("showMap").innerHTML = "<img src='"+img_url+"'>";
      END*/
  }

  //error message
  function showError(error) {
      switch(error.code) {
          case error.PERMISSION_DENIED:
              x.innerHTML = "User denied the request for Geolocation."
              break;
          case error.POSITION_UNAVAILABLE:
              x.innerHTML = "Location information is unavailable."
              break;
          case error.TIMEOUT:
              x.innerHTML = "The request to get user location timed out."
              break;
          case error.UNKNOWN_ERROR:
              x.innerHTML = "An unknown error occurred."
              break;
      }
  }

  getLocation();
});
