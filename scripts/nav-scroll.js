//scroll logic
$(function(){
    var lastScrollTop = 0;
    var navHeight = $('.nav-bar').outerHeight();
    var mobileNavHeight = $('.nav-bar-mobile').outerHeight();
  
    $(window).scroll(function(){
      var scrolled = $(document).scrollTop();
  
      if(scrolled > navHeight || scrolled > mobileNavHeight){
        if (scrolled > lastScrollTop){        
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