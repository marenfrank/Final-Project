(function() {
  "use strict";

  const URL1 = "https://api.opencagedata.com/geocode/v1/json?q="
  const URL2 = "https://www.7timer.info/bin/civil.php?";
  // document.cookie = "promo_shown=1; Max-Age=2600000 SameSite=None; Secure";


  window.addEventListener("load", init);

  function init(){
    //calls gets users location input and passes through OpenCage API
    id("locationbtn").addEventListener("click", function(){
      if(id("plname").value && id("country").value != ""){
        getCords(id("plname").value + "," + id("country").value);
      } else {
        alert("Please put a city and country!");
      }
    });

    //functions for scroll to top
    let toTop = document.getElementById("toTop");
    window.onscroll = function(){scrollFunction();};

    toTop.addEventListener("click",function(){
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTop.style.display = "block";
      } else {
        toTop.style.display = "none";
      }
    }

    //functions to enlarge graphs
    let big = document.getElementById("myModal");
    let modalImg = document.getElementById("img01");

    document.querySelectorAll("img").forEach(item => {
      item.addEventListener("click", function(){
          clickBig(item);
      });
    });

    function clickBig(pic){
      big.style.display = "block";
      modalImg.src = pic.src;
    }

    let x = document.getElementsByClassName("close")[0];
    x.addEventListener("click", function(){
      big.style.display = "none";
    });
  }

  //Coordinates funtion
  function getCords(location){
    //encodes parameters
    location = encodeURIComponent(location);
    let url = URL1 + location + "&key=bac3f6dcad324dfc9cd02acbb67d1d90&pretty=1";

    fetch(url)
      .then(checkStatus)
      .then(response => response.text())
      .then(postCords)
      .catch(handleError);
  }

  //posts coordinates for user to see
  function postCords(response){
    //spits up text to get long and lat values
    let cords = response.split('"lat"')[3];
    let latitude = cords.substr(2,7);
    let long = cords.substr(37, 37);
    let longitude = long.substr(1,6);

    //displays long and lat values
    id("lonlat").innerText = latitude + "°, " + longitude + "°";

    //uses long and lat vlaues to generate weather info
    id("weatherbtn").classList.remove("hidden");
    id("weatherbtn").addEventListener("click", function(){
      getWeather(latitude, longitude);
    });
  }

  function getWeather(latitude, longitude){
    //src for graph png
    let src = URL2 + "lon=" + longitude + "&lat=" + latitude + "ac=0&lang=en&unit=metric&output=internal&tzshift=0";
    //url to get weather data
    let url = URL2 + "lon=" + longitude + "&lat=" + latitude + "&ac=0&unit=metric&output=json&tzshift=0";

    //reveal weather report title
    id("wr").classList.remove("hidden");
    //sets sun image to weather graph
    id("pic").src = src;

    fetch(url)
      .then(checkStatus)
      .then(response => response.json())
      .then(postWeather)
      .catch(handleError);
  }

  //posts weather report data in quick look text graph
  function postWeather(response){
    id("quicklook").classList.remove("hidden");
    id("message").classList.remove("hidden");
    id("place").innerText = id("plname").value;

    //Fills out data table

    id("wt1").innerText = weatherName(response["dataseries"][0]["weather"]);
    id("wt2").innerText = weatherName(response["dataseries"][1]["weather"]);
    id("wt3").innerText = weatherName(response["dataseries"][2]["weather"]);
    id("wt4").innerText = weatherName(response["dataseries"][3]["weather"]);
    id("wt5").innerText = weatherName(response["dataseries"][4]["weather"]);
    id("wt6").innerText = weatherName(response["dataseries"][5]["weather"]);
    id("wt7").innerText = weatherName(response["dataseries"][6]["weather"]);
    id("wt8").innerText = weatherName(response["dataseries"][7]["weather"]);

    id("at1").innerText = response["dataseries"][0]["temp2m"] + "°C";
    id("at2").innerText = response["dataseries"][1]["temp2m"] + "°C";
    id("at3").innerText = response["dataseries"][2]["temp2m"] + "°C";
    id("at4").innerText = response["dataseries"][3]["temp2m"] + "°C";
    id("at5").innerText = response["dataseries"][4]["temp2m"] + "°C";
    id("at6").innerText = response["dataseries"][5]["temp2m"] + "°C";
    id("at7").innerText = response["dataseries"][6]["temp2m"] + "°C";
    id("at8").innerText = response["dataseries"][7]["temp2m"] + "°C";

    id("w1").innerText = response["dataseries"][0]["wind10m"]["direction"];
    id("w2").innerText = response["dataseries"][1]["wind10m"]["direction"];
    id("w3").innerText = response["dataseries"][2]["wind10m"]["direction"];
    id("w4").innerText = response["dataseries"][3]["wind10m"]["direction"];
    id("w5").innerText = response["dataseries"][4]["wind10m"]["direction"];
    id("w6").innerText = response["dataseries"][5]["wind10m"]["direction"];
    id("w7").innerText = response["dataseries"][6]["wind10m"]["direction"];
    id("w8").innerText = response["dataseries"][7]["wind10m"]["direction"];

    id("cc1").innerText = cloudAmount(response["dataseries"][0]["cloudcover"]);
    id("cc2").innerText = cloudAmount(response["dataseries"][1]["cloudcover"]);
    id("cc3").innerText = cloudAmount(response["dataseries"][2]["cloudcover"]);
    id("cc4").innerText = cloudAmount(response["dataseries"][3]["cloudcover"]);
    id("cc5").innerText = cloudAmount(response["dataseries"][4]["cloudcover"]);
    id("cc6").innerText = cloudAmount(response["dataseries"][5]["cloudcover"]);
    id("cc7").innerText = cloudAmount(response["dataseries"][6]["cloudcover"]);
    id("cc8").innerText = cloudAmount(response["dataseries"][7]["cloudcover"]);

    id("pa1").innerText = percipAmount(response["dataseries"][0]["prec_amount"]);
    id("pa2").innerText = percipAmount(response["dataseries"][1]["prec_amount"]);
    id("pa3").innerText = percipAmount(response["dataseries"][2]["prec_amount"]);
    id("pa4").innerText = percipAmount(response["dataseries"][3]["prec_amount"]);
    id("pa5").innerText = percipAmount(response["dataseries"][4]["prec_amount"]);
    id("pa6").innerText = percipAmount(response["dataseries"][5]["prec_amount"]);
    id("pa7").innerText = percipAmount(response["dataseries"][6]["prec_amount"]);
    id("pa8").innerText = percipAmount(response["dataseries"][7]["prec_amount"]);

  }

  //Formats weather type
  function weatherName(r){
    if(r == "clearday" || "clearnight"){
      return "Clear";
    }else if(r == "pcloudyday" || "pcloudynight"){
      return "Partly Cloudy";
    }else if(r == "mcloudyday" || "mcloudynight"){
      return "Mostly Cloudy";
    }else if(r == "cloudyday" || "cloudynight"){
      return "Cloudy";
    }else if(r == "humidday" || "humidnight"){
      return "Humid";
    }else  if(r == "lightrainday" || "lightrainnight"){
      return "Light Rain";
    }else if(r == "oshowerday" || "oshowernight"){
      return "Partly Cloudly & Rain";
    }else if(r == "ishowerday" || "ishowernight"){
      return "Mostly Cloudy & Rain";
    }else if(r == "lightsnowday" || "lightsnownight"){
      return "Light Snow";
    }else if(r == "rainday" || "rainnight"){
      return "Rain";
    }else if(r == "snowday" || "snownight"){
      return "Snow";
    }else if(r == "rainsnowday" || "rainsnownight"){
      return "Rain & Snow";
    }else{
      return "Unidentified";
    }
  }

  //Formats cloud cover
  function cloudAmount(p){
    if(p == "1"){
      return "0%-6%";
    }else if(p == "2"){
      return "6%-19%";
    }else if(p == "3"){
      return "19%-31%";
    }else if(p == "4"){
      return "31%-44%";
    }else if(p == "5"){
      return "44%-56%";
    }else if(p == "6"){
      return "56%-69%";
    }else if(p == "7"){
      return "69%-81%";
    }else if(p == "8"){
      return "81%-94%";
    }else{
      return "94%-100%";
    }

  }

  //Formats precipitation amount
  function percipAmount(c){
    if(c == "1"){
      return "0-0.25mm/hr";
    }else if(c == "2"){
      return "0.25-1mm/hr";
    }else if(c == "3"){
      return "1-4mm/hr";
    }else if(c == "4"){
      return "4-10mm/hr";
    }else if(c == "5"){
      return "10-16mm/hr";
    }else if(c == "6"){
      return "16-30mm/hr";
    }else if(c == "7"){
      return "30-50mm/hr";
    }else if(c == "8"){
      return "50-75mm/hr";
    }else if(c == "9"){
      return "Over 75mm/hr";
    }else{
      return "None"
    }
  }


  /**
   * Fetches trivia data about the given numberValue and displays it on the page if
   * successful, logging an error to the console if an error occurred during the request.
   * @param {int} numberValue - value of number to request trivia for.
   */

  /**
   * Displays the trivia result response to the #output paragraph.
   * @param {string} response - response string from Numbers API request
   */


  function handleError(error){
    alert(error);
  }



  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response; // a Response object
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
