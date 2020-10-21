const hasNumber = str => /\d/.test(str);

const onlyLetters = str => /^[a-zA-Z]+$/.test(str);

module.exports = { hasNumber, hasLette };
