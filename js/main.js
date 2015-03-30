

function renderSmartInput(object) {
	
	var mask;
	var regex;
	var maskRule = [];

	$('input').val('');
	$('input').unbind('keypress');
	
	mask = object.mask;
	regex = object.regex;

	for (item in mask) {
		if(mask.charAt(item) === 'A') {
			maskRule[item] = 'letter';
		} else if (mask.charAt(item) === '9'){
			maskRule[item] = 'number';
		} else {
			maskRule[item] = 'symbol';
		}
	}

	$('input').bind('change paste keyup', function(){
		setTimeout(function(){

			if (mask.length == $('input').val().length) {
				if (regex.test($('input').val())) {
					$('.form-ok').css('display', 'inline')
				}else {
					$('.form-wrong').css('display', 'inline')
				}
			}else {
				$('.form-ok').css('display', 'none');
				$('.form-wrong').css('display', 'none');
			}
		}, 100)
		
	});


	$('input').keypress(function(event){
		var inputValue = $(this).val()
		var key = event.which;

		if($('input').val().length < mask.length) {


			if(maskRule[$('input').val().length] == 'letter') {
					console.log('ae letter')
				if(key > 96 && key < 128 || key > 64 && key < 91 ) {
					return 1;
				}else {
					console.log('noa letter')
					event.preventDefault();
				}
			} else if (maskRule[$('input').val().length] == 'number') {
				if(key < 48 || key > 57) {
					console.log('noa num')
					console.log(key)
					event.preventDefault();
				}
			} else if (maskRule[$('input').val().length] == 'symbol') {

				String.prototype.splice = function(index, rem, string){
					return (this.slice(0, index) + string + this.slice(index + Math.abs(rem)));
				}

				if(maskRule[$('input').val().length + 1] == 'letter') {

					if(key > 96 && key < 128 || key > 64 && key < 91 ) {
						
						var newValue = inputValue.splice($('input').val().length, 0, mask.charAt($('input').val().length));
						$('input').val(newValue);

					}else {
						event.preventDefault();
					}

				} else if (maskRule[$('input').val().length + 1] == 'number') {

					if(key < 48 || key > 57) {
						event.preventDefault();
					} else {
						var newValue = inputValue.splice($('input').val().length, 0, mask.charAt($('input').val().length));	
						$('input').val(newValue);
					}
				
				} else if(maskRule[$('input').val().length + 1] == 'symbol') {
					event.preventDefault();
					var newValue = inputValue.concat(mask.charAt($('input').val().length+1));
					$('input').val(newValue);

				}

			}

			if(mask.length - $('input').val().length == 2 && maskRule[maskRule.length-1] == 'symbol') {

				if(maskRule[$('input').val().length] == 'letter') {

					if(key > 96 && key < 128 || key > 64 && key < 91 ) {

						$('input').keyup(function(event){
							var newValue = $('input').val().concat(mask.charAt(mask.length-1));
							console.log(mask.charAt(mask.length-1))
							$('input').val(newValue);
							$('input').unbind('keyup');
						});

					}else {
						event.preventDefault();
					}
				}else if (maskRule[$('input').val().length] == 'number') {
					if(key < 48 || key > 57) {
						event.preventDefault();
					}else {

						$('input').keyup(function(event){
							
							var newValue = $('input').val().concat(mask.charAt(mask.length-1));
							console.log(mask.charAt(mask.length-1))
							$('input').val(newValue);
							$('input').unbind('keyup');

						});
					}

				}

			}

		}else {
			event.preventDefault();
		}
	});


}


renderSmartInput({"mask": "9999 9999 9999 9999", "regex": /(?:[\d]{4}\s){3}[\d]{4}/})