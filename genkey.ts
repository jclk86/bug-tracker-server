// Generate JWT_KEY here and place into .env. This will be used to sign our json web tokens
const key = [...Array(30)].map(() => ((Math.random() * 36) | 0).toString(36)).join('');

console.log(key);
