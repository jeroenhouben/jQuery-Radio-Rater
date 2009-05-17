function RadioRater(container, settings) {
	
	this.container = container;

	// find radios for rating and (optionally radios for unrating/resetting)
	this.ratingRadios = $("input:radio[value!=]", container);
	this.unRateRadio  = $("input:radio[value=]", container);
	
	this.numberOfRatingOptions 	= this.ratingRadios.length;
	this.ratingOptionWidth 			= 100 / this.numberOfRatingOptions; // gets the width for each option as percentage %

	this.ratingAnchor  = $('<a href="#">rater</a>');
	this.unRateAnchor   = $('<a href="#">unrater</a>');
	this.currentRating = $('<li class="current" style="width: 0%;">0 / '+this.numberOfRatingOptions+'</li>');

	// add the LI with the current rating
	$(this.container).prepend(this.currentRating);	
	
	this.ratingAnchor.bind("click", this.rateIt.bind(this));
	
	this.transformRatingRadios();
	
	if (this.unRateRadio.length > 0) {
		this.unRateAnchor.bind("click", this.unRateIt.bind(this));
		this.transformClearTrigger();
	}
	
}

RadioRater.prototype = {

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
			var currentRatingAnchor = $('a.rating'+rating, this.container);

			this.currentRating.siblings().removeClass("active");
			currentRatingAnchor.parent("li").addClass("active");
			this.currentRating.css("width", (this.ratingOptionWidth * rating) + "%");
			return true;
		}
		// reset the rating if no rating was given
		this.currentRating.siblings().removeClass("active");
		this.currentRating.css("width", "0");
	},	

	transformClearTrigger: function() {
		// hide radio button
		this.unRateRadio.hide();
		this.unRateAnchor.insertAfter(this.unRateRadio);
		// add a css class to the container element so we can create space for the unrater Anchor
		$(this.container).addClass("with-unrater");
	},

	transformRatingRadios: function() {
		var i 			= 1;
		var anchor  = this.ratingAnchor;
		var self    = this;
		
		this.ratingRadios.each(function () {
			
			// clone & setup the anchor 
			var clonedAnchor = anchor.clone(true);
			clonedAnchor.attr("class", "rating"+i);
			clonedAnchor.attr("rel", i);
			clonedAnchor.text(i);
			// and insert it after the radiobutton 
			clonedAnchor.insertAfter($(this));
			
			// if a radio is checked - we'll visualize this
			if (this.checked) {
				self.visualizeRating(this.value);
			}
			
		 	$(this).hide();
			i++;
		});
		
		// don't need labels
		$('label', this.container).remove();

	}
	
}           
 
// extend jquery 
$.extend($.fn, {
	createRadioRater: function(settings) {
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