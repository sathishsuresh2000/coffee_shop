class Validator {

  isString(val) {
    return !!val && typeof val === "string";
  }

  isNumeric(val) {
    return !!val && typeof val === "number";
  }

  isPositiveNumeric(val) {
    return this.isNumeric(val) && val > 0;
  }
}
module.exports = new Validator();