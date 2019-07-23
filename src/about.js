import './scss/about.scss';



 // webpack was missing building the two videos for dist file
 // including those here:
import action_thumb_main from './vid/action_thumb.webm';
import action_thumb_fallback from './vid/action_thumb.mp4';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;


/**
 * JavaScript code for the about page goes here
 * 
 * 
 **/


// IIFE - Immediately Invoked Function Expression
// namespaced (globally)
(function(aboutCode, $, undefined ) {

	// The $ is now locally scoped
	$(function() {
        console.log("ready");
        initEvents();
    });

    var initEvents = function(){
        $('.icon a').on('click', function( e ){
            e.preventDefault();
            var icon = $(this);
            handleIconClickEvent( icon );
        });
        $(".anchor").on('click', function() {
            var anchor = $(this).attr('href');
            if ( anchor ) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(anchor).offset().top
                }, 500);
            }
        });

        window.addEventListener("scroll", throttle(scrollNav, 100));

    };

    var handleIconClickEvent = function( icon ){
        // get race identifier
        var raceClass = icon.find('.sprite').attr('class').split(' ')[1];
        if( raceClass ) {
            var raceDOM = $('#race-' + raceClass );
            if ( raceDOM.length > 0 ) {
                var allRaces = $(' #races-individual > div ');
                allRaces.removeClass('active');
                raceDOM.addClass('active');
            }
        }
    };

    var getPosition = function(el) {

        var x = 0,
            y = 0;

        while (el != null && (el.tagName || '').toLowerCase() != 'html') {
            x += el.offsetLeft || 0; 
            y += el.offsetTop || 0;
            el = el.parentElement;
        }

        return { x: parseInt(x, 10), y: parseInt(y, 10) };
    };

    var throttle = function (callback, limit) {
        var tick = false;
        return function () {
            if (!tick) {
            callback.call();
            tick = true;
            setTimeout(function () {
                tick = false;
            }, limit);
            }
        }
    };

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    var scrollNav = function() {
        // Get the navbar
       var navbar = document.getElementById("primary-nav");
       var wrapper = document.getElementById("wrapper");
       //var sticky = navbar.offsetTop;
       var sticky = getPosition(navbar);
       console.log(sticky.y);
       if (window.pageYOffset >= sticky.y) {
           // console.log('sticky added');
           wrapper.classList.add("sticky");
       } else {
           // console.log('sticky removed');
           wrapper.classList.remove("sticky");
       }
   };

}( window.aboutCode = window.aboutCode || {}, jQuery ) );

