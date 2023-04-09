import { Gallons, MPG, NewCar } from "@classlibrary/core-ts";
const gas = 10 as Gallons;
const milesToTheGallon = 15 as MPG;
const car = new NewCar(gas, milesToTheGallon);

car.start();
car.drive(15);
car.drive(35);
car.drive(20);
car.drive(30);
car.drive(35);
car.drive(15); //out of gas!

car.start();
car.start();
const fillup = 5 as Gallons;
console.log(`Filling ${fillup} gallons`);
car.fill(fillup);
car.start();
car.drive(15);
car.drive(30);
car.drive(10);
console.log("Home!");
