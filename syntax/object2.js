// array, object

function f(){
    console.log(1+1);
    console.log(1+2);
}

// error occurs since conditional statement or while loop cannot be regarded as values 
// var i = if(true){console.log(1)};
// var w = while(true){console.log(1)};

// 하지만!! function can be regarded as a value
// 함수는 데이터이기 때문에 배열과 객체에 담을 수 있다.
var a = [f];
a[0]();

var o = {
    func:f
}
o.func();