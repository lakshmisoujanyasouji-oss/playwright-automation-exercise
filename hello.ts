// // //example for String Data type//

// // let message:string="welcome to my typescript world";
// // console.log(message);

// // //example for Number Data type//

// // const BirthYear:number=1993;
// // console.log(BirthYear);

// // //example for Boolean Data type//

// // let istestcaseworked:boolean=true;
// // console.log(istestcaseworked);

// // //Above are premitive datatypes//

// //  //from here Non primitive datatypes//

// // //example for Array Data type//

// // let typesoftesttools:string[]=['selenium,protractor,playwright'];
// // console.log(typesoftesttools);
// // console.log(typesoftesttools.length);

// // let tools = typesoftesttools[0]!.split(",");
// // console.log(tools);
// // console.log();


// // let typesoftesttools2:string[]=["selenium","protractor","playwright"];
// // console.log(typesoftesttools2);
// // let tools2=typesoftesttools2[1]!.split(",");
// // console.log(tools2);


// // console.log(typeof test);

// // function test() {
// //   return "Playwright";
// // }

// // console.log(typeof x);
// // var x = 10;


// //here we are building a online app, app consist of few dynamic and static variables.

// const productName: string = "AAvasa";
// console.log("Please give me the product name as", productName)
// let price: number = 4000;
// console.log("Price of the product",price);
// let discount: number = 50;
// console.log("now the discount sale is happening discount of the product is on", discount +"%");

// let productDetails:{product:string,price:number,discount:number} = {
//   product:"dyson",
//   price:12000,
//   discount:20
// }
// console.log("First product ",productDetails);

// productDetails = {
//   product:"swaroski",
//   price:120800,
//   discount:50
// }
// console.log("second Product ",productDetails);


// //Try to print the user name and age of a person here User name is a constant and Age will change.

// const username: string = "SoujanyaSS";
// let age: number = 30;
// console.log("username of the person is " +username ,"and", "age of the person is " +age )
 



// class Person
// {
//   name: string;
//   age: number;

//   constructor (name:string,age:number)
//   {
//     this.name=name;
//     this.age=age;
//   }

//   greet()
//   {
//     console.log("hello" +this.name);
//   }
// }
// const p1 = new Person("souji", 52);
// p1.greet();


// class dalRecipe{
//   ingredients: string;
//   spice: string;
//   cookingTime: number;

//   constructor(ingredients: string, spice: string, cookingTime: number){
//     this.ingredients = ingredients;
//     this.spice = spice;
//     this.cookingTime = cookingTime;
//   }
//   cook(){
//     console.log("todays cooking main ingredient is  " +this.ingredients, "dal");
//   }
// }
//    const mondaydal = new dalRecipe("tomato","cumin",30);
//    const tuesdaydal = new dalRecipe("spinach","cumin",70);


   //inheritance 


  //  class Company
  //  {
  //   getSalary() : number
  //   {
  //   console.log("My company has good salaries");
  //   return 70000;
  //   }
  //  }
  //  class Tester extends Company
  //  {
  //     work() : void
  //     {
  //       console.log("Same way We have the same workload");
  //     }
  //   }
  //  const e = new Tester();
  //  e.getSalary();
  //  e.work();
  



  
const sentence = "I love my amma amma is the best amma in the world";


const words = sentence.toLowerCase().split(" ");
// Result: ["i", "love", "my", "amma", "amma", "is", "the", "best", "amma", "in", "the", "world"]

// Step 2: Create an object to store word counts
const wordCount: { [key: string]: number } = {};

// Step 3: Count each word using forEach
words.forEach((word) => {
  if (wordCount[word]) {
    // Word already exists, increase count
    wordCount[word] = wordCount[word] + 1;
  } else {
    // Word seen for first time, set count to 1
    wordCount[word] = 1;
  }
});

// Step 4: Display the results
console.log("Word counts:");
console.log(wordCount);

// Step 5: Show only repeated words (count > 1)
console.log("\nRepeated words:");
Object.keys(wordCount).forEach((word) => {
  if (wordCount[word] > 1) {
    console.log(`"${word}" appears ${wordCount[word]} times`);
  }
});

