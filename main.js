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
				low = Math.max(Math.min(low_val,high_val),1);
				high = Math.max(low_val,high_val);
				
				/* overwrite their values in case they transposed */	
				$('#low_range').val(low);
				$('#high_range').val(high);

				app.generatePrimes(low,high);
			} else {
				alert("It seemss you've had an error inputting a number. Please check your values. "+low+','+high);
			}
		});

		$('#rangeForm').submit();
	},
	generatePrimes : function(low_range,high_range) {
		$('#output').html('');
		/* Check the range they input */
		var s='';
		var c=0; /* count of prime numbers we've found in the range */
		for (i=low_range;i<=high_range;i++) {
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