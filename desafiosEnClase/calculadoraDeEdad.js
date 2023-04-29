const moment = require("moment");

const actual = moment();
const nacimiento = moment("1987-09-02");

if(nacimiento.isValid()){
    console.log(actual.diff(nacimiento, "days"))
}

console.log(nacimiento);