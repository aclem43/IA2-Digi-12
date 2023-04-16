const sql = require("mssql");

const connect = async () => {
  try {
    await sql.connect(
      "Server=localhost,1433;Database=IA2;User Id=sa;Password=AO7gupRfmN;Encrypt=false"
    );
    console.log("Connected to database");
  } catch (err) {
    console.log("Failed to connect to database");
    console.error(err);
  }
};

const initilizeDatabase = async () => {
  try {
    await connect();
    await initilizeLocationTable();
    await initilizeUserTable();
  } catch (err) {
    console.log(err);
  }
};

const initilizeLocationTable = async () => {
  // ID, Location/Name, Surburb, Street (Nullable),Lat,Long, original_table
  try {
    const result = await sql.query(
      "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'locations'"
    );
    if (result.recordset.length > 0) {
      console.log("Location Table already exists");
      return;
    }
    await sql.query(
      `CREATE TABLE [locations] (id INT NOT NULL IDENTITY(1,1)
      PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      surburb VARCHAR(255) NOT NULL,
      street VARCHAR(255),
      lat FLOAT NOT NULL,
      long FLOAT NOT NULL,
      original_table VARCHAR(255) NOT NULL)`
    );
    console.log("Location Table created");
  } catch (err) {
    console.log(err);
  }
};

const initilizeUserTable = async () => {
  try {
    const result = await sql.query(
      "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users'"
    );
    if (result.recordset.length > 0) {
      console.log("User Table already exists");
      return;
    }
    await sql.query(
      "CREATE TABLE [users] (id INT NOT NULL IDENTITY(1,1) PRIMARY KEY, userlevel INT NOT NULL ,username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)"
    );
    console.log("User Table created");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  initilizeDatabase: initilizeDatabase,
  sql: sql,
};
