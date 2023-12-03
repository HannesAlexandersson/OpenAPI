//scroll logic (makes the navbar disappear when scrolling down and appear when scrolling up) using jquery
$(function(){
    var lastScrollTop = 0;
    var navHeight = $('.nav-bar').outerHeight(); //gets the height of the navbar on desktop
    var mobileNavHeight = $('.nav-bar-mobile').outerHeight(); //gets the height of the navbar on mobile
  
    $(window).scroll(function(){
      var scrolled = $(document).scrollTop(); //gets the amount scrolled from the top of the page
  
      if(scrolled > navHeight || scrolled > mobileNavHeight){//if the amount scrolled is greater than the height of the navbar
        if (scrolled > lastScrollTop){ //if the amount scrolled is greater than the last amount scrolled
          //toogles the classes to make the navbar disappear       
          $('.nav-bar').removeClass('sticky').addClass('animate');
          $('.nav-bar-mobile').removeClass('sticky').addClass('animate');
        } else {        
          $('.nav-bar').removeClass('animate').addClass('sticky');
          $('.nav-bar-mobile').removeClass('animate').addClass('sticky');
        }
      }
      else{      
        $('.nav-bar').removeClass('animate sticky');
        $('.nav-bar-mobile').removeClass('animate sticky');
      }
  
      lastScrollTop = scrolled;
    });
  });

  // dropdown logic
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }