//const fs = require("fs");
import fs from "fs";
import os from "os";

console.log("CPUs:", os.cpus().length);


// async ... non-blocking req
fs.writeFile("./dummy.txt", "Krishnaggg 681254795220", (err) => {
  console.log(err);
});

console.log("1");

// sync ... blocking req
fs.writeFileSync("./dummy.txt", "Krishnag");

console.log("2");

const res = fs.readFileSync("dummy.txt", "utf-8");
console.log("Result: \n", res);

console.log("3");
