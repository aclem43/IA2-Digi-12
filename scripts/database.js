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
    await initilizeReportTable();
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
      orignal_id VARCHAR(50),
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

const initilizeReportTable = async () => {
  try {
    const result = await sql.query(
      "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'reports'"
    );
    if (result.recordset.length > 0) {
      console.log("Report Table already exists");
      return;
    }
    await sql.query(
      "CREATE TABLE [reports] (id INT NOT NULL IDENTITY(1,1) PRIMARY KEY, location_id INT NOT NULL, report_date VARCHAR(30) NOT NULL, report_type VARCHAR(15) NOT NULL, report_description VARCHAR(255), complete TINYINT)"
    );
    console.log("Report Table created");
  } catch (err) {
    console.log(err);
  }
};

export const insertReport = async (
  location_id,
  report_date,
  report_type,
  report_description
) => {
  try {
    const prepared = new sql.PreparedStatement();
    prepared.input("location_id", sql.Int);
    prepared.input("report_date", sql.VarChar(30));
    prepared.input("report_type", sql.VarChar(15));
    prepared.input("report_description", sql.VarChar(255));
    prepared.prepare(
      "INSERT INTO reports (location_id, report_date, report_type, report_description) VALUES (@location_id, @report_date, @report_type, @report_description)",
      (err) => {
        if (err) {
          console.error(err);
        } else {
          prepared.execute(
            {
              location_id: location_id,
              report_date: report_date,
              report_type: report_type,
              report_description: report_description,
            },
            (err) => {
              if (err) {
                console.error(err);
              } else {
                prepared.unprepare();
              }
            }
          );
        }
      }
    );
    console.log("Inserted report");
  } catch (err) {
    console.log(err);
  }
};

export const insertLocation = async (
  orignal_id,
  name,
  surburb,
  street,
  lat,
  long,
  table
) => {
  try {
    const prepared = new sql.PreparedStatement();
    prepared.input("orignal_id", sql.VarChar(50));
    prepared.input("name", sql.VarChar(255));
    prepared.input("surburb", sql.VarChar(255));
    prepared.input("street", sql.VarChar(255));
    prepared.input("lat", sql.Float);
    prepared.input("long", sql.Float);
    prepared.input("table", sql.VarChar(255));
    prepared.prepare(
      "INSERT INTO locations (orignal_id,name, surburb, street, lat, long, original_table) VALUES (@orignal_id, @name, @surburb, @street, @lat, @long, @table)",
      (err) => {
        if (err) {
          console.error(err);
        } else {
          prepared.execute(
            {
              orignal_id: orignal_id,
              name: name,
              surburb: surburb,
              street: street,
              lat: lat,
              long: long,
              table: table,
            },
            (err) => {
              if (err) {
                console.error(err);
              } else {
                prepared.unprepare();
              }
            }
          );
        }
      }
    );

    console.log("Inserted location: " + name);
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

export const insertLocationFromPark = async (object) => {
  const object_id = object["PARK_NUMBER"];
  const name = object["PARK_NAME"];
  const surburb = object["SUBURB"];
  const street = object["STREET_ADDRESS"];
  const lat = object["LAT"];
  const long = object["LONG"];
  if (name == null || surburb == null || lat == null || long == null) {
    return;
  } else {
    await insertLocation(object_id, name, surburb, street, lat, long, "park");
  }
};

export const insertLocationFromBoatRamp = async (object) => {
  const object_id = object["ASSET_ID"];
  const name = object["DESCRIPTIO"];
  const surburb = object["SUBURB"];
  const street = object["STREET"];
  const lat = object["LATITUDE"];
  const long = object["LONGITUDE"];
  if (name == null || surburb == null || lat == null || long == null) {
    return;
  } else {
    await insertLocation(
      object_id,
      name,
      surburb,
      street,
      lat,
      long,
      "boat_ramp"
    );
  }
};

export const insertLocationFromWaterSite = async (object) => {
  const object_id = object["BCC Site Code"];
  const name = object[Object.keys(object)[0]];
  const surburb = object["Suburb"];
  const street = object[Object.keys(object)[0]];
  const lat = object["Latitude"];
  const long = object["Longitude"];
  if (name == null || surburb == null || lat == null || long == null) {
    console.log(object);
    return;
  } else {
    await insertLocation(
      object_id,
      name,
      surburb,
      street,
      lat,
      long,
      "water_site"
    );
  }
};

export const getALLReports = async () => {
  try {
    const result = await sql.query("SELECT * FROM reports");
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};

export const getALLReportsWithLocation = async () => {
  const reports = await getALLReports();
  const locations = await getAllLocations();
  const reportsWithLocation = [];
  for (let report of reports) {
    for (let location of locations) {
      if (report.location_id == location.id) {
        const reportWithLocation = {
          ...report,
          location: location,
        };
        reportsWithLocation.push(reportWithLocation);
      }
    }
  }

  return reportsWithLocation;
};

export const getAllLocations = async () => {
  try {
    const result = await sql.query("SELECT * FROM locations");
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};

export const resetLocationTable = async () => {
  await sql.query("DROP TABLE locations");
  await initilizeLocationTable();
};

export const deleteReport = async (id) => {
  try {
    const prepared = new sql.PreparedStatement();
    prepared.input("id", sql.Int);
    await prepared.prepare("DELETE FROM reports WHERE id = @id");
    await prepared.execute({ id: id });
    prepared.unprepare();
  } catch (err) {
    console.log(err);
  }
};

export const updateReport = (id, notes, type) => {
  try {
    const prepared = new sql.PreparedStatement();
    prepared.input("id", sql.Int);
    prepared.input("notes", sql.VarChar(255));
    prepared.input("type", sql.VarChar(255));
    prepared.prepare(
      "UPDATE reports SET report_description = @notes, report_type = @type WHERE id = @id",
      (err) => {
        if (err) {
          console.error(err);
        } else {
          prepared.execute(
            {
              id: id,
              notes: notes,
              type: type,
            },
            (err) => {
              if (err) {
                console.error(err);
              } else {
                prepared.unprepare();
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const updateReportComplete = (id, complete) => {
  try {
    const prepared = new sql.PreparedStatement();
    prepared.input("id", sql.Int);
    prepared.input("complete", sql.Bit);
    prepared.prepare(
      "UPDATE reports SET complete = @complete WHERE id = @id",
      (err) => {
        if (err) {
          console.error(err);
        } else {
          prepared.execute(
            {
              id: id,
              complete: complete,
            },
            (err) => {
              if (err) {
                console.error(err);
              } else {
                prepared.unprepare();
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (username) => {
  try {
    const prepared = new sql.PreparedStatement();
    prepared.input("username", sql.VarChar(255));
    await prepared.prepare("SELECT * FROM users WHERE username = @username");
    const result = await prepared.execute({ username: username });
    prepared.unprepare();
    return result.recordset[0];
  } catch (err) {
    console.log(err);
  }
};
