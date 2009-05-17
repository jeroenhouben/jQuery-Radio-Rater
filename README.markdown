jQuery plugin for creating youtube style rating components using progressive enhancement
========================================================================================

clone or download and then open example.html in your browser to see how it works. 

Integrating this with AJAX, rails or whatever you want, should be straightforward as this plugin uses nothing but ordinary radio buttons. Disable javascript and behold: it still works!

Just create an ordered list with radio buttons. Be sure to adjust the css if you use more or less then the standard ratings (5)

    <form method="post">
	
    	<ol class="radio-rater">
    		<li><input type="radio" name="movie-rating" value="1" id="movie-rating-1"><label for="movie-rating-1">Utter Crap</label></li>
    		<li><input type="radio" name="movie-rating" value="2" id="movie-rating-2"><label for="movie-rating-2">Poor</label></li>
    		<li><input type="radio" name="movie-rating" value="3" id="movie-rating-3"><label for="movie-rating-3">Whatever</label></li>
    		<li><input type="radio" name="movie-rating" value="4" id="movie-rating-4"><label for="movie-rating-4">Good!</label></li>
    		<li><input type="radio" name="movie-rating" value="5" id="movie-rating-5"><label for="movie-rating-5">Best Movie Ever</label></li>
    		<li class="clear"><input type="radio" name="movie-rating" value="" id="movie-rating-clear"><label for="movie-rating-clear">[clear]</label></li>
    	</ol>

    	<input type="submit" value="Rate It!" />
    </form>