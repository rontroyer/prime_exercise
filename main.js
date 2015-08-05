app = {
	init : function () {
		/* Attach Listeners */
		$('#rangeForm').submit(function(e) {
			e.preventDefault();
			/* quick error checking (also, this has to be == and not === otherwise it won't work */
			var low = parseFloat($('#low_range').val().trim());
			var high = parseFloat($('#high_range').val().trim());
			if (
				($('#low_range').val().trim() == low) && 
				($('#high_range').val().trim() == high)
			   ) {
				app.generatePrimes(low,high);
			} else {
				alert("It seemss you've had an error inputting a number. Please check your values. "+low+','+high);
			}
		});

		$('#rangeForm').submit();
	},
	generatePrimes : function(low_range,high_range) {
		$('#output').html('');
		/* Make sure they didn't transpose their high and low values */
		var low = Math.min(low_range,high_range); 
		var high = Math.max(low_range,high_range);
		/* Check the range they input */
		var s='';
		var c=0; /* count of prime numbers we've found in the range */
		for (i=low;i<=high;i++) {
			if (app.isPrime(i)) {
				s += i+', ';
				c++;
			} 
		}
		s=s.replace(/, $/,''); /*remove the last comma*/
		s+='<div id="summary">'+c+' prime numbers found</div>';
		$('#output').html(s);
	},
	isPrime : function(num) {
		for (ip=2;ip<=Math.sqrt(num);ip++) { /* Interesting thought was that we only ever need to check up to the square root of the number we're checking */
			if (num % ip == 0) {
				return false;
			}
		}
		return true;
	}
}

$(document).ready(function() {
	app.init();
});