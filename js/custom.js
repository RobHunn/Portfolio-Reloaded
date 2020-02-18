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

	

	  $('a.btn-74').smoothScroll();
	  

	
	/* ..............................................
    BaguetteBox
    ................................................. */
	
	baguetteBox.run('.tz-gallery', {
		animation: 'fadeIn',
		noScrollbars: true
	});

	
}(jQuery));

// ****** jQuery end ******