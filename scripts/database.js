const sql = require("mssql");

const connect = async () => {
  try {
    await sql.connect(
      "Server=localhost,1433;Database=IA2;User Id=sa;Password=AO7gupRfmN;Encrypt=false"
    );
  } catch (err) {
    console.log(err);
  }
};

const initilizeDatabase = async () => {
  try {
    await connect();
    const result = await sql.query(
      "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users'"
    );
    if (result.recordset.length > 0) {
      return;
    }
    await sql.query(
      "CREATE TABLE [users] (id INT NOT NULL IDENTITY(1,1) PRIMARY KEY, userlevel INT NOT NULL ,username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)"
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  initilizeDatabase: initilizeDatabase,
};
