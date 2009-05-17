function RadioRater(container, settings) {
	/*
	* OL or UL containing the radio buttons
	*/ 
	this.container = container;
	/*
	* elements are stacked, starting at this z-index and counting DOWN
	*/
	this.zIndexStart = 30;
	/*
	* width in pixels of image representing trigger (star.gif, thumb.png whatever..)
	*/
	this.imageWidth = settings.imageWidth ? settings.imageWidth : 16;

	// find radios for rating and (optionally radios for unrating/resetting)
	this.ratingRadios = $("input:radio[value!=]", container);
	this.unRateRadio  = $("input:radio[value=]", container);
	
	this.numberOfRatingOptions 	= this.ratingRadios.length;
	this.ratingOptionWidthPerc 	= 100 / this.numberOfRatingOptions; // gets the width for each option as percentage %

	this.ratingAnchor  = $('<a href="#">rater</a>');
	this.unRateAnchor  = $('<a href="#">unrater</a>');
	var currentRatingZindex = (this.zIndexStart-this.numberOfRatingOptions-2);
	this.currentRating = $('<li class="current" style="z-index:' +currentRatingZindex+ '">0 / '+this.numberOfRatingOptions+'</li>');
	
	this.init();
}

RadioRater.prototype = {

	init:function() {
		$(this.container).css("width", this.numberOfRatingOptions * this.imageWidth + "px");
		
		// add the LI with the current rating
		$(this.container).prepend(this.currentRating);
	
		this.ratingAnchor.bind("click", this.rateIt.bind(this));
		this.transformRatingRadios();
	
		if (this.unRateRadio.length > 0) {
			this.unRateAnchor.bind("click", this.unRateIt.bind(this));
			this.transformUnRateTrigger();
		}
	},

	rateIt: function(e) {
		var clickedAnchor = $(e.target);
		var rating        = clickedAnchor.attr("rel");

	 	// get a reference to the corresponding radio button
		var radio = $("input:radio[value='"+rating+"']", this.container);
		radio.click();
		this.visualizeRating(rating);
		// stop event
	 	e.preventDefault();
	},
	
	unRateIt: function(e) {
		this.unRateRadio.click();
		this.visualizeRating(null);
		// stop event
	 	e.preventDefault();
	},

	visualizeRating: function(rating) {
		if (rating && rating > 0) {
			$('a', this.container).css("background-position", "0 100%");
			$('a.rating'+rating, this.container).css("background-position", "0 -"+ this.imageWidth);
			this.currentRating.css("width", (this.ratingOptionWidthPerc * rating) + "%");
			return true;
		}
		// reset the rating if no rating was given
		this.currentRating.siblings().removeClass("active");
		this.currentRating.css("width", "0");
	},	

	transformUnRateTrigger: function() {
		// hide radio button
		this.unRateRadio.hide();
		// make room for this one
		$(this.container).css("margin-left", this.imageWidth + "px");
		this.unRateAnchor.css("width", this.imageWidth + "px");
		this.unRateAnchor.css("left", -this.imageWidth + "px");

		this.unRateAnchor.insertAfter(this.unRateRadio);
	},

	transformRatingRadios: function() {
		var i 			= 1;
		var anchor  = this.ratingAnchor;
		var self    = this;
		var zIndex = this.zIndexStart;
		
		this.ratingRadios.each(function () {
			
			// clone & setup the anchor 
			var clonedAnchor = anchor.clone(true);

			clonedAnchor.css("width", (self.ratingOptionWidthPerc*i) + "%");
			clonedAnchor.css("z-index", zIndex--)
			clonedAnchor.attr("class", "rating"+i);
			clonedAnchor.attr("rel", i);
			clonedAnchor.text(i);
			// and insert it after the radiobutton 
			clonedAnchor.insertAfter($(this));
			
			// if a radio is checked - we'll visualize this
			if (this.checked) self.visualizeRating(this.value);
			
		 	$(this).hide();
			i++;
		});
		
		// don't need labels
		$('label', this.container).remove();
	}
	
}           
 
// extend jquery 
$.extend($.fn, {
	createRadioRaters: function(settings) {
		for(var i=0; i<this.length; i++) {
			new RadioRater(this[i], settings);
		}
		return this;
	}
});

Function.prototype.bind = function(scope) {
	var method = this;
	return function() {
		return method.apply(scope, arguments);
	}
}