const onlyNumbers = str => /^\d+$/.test(str);

const onlyLetters = str => /^[a-zA-Z]+$/.test(str);

module.exports = { onlyNumbers, onlyLetters };
