const { Client } = require("pg");

const getMerchants = () => {
  const client = new Client({
    connectionString:
      "postgres://looeteeoaatpss:5d4136a37a27dd584f7415af9df350d62275334f2faf848f0d210cfa4e6155d4@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dfdg6d5qgmud00",
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();

  let rows = [];
  client.query("SELECT * FROM employers;", (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      rows.push(JSON.stringify(row));
      console.log(JSON.stringify(row));
    }
    client.end();
  });
  return "TOPS45";
};

const getMerchants1 = () => {
  return new Promise(function (resolve, reject) {
    const client = new Client({
      connectionString:
        "postgres://looeteeoaatpss:5d4136a37a27dd584f7415af9df350d62275334f2faf848f0d210cfa4e6155d4@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dfdg6d5qgmud00",
      ssl: {
        rejectUnauthorized: false,
      },
    });

    client.connect();

    let rows = [];
    client.query("SELECT * FROM employers;", (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.rows);
      client.end();
    });
  });
};

module.exports = {
  getMerchants,
  getMerchants1,
};
