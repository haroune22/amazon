// this is manual testing with different values(automated testing)
import { formatCurrency } from "../scripts/utils/money.js";

// name of group of tests
console.log('test suite: formatCurrency')

// Test case 1(basic)
if (formatCurrency(2095) === "20.95") {
  console.log("test1: it is working ");
} else {
  console.log("it is not working ");
}

// test case 2(edge case)
if (formatCurrency(0) === "0.00") {
  console.log("test2: it is working ");
} else {
  console.log("it is not working ");
}

// test case 3(edge case)
if (formatCurrency(2000.5) === "20.01") {
  console.log("test3: it is working ");
} else {
  console.log("it is not working ");
}
