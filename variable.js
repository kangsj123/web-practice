// 1. Use strict
// whole-script strict mode syntax
// JavaScript is very flexible
// flexible === dangerous
// added ECMAScript 5
'use strict';
console.log(age);
console.log('Hello World!');

// 2. Variable -> 오직 let!!(mutable)
// let (added in ES6)
let globalName = 'global name';
// global은 시작부터 끝까지 항상 할당되어 있으므로 최소한으로 사용하는 것이 좋다.
{
    let name = "sujin";
    console.log(name);
    name = "hello";
    console.log(name);
    console.log(globalName);
}
console.log(globalName);

// var (don't ever use this!)
// var hoisting (move declaration from bottom to top)
// 선언하지 않아도 출력이 가능 -> undefined로 표기됨
// has no block scope -> {}안에서 선언해도 밖에서 사용 가능
console.log(age);
age = 4;
console.log(age);
var age;

// 3. Constant
// 선언하고 값을 할당함과 동시에 값을 바꾸지 못한다. (immutable)
// favor immutable data type always for a few reasons;
// - security
// - thread safety
// - reduce human mistakes
const daysInweek = 7;
const maxNumber = 5;

//Note!
//Immutable data types: primitive types, frozen objects(i.e. object.freeze())
//Mutable data types: all objects by default are mutable in JS
//favor immutable data type always for a few reasons:
// - security
// - thread safety
// - reduce human mistakes

// 4. Variable types
// primitive type ->  single item: number, string, boolean, null, undefined, symbol
// object type -> box container(single을 여러 개 묶어서)
// function, first-class function
// 숫자는 number만 쓰면 되는데 javascript에서는 선언하지 않아도 자동으로 타입이 결정된다.
const count = 17;// integer
const size = 17.1;// decimal number
console.log(`value: ${count}, type: ${typeof count}`);
console.log(`value: ${size}, type: ${typeof size}`);

// number - special numeric values: infinity, -infinity, NaN
const infinity = 1/0;
const negativeInfinity = -1/0;
const nAn = 'not a number'/2;
console.log(infinity);
console.log(negativeInfinity);
console.log(nAn);

//bigInt(fairly new, don't use it yet)
const bigInt = 123458394828239182982352938428382n; 
console.log(`value: ${bigInt}, type: ${typeof bigInt}`);

//string(한글자, 여러글자 모두 string으로)
const char = 'c';
const brendan = 'brendan';
const greeting = 'hello ' + brendan;
console.log(`value: ${greeting}, type: ${greeting}`);
const helloBob = `hi ${brendan}!`;// template literals(string)
console.log(`value: ${helloBob}, type: ${typeof helloBob}`);
console.log('value: ' + helloBob + ' type: ' + typeof helloBob);

// boolean
// false: 0, null, undefined, NaN, ''
// true: any other value
const canRead = true;
const test = 3 < 1; // false
console.log(`value: ${canRead}, type: ${typeof canRead}`);
console.log(`value: ${test}, type: ${typeof test}`);

// null
let nothing = null;
console.log(`value: ${nothing}, type: ${typeof nothing}`);

// undefined
let x = undefined;

// symbol, create unique identifiers for objects
// 주어지는 string 상관없이 유일한 식별자
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 == symbol2);//false
//주어진 string에 맞는 symbol을 만들어달라는 뜻으로 동일한 것이 만들어짐
const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 === gSymbol2); // true
console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`);

// object, real-life object, data structure
const sujin = {name: 'sujin', age: 24};// sujin안의 name, age는 접근 가능
sujin.age = 23;// sujin에 다른 object를 할당하지는 못하지만 

// 5. Dynamic typing: dynamically typed language
let text = 'hello';
console.log(text.charAt(0)); //h
console.log(`value: ${text}, type: ${typeof text}`);
text = 1;
console.log(`value: ${text}, type: ${typeof text}`);
text = '7' + 5;
console.log(`value: ${text}, type: ${typeof text}`);
text = '8'/'2';
console.log(`value: ${text}, type: ${typeof text}`);
// error: console.log(text.charAt(0)); //error가 런타임으로 발생
// -> 그래서 type script가 등장