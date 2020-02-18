(function($) {
    "use strict";
    
	/* ..............................................
    Special Menu
    ................................................. */
	
	var Container = $('.container');
	Container.imagesLoaded(function () {
		var portfolio = $('.special-menu');
		portfolio.on('click', 'button', function () {
			$(this).addClass('active').siblings().removeClass('active');
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
		var $grid = $('.special-list').isotope({
			itemSelector: '.special-grid'
		});
	});
	//sticky nav
        $(window).scroll(function(){
          var top = $(window).scrollTop();
          var width = $( window ).width();
  
           if(top >= 280 || width < 820){
               $("nav").addClass("secondary");
           }
           else
               if($("nav").hasClass("secondary")){
                  $("nav").removeClass("secondary");
               }  
      });

		//ripple effect
	  $('.slider').ripples({
            dropRadius: 12,
            perturbance: .005,
        });

	

	// Add smooth scrolling to all links
  $("a.nav-link").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
	  

	
	/* ..............................................
    BaguetteBox
    ................................................. */
	
	baguetteBox.run('.tz-gallery', {
		animation: 'fadeIn',
		noScrollbars: true
	});

	
}(jQuery));

// ****** jQuery end ******