export default class DateUtils {
  static isFloatNumber = (value) => {
    const pattern = /^[1-9]\d{0,10}(\.\d{0,2}){0,1}$/;
    return pattern.test(value);
  }
}
