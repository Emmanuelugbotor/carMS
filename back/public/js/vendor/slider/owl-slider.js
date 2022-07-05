// JavaScript Document
$(document).on('ready', function() {
	
// TESTIMONIAL CAROUSEL
	  var owl = $(".header-slider");	 
	  owl.owlCarousel({
		  autoPlay: 4000,
		  items : 1, //10 items above 1000px browser width
		  itemsDesktop : [1920,1], //5 items between 1000px and 901px
		  itemsDesktopSmall : [900,1], // betweem 900px and 601px
		  itemsTablet: [600,1], //2 items between 600 and 0
		  itemsMobile : [380,1] 
	  });
	 
	  // Custom Navigation Events
	  $(".next").click(function(){
		owl.trigger('owl.next');
	  })
	  $(".prev").click(function(){
		owl.trigger('owl.prev');
	  })
	  $(".play").click(function(){
		owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
	  })
	  $(".stop").click(function(){
		owl.trigger('owl.stop');
	  })
	 
    
     
	
	 var owl = $(".testimonial");
     
      owl.owlCarousel({
		   autoPlay: 4000,
        itemsCustom : [
        [0, 1],
        [450, 1],
        [600, 1],
        [700, 2],
        [1000, 2],
        [1200, 3],
        [1400, 3],
        [1600,3]
      ]
      });
     
      // Custom Navigation Events
      $(".next").click(function(){
        owl.trigger('owl.next');
      })
      $(".prev").click(function(){
        owl.trigger('owl.prev');
      })
      $(".play").click(function(){
        owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
      })
      $(".stop").click(function(){
        owl.trigger('owl.stop');
      })
	  
	  
	  var owl = $(".client-logo");
     
      owl.owlCarousel({
		  loop:true,
		  responsiveClass:true,
		  center:true,
		  smartSpeed:2500,
		   autoPlay:true,
    autoplayTimeout:5000,
	lazyLoad : true,
        itemsCustom : [
        [0, 1],
        [450, 2],
        [600, 3],
        [700, 3],
		 [992, 4],
        [1000, 4],
        [1200, 5],
        [1400, 5],
        [1600,5]
      ]
      });
     
      // Custom Navigation Events
      $(".next").click(function(){
        owl.trigger('owl.next');
      })
      $(".prev").click(function(){
        owl.trigger('owl.prev');
      })
      $(".play").click(function(){
        owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
      })
      $(".stop").click(function(){
        owl.trigger('owl.stop');
      })
   

});



	$(document).on('ready', function() {
	  var owl = $(".fund-slider");	 
	  owl.owlCarousel({
		  autoPlay: 5000,		 
		  navigation : true,
		  navigationText: [
        "<div class='icon-left'></div>",
        "<div class='icon-right'></div>"
      ],	  
		  itemsCustom : [
        [0, 1],
        [450, 2],
        [600, 2],
        [700, 3],
        [1000, 3],
        [1200, 3],
        [1400, 3],
        [1600,3]
      ]
	  });
	 
	  // Custom Navigation Events
	  $(".next").click(function(){
		owl.trigger('owl.next');
	  })
	  $(".prev").click(function(){
		owl.trigger('owl.prev');
	  })
	  $(".play").click(function(){
		owl.trigger('owl.play',4500); //owl.play event accept autoPlay speed as second parameter
	  })
	  $(".stop").click(function(){
		owl.trigger('owl.stop');
	  })
	 
	 
	 
	  var owl = $(".team-carousel");	 
	  owl.owlCarousel({
		  autoPlay: 5000,		 
		  navigation : true,
		  navigationText: [
        "<div class='left carousel-control'></div>",
        "<div class='right carousel-control'></div>"
      ],	  
		 itemsCustom : [
        [0, 1],
        [450, 1],
        [600, 1],
        [700, 1],
        [1000, 2],
        [1200, 2],
        [1400, 2],
        [1600,2]
      ]
	  });
	 
	  // Custom Navigation Events
	  $(".next").click(function(){
		owl.trigger('owl.next');
	  })
	  $(".prev").click(function(){
		owl.trigger('owl.prev');
	  })
	  $(".play").click(function(){
		owl.trigger('owl.play',4500); //owl.play event accept autoPlay speed as second parameter
	  })
	  $(".stop").click(function(){
		owl.trigger('owl.stop');
	  })
	 
});
