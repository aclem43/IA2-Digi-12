import mssql from "mssql";

export const sql = mssql;

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

export const initilizeDatabase = async () => {
  try {
    await connect();
    await initilizeLocationTable();
    await initilizeUserTable();
  } catch (err) {
    console.log(err);
  }
};

export const initilizeLocationTable = async () => {
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

export const initilizeUserTable = async () => {
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

export const insertLocation = async (
  name,
  surburb,
  street,
  lat,
  long,
  table
) => {
  try {
    const prepared = new sql.PreparedStatement();
    prepared.input("name", sql.VarChar(255));
    prepared.input("surburb", sql.VarChar(255));
    prepared.input("street", sql.VarChar(255));
    prepared.input("lat", sql.Float);
    prepared.input("long", sql.Float);
    prepared.input("table", sql.VarChar(255));
    await prepared.prepare(
      "INSERT INTO locations (name, surburb, street, lat, long, original_table) VALUES (@name, @surburb, @street, @lat, @long, @table)"
    );
    await prepared.execute({
      name: name,
      surburb: surburb,
      street: street,
      lat: lat,
      long: long,
      table: table,
    });
    prepared.unprepare();
  } catch (err) {
    console.log(err);
  }
};

export const insertUser = async (userlevel, username, password) => {
  try {
    const prepared = new sql.PreparedStatement();
    prepared.input("userlevel", sql.Int);
    prepared.input("username", sql.VarChar(255));
    prepared.input("password", sql.VarChar(255));
    await prepared.prepare(
      "INSERT INTO users (userlevel, username, password) VALUES (@userlevel, @username, @password)"
    );
    await prepared.execute({
      userlevel: userlevel,
      username: username,
      password: password,
    });
    prepared.unprepare();
  } catch (err) {
    console.log(err);
  }
};
