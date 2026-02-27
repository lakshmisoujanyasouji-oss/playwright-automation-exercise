//example for String Data type//

let message:string="welcome to my typescript world";
console.log(message);

//example for Number Data type//

const BirthYear:number=1993;
console.log(BirthYear);

//example for Boolean Data type//

let istestcaseworked:boolean=true;
console.log(istestcaseworked);

//Above are premitive datatypes//

 //from here Non primitive datatypes//

//example for Array Data type//

let typesoftesttools:string[]=['selenium,protractor,playwright'];
console.log(typesoftesttools);
console.log(typesoftesttools.length);

let tools = typesoftesttools[0]!.split(",");
console.log(tools);
console.log();


let typesoftesttools2:string[]=["selenium","protractor","playwright"];
console.log(typesoftesttools2);
let tools2=typesoftesttools2[1]!.split(",");
console.log(tools2);


console.log(typeof test);

function test() {
  return "Playwright";
}

console.log(typeof x);
var x = 10;