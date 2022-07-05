/*========================================== MASTER JAVASCRIPT ===================================================================

	Project     :	CHARITY TEMPLATE
	Version     :	1.0
	Last Change : 	25/04/2018 
	Primary Use :   CHARITY TEMPLATE

=================================================================================================================================*/
$(document).on('ready', function() {
    "use strict"; //Start of Use Strict

    //AFTER SCROLL MENU CREATED,MENU BGCOLOR AND TEXT COLOR 
    //MENU SCROLL
    /*travel*/
    var top_menu = $('#top-nav');
    if (top_menu.length) {
        var x = top_menu.offset().top;
        if (x > 50) {
            top_menu.fadeIn();
        } else {
            top_menu.fadeOut();
        }
        $(document).on('scroll', function() {
            var y = $(this).scrollTop();
            if (y > 50) {
                top_menu.fadeIn();
            } else {
                top_menu.fadeOut();
            }
        });
    }
	
    //MENU BAR SMOOTH SCROLLING FUNCTION
    /*travel MENU SMOOTH SCROLL*/
    var menu_list = $('.menu-ul');
    if (menu_list.length) {
        menu_list.on("click", ".pagescroll", function(event) {
            event.stopPropagation();
            event.preventDefault();
            var hash_tag = $(this).attr('href');
            if ($(hash_tag).length) {
                $('html, body').animate({
                    scrollTop: $(hash_tag).offset().top - 50
                }, 2000);
            }
            return false;
        });
    }
   
  
    //RESPONSIVE MENU SHOW AND HIDE FUNCTION
    var collapse = $('.navbar-collapse');
    var menu = $('.navbar-default li a')
    if (menu.length) {
        menu.on("click", function(event) {
            collapse.slideToggle();
        });
    }
    $('.navbar-default .navbar-toggle').on("click", function(e) {
        collapse.slideToggle();
    });

    // YOUTUBE BACKGROUND VIDEO FUNCTION	  
    var player = $('.player');
    if (player.length) {
        player.mb_YTPlayer();
    }
    //Datepicker//
    var datepicker = $('.datepicker');
    if (datepicker.length) {
        $(".datepicker").datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            todayHighlight: true
        }).datepicker();
    }
    //COUNTER
    var counter = $('.count');
    if (counter.length) {
        counter.counterUp({
            delay: 10,
            time: 1000
        });
    }
    //GALLERY POPUP
    var gallery = $('.popup-gallery');
    if (gallery.length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                }
            }
        });
    }
    //CONTACT FORM VALIDATION	
    if ($('.form1-common').length) {
        $('.form1-common').each(function() {
            $(this).validate({
                errorClass: 'error',
                submitHandler: function(form) {
                    $.ajax({
                        type: "POST",
                        url: "mail/mail.php",
                        data: $(form).serialize(),
                        success: function(data) {
                            if (data) {
                                $(form).find('.sucessMessage').html('Mail Sent Successfully !');
                                $(form).find('.sucessMessage').show();
                                $(form).find('.sucessMessage').delay(3000).fadeOut();
                            } else {
                                $(form).find('.failMessage').html(data);
                                $(form).find('.failMessage').show();
                                $(form).find('.failMessage').delay(3000).fadeOut();
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            $(form).find('.failMessage').html(textStatus);
                            $(form).find('.failMessage').show();
                            $(form).find('.failMessage').delay(3000).fadeOut();
                        }
                    });
                }
            });
        });
    }
    //ACCORDION
    var accordion = $(".accordion-row");
    if (accordion.length) {
        accordion.each(function() {
            var all_panels = $(this).find('.accordion-ans').hide();
            var all_titles = $(this).find('.accordion-title');
            $(this).find('.accordion-ans.active').slideDown();

            all_titles.on("click", function() {
                var acc_title = $(this);
                var acc_inner = acc_title.next();

                if (!acc_inner.hasClass('active')) {
                    all_panels.removeClass('active').slideUp();
                    acc_inner.addClass('active').slideDown();
                    all_titles.removeClass('active');
                    acc_title.addClass('active');
                } else {
                    all_panels.removeClass('active').slideUp();
                    all_titles.removeClass('active');
                }
            });
        }); 
        $(".resort-accordion .col-md-6 .accordion-main:first-child .accordion-ans").css("display", "block");
    }
	
	
	//POPUP FORM
		 $(document).ready(function () {

			$('#fadeandscale').popup({
				pagecontainer: '.container',
				transition: 'all 0.3s'
			});

		});

		//Get URL parameter
		var getUrlParameter = function getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(window.location.search.substring(1)),
				sURLVariables = sPageURL.split('&'),
				sParameterName,
				i;
			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');

				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
				}
			}
		};
		
		//POPUP MSG BOX
		var cancel = getUrlParameter('cancel');
		var success = getUrlParameter('success');	
		if (cancel=='true') {
			$('#fade').fadeIn();
			$('#cancel_btn').fadeIn();	
		}
		else if (success=='true') {
			$('#fade').fadeIn();
			$('#success_btn').fadeIn();	
		}
		$('.close').on('click', function() {		
			$('#fade').fadeOut();
			$('#cancel_btn').fadeOut();
			$('#success_btn').fadeOut();
		});
		
		$('#donate-btn').on('click', function() {	
			
			var amt = $('#amounts').val();
			if(amt == ""){
				$('#amounts').prop('required',true);
			}else{
				return true;
			}			
		});
		
		
		
	
		//SELECT BOX VALUE POPULATE IN TEXT BOX
		var selected_val = $("select[name=amount] option:selected").val();	
		if(selected_val != 0){
			$("#amounts").val(selected_val);
		}
		else{				
			$("#amounts").val('').attr('placeholder', 'Amount'); 
		}		
		$('#price-1').on('change', function() {
			var select_optn = $(this).val();	
			  if(select_optn != 0){
					$("#amounts").val(select_optn);				
			  }else{
				$("#amounts").val('').attr('placeholder', 'Amount');
				$("#amounts").attr('placeholder', 'Amount');
			  }
		})
		
	//SELECT BOX DISABLED AND ENABLED
		$('#amounts').on('input', function() { 
			var key_input = $(this).val();
			if(key_input=='') {
				$('#price-1').prop('disabled',false);			
			}			
			else {
				$('#price-1').prop('disabled',true );			
			}
		});	
		
		
		
		//AMOUNT VALIDATION
		$("#amounts").on('keydown',function (e) {
			// Allow: backspace, delete, tab, escape, enter and .
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				 // Allow: Ctrl+A, Command+A
				(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
				 // Allow: home, end, left, right, down, up
				(e.keyCode >= 35 && e.keyCode <= 40)) {
					 // let it happen, don't do anything
					 return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		});
		
			// validate signup form on keyup and submit
		$("#popup-form").validate({
		});
	
	
    return false;
    // End of use strict
});