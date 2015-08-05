app = {
	init : function () {
		/* Attach Listeners */
		$('#rangeForm').submit(function(e) {
			e.preventDefault();
			/* quick error checking (also, this has to be == and not === otherwise it won't work */
			var low_val = parseFloat($('#low_range').val().trim());
			var high_val = parseFloat($('#high_range').val().trim());
			if (
				($('#low_range').val().trim() == low_val) && 
				($('#high_range').val().trim() == high_val)
			   ) {
			   	/* Make sure they didn't transpose their high and low values */
				low = Math.max(Math.min(low_val,high_val),2);
				high = Math.max(low_val,high_val);

				/* overwrite their values in case they transposed */	
				$('#low_range').val(low);
				$('#high_range').val(high);

				app.outputPrimes(app.generatePrimes(low,high));
			} else {
				alert("It seemss you've had an error inputting a number. Please check your values. "+low+','+high);
			}
		});

		$('#rangeForm').submit();
	},
	generatePrimes : function(low_range,high_range) {
		/* Rewriting to seive it out, this performs better in large numbers that I've tested */
		var possibleNums = [], primes = [];
		cap = Math.sqrt(high_range);

		/* Create the initial array */
		for (i=0;i<high_range;i++) {
			possibleNums.push(true); /* Temporarily set all values to true (they're possible primes) */
		}

		for (i=2;i<=cap;i++) { /* Now to remove multiples of all the loop */
			if (possibleNums[i]) { /* If this item exists, then do the loop for multiples of it. */
				for (ii = i*i; ii < high_range; ii+=i) { /* starting with the first multiple of the number we're checking, then jump up each time by the multiple value */
					possibleNums[ii] = false; /* this isn't a prime number */
				}
			}
		}

		for (i=2; i<high_range; i++) { /* Loop for output */
			if (possibleNums[i]) { /* if this is still true, it's prime */
				primes.push(i);
			}
		}

		primes = primes.filter(function(num) {
    		return num >= low_range && num <= high_range;
		});

		return primes;
	},

	outputPrimes : function (primes) {
		$('#output').html('<span class="primes">'+primes.join(', ')+'</span><div id="summary">'+primes.length+' prime numbers found</div>')
	}
}

$(document).ready(function() {
	app.init();
});