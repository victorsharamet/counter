// Записываем функцию в переменную

var counter = (function(){

	// Приват переменная

	var _number;


	// Приват метод

	var _isInteger = function(x){
		return ( x ^ 0) === x
	}

	var setValue = function(x){
		if(_isInteger(x)) {
			_number = x;
		} else {
			console.log('Неверное значение')
		}
	}
	
	var increaseCounter = function(){
		_number++;
	}

	var decreaseCounter = function(){
		_number--;
	}

	var printCounter = function(){
		console.log(_number);
	}

	return {
		setValue,
		increaseCounter,
		decreaseCounter,
		printCounter
	}	

}());

counter.setValue(1); // 1
counter.increaseCounter(); // 2
counter.increaseCounter(); // 3
counter.decreaseCounter(); // 2
counter.printCounter(); // 2