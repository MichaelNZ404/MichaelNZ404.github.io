$(".port-item-desc").hide();
$("#port-item-desc-0").show();

$(document).ready(function(){

	// This function runs before the slide transition starts
    var switchIndicator = function ($c, $n, currIndex, nextIndex) {
      // kills the timeline by setting it's width to zero
      $timeIndicator.stop().css('width', 0);
      // Highlights the next slide pagination control
      $indicators.removeClass('current').eq(nextIndex).addClass('current');
      changeporttext(nextIndex);
    };

    // This function runs after the slide transition finishes
    var startTimeIndicator = function () {
      // start the timeline animation
      //$timeIndicator.animate({width: '100%'}, slideInterval);
    };

    var $box = $('#box')
      , $indicators = $('.goto-slide')
      , $effects = $('.effect')
      , $timeIndicator = $('#time-indicator')
      , slideInterval = 25000
      , defaultOptions = {
            responsive: false
          , speed: 1200
          , autoScroll: false
          , timeout: slideInterval
          , next: '#next'
          , prev: '#prev'
          , pause: '#pause'
          , onbefore: switchIndicator
          , onafter: startTimeIndicator
          , effect: 'scrollHorz3d'
        }

      , effectOptions = {
          'blindLeft': {blindCount: 15}
        , 'blindDown': {blindCount: 15}
        , 'tile3d': {tileRows: 6, rowOffset: 80}
        , 'tile': {tileRows: 6, rowOffset: 80}
      };

    // initialize the plugin with the desired settings

    $box.boxSlider(defaultOptions);
    // start the time line for the first slide
    startTimeIndicator();

    // Paginate the slides using the indicator controls
    $('#controls').on('click', '.goto-slide', function (ev) {
      $box.boxSlider('showSlide', $(this).data('slideindex'));
      ev.preventDefault();
    });

    // This is for demo purposes only, kills the plugin and resets it with
    // the newly selected effect

    $('#effect-list').on('click', '.effect', function (ev) {
      var $effect = $(this)
        , fx = $effect.data('fx')
        , extraOptions = effectOptions[fx];
      $effects.removeClass('current');
      $effect.addClass('current');
      switchIndicator(null, null, 0, 0);
      $box
        .boxSlider('destroy')
        .boxSlider($.extend({effect: fx}, defaultOptions, extraOptions));
      startTimeIndicator();
      ev.preventDefault();
    });

    function changeporttext(nextIndex){
    	var id;
    	switch(nextIndex){
    		case 0: id = "#port-item-desc-0"; break;
    		case 1: id = "#port-item-desc-1"; break;
    		case 2: id = "#port-item-desc-2"; break;
    		case 3: id = "#port-item-desc-3"; break;
    		case 4: id = "#port-item-desc-4"; break;
    	}
    	$(".port-item-desc").hide();
    	$(id).show();
    }
});

$.ajax({
  url: 'http://blog.michaelcoleman.nz/?json=get_recent_posts&count=1',
  success: function ( data ) {
    var post = data.posts.shift(); // The data is an array of posts. Grab the first one.
    $('#blog-title').html(post.title);
    $('#blog-excerpt').html(post.excerpt);
    $('#blog-date').html(post.date);
  },
});
