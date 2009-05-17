jQuery plugin for creating youtube style rating components using progressive enhancement
========================================================================================

clone or download and then open example.html in your browser to see how it works. 

Integrating this with AJAX, rails or whatever you want, should be straightforward as this plugin uses nothing but ordinary radio buttons.
Disable javascript and behold: it still works!

Just create an (un)ordered list with radio buttons.

    <form method="post">
	
    	<ol class="radio-rater">
    		<li><input type="radio" name="movie[rating]" value="1" id="mr-1"><label for="mr-1">Utter Crap</label></li>
    		<li><input type="radio" name="movie[rating]" value="2" id="mr-2"><label for="mr-2">Poor</label></li>
    		<li><input type="radio" name="movie[rating]" value="3" id="mr-3"><label for="mr-3">Whatever</label></li>
    		<li><input type="radio" name="movie[rating]" value="4" id="mr-4"><label for="mr-4">Good!</label></li>
    		<li><input type="radio" name="movie[rating]" value="5" id="mr-5"><label for="mr-5">Best Movie Ever</label></li>
    		
    		<li class="unrate"><input type="radio" name="movie[rating]" value="" id="mr-unrate"><label for="mr-unrate">[clear rating]</label></li>
    	</ol>

    	<input type="submit" value="Rate It!" />
    </form>
    
To progressively enchance this OL, include the scripts and call createRadioRaters() function on the OL. You can also use a UL but semantically an OL is a better fit IMHO.

    $().ready(function() {
      $('body').addClass("js");
      $(".radio-rater").createRadioRaters();
    });

The class="js" is added so we can programmatically skip styles for non JS devices.

How to customize?
-----------------
By default, you just need to include one stylesheet: radio-rater-base.css
If you want different images you can override some styles in a seperate css file. 

Be sure to pass the imaeWidth to the createRadioRaters() function

    $(".radio-rater").createRadioRaters({imageWidth: 64});

Having more or less rating options and putting in an "unrate" option is just a matter of adding more radio buttons.
Look at customized.html for an example.

Why another rating widget?
--------------------------

Yes there are lots of rating plugins out there, also for use with jQuery. But at the time most of them were either:

- hard to customize
- obtrusive
- did not work properly with input names with brackets (e.g. move[rating]) 

or just too much code for such a simple thing.

Credits
-------

Joost Faber (joost.faber#lbi.lostboys.nl) for coming up with some cool CSS to make it all work