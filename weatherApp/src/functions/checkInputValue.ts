const STRING_NUMBER_REGEXP = /^[a-zA-Z]*$/;

const hasNumbers = (value: string) => {

  return !STRING_NUMBER_REGEXP.test(value);
};
export default hasNumbers

