(function() {
  "use strict";

  const URL1 = "https://api.opencagedata.com/geocode/v1/json?q="
  const URL2 = "https://www.7timer.info/bin/astro.php?";



  window.addEventListener("load", init);


  function init(){

    id("locationbtn").addEventListener("click", function(){
      if(id("plname").value && id("country").value != ""){
        getCords(id("plname").value + "," + id("country").value);
      } else {
        alert("Please put a city and country!");
      }

    });

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

  function postCords(response){
    let cords = [];


    let longitude;
    let latitude;


    id("weatherbtn").classList.remove("hidden");
    id("weatherbtn").addEventListener("click", function(){
      getWeather(longitude, latitude);
    });

  }

  function getWeather(longitude, latitude){
    //src for graph png
    let src = URL2 + "lon=" + longitude + "&lat=" + latitude + "ac=0&lang=en&unit=metric&output=internal&tzshift=0";
    //url to get weather date
    let url = URL2 + "lon=" + longitude + "&lat=" + latitude + "&ac=0&unit=metric&output=json&tzshift=0";


    id("pic").src = src;

    fetch(url)
      .then(checkStatus)
      .then(response => response.text())
      .then(postWeather)
      .catch(handleError);

  }

  function postWeather(response){
    id("message").classList.remove("hidden");
    id("place").innerText = id("plname").value;


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
