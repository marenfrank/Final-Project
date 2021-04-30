(function() {
  "use strict";



  window.addEventListener("load", init);


  function init(){

    id("signUp").addEventListener("click", function(){
      id("SU").classList.remove("hidden");
      id('logIn').classList.add("hidden");
      id("signUp").classList.add("hidden");
    });

    id("cancelbtn2").addEventListener("click", function(){

      id('logIn').classList.remove("hidden");
      id("signUp").classList.remove("hidden");
      id("SU").classList.add("hidden");
    });

    id("signupbtn").addEventListener("click", function(){
      window.location.href='final.html';
    });

    id("logIn").addEventListener("click", function(){
      id("LI").classList.remove("hidden");
      id('logIn').classList.add("hidden");
      id("signUp").classList.add("hidden");
    });

    id("cancelbtn1").addEventListener("click", function(){

      id('logIn').classList.remove("hidden");
      id("signUp").classList.remove("hidden");
      id("LI").classList.add("hidden");
    });

    id("loginbtn").addEventListener("click", function(){
      window.location.href='final.html';
    });






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
