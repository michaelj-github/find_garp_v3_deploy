const DB_URI = "postgresql:///findgarp_v3";

const BCRYPT_WORK_FACTOR = 12;
const SECRET_KEY = process.env.SECRET_KEY || "secret";

module.exports = { DB_URI, BCRYPT_WORK_FACTOR, SECRET_KEY };
