const { Client } = require("pg");

const client = new Client({
  connectionString:
    "postgres://tborpgfisiwxgq:96a7df14564337e9cf751c7c865b20afbc92f8cdf672925807623239f32f29e1@ec2-54-228-218-84.eu-west-1.compute.amazonaws.com:5432/da92in69fg7ad",
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

const getEmployer = () => {
  return new Promise(function (resolve, reject) {
    client.query("SELECT * FROM employers;", (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.rows);
    });
  });
};

const addEmployer = (body) => {
  return new Promise(function (resolve, reject) {
    const { FirstNameSecondName, Department, PostJob, Telephone } = body;
    console.log(
      "INSERT INTO employers (firstnamesecondname, department, postjob, telephone) VALUES($FirstNameSecondName, Department, $PostJob, $Telephone);",
      [FirstNameSecondName, Department, PostJob, Telephone]
    );

    client.query(
      "INSERT INTO employers (firstnamesecondname, department, postjob, telephone) VALUES($1,$2,$3,$4);",
      [FirstNameSecondName, Department, PostJob, Telephone],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new employers has been added: ${results.rows}`);
      }
    );
  });
};

module.exports = {
  getEmployer,
  addEmployer,
};
