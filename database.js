const Pool = require("pg").Pool;
const pool = new Pool({
  user: "looeteeoaatpss",
  host: "ec2-52-48-159-67.eu-west-1.compute.amazonaws.com",
  database: "dfdg6d5qgmud00",
  password: "5d4136a37a27dd584f7415af9df350d62275334f2faf848f0d210cfa4e6155d4",
  port: 5432,
});

const getMerchants = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM public.employers;", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
const createMerchant = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new merchant has been added added: ${results.rows[0]}`);
      }
    );
  });
};
module.exports = {
  getMerchants,
  createMerchant,
};
