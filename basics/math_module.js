function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

 module.exports = { add, sub }; //--- P.sir way
// module.exports = { addFn: add, subFn: sub };

// exports.mul = (a, b) => a * b;

// In Node.js:
// exports is just a reference (shortcut) to module.exports.
// Initially:
// exports === module.exports
// But when you write:
// module.exports = { add, sub };
// You replace the entire object.
// After that:
// exports.mul = ...
// is modifying the old reference, not the exported object.
// So mul will NOT be exported.

