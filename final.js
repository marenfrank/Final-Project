(function() {
  "use strict";
  const URL = "";


  window.addEventListener("load", init);


  function init(){



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
})();
