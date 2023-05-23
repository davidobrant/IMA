import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

db.connect(async (err, connection) => {
  console.log('RUNNING CREATE TABLE SCRIPT');
  let createUsersTable = `CREATE TABLE Users (
    userId int NOT NULL AUTO_INCREMENT, 
    firstName varchar(45) NOT NULL, 
    lastName varchar(45) NOT NULL, 
    email varchar(45) NOT NULL, 
    password varchar(100) NOT NULL, 
    PRIMARY KEY (userId)) 
    ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    `;
  let createRolesTable = `CREATE TABLE Roles (
    roleId int NOT NULL AUTO_INCREMENT,
    roleName varchar(45) NOT NULL,
    PRIMARY KEY (roleId)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `;
  let createUsersWithRoleTable = `CREATE TABLE UsersWithRoles (
    userId int NOT NULL,
    roleId int NOT NULL,
    CONSTRAINT FK_Role FOREIGN KEY (roleId) REFERENCES Roles(roleId),
    CONSTRAINT FK_User FOREIGN KEY (userId) REFERENCES Users(userId)
    ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `;
  let createStationsTable = `CREATE TABLE Stations (
    stationId int NOT NULL AUTO_INCREMENT, 
    userId INT,
    computorId INT,
    status varchar(45), 
    PRIMARY KEY (stationId)
    ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `;
  let createStationsWithUsersTable = `CREATE TABLE StationsWithUsers (
    stationId int NOT NULL, 
    userId INT,
    PRIMARY KEY (stationId),
    CONSTRAINT FK_Station FOREIGN KEY (stationId) REFERENCES Stations(stationId),
    CONSTRAINT FK_UserStation FOREIGN KEY (userId) REFERENCES Users(userId)
    ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `;

  db.query(createUsersTable, async (err) => {
    if (err) {
      process.exit(1);
    }
    db.query(createRolesTable, async (err) => {
      if (err) {
        process.exit(1);
      }
      db.query(createUsersWithRoleTable, async (err) => {
        if (err) {
          process.exit(1);
        }
        db.query(createStationsTable, async (err) => {
          if (err) {
            process.exit(1);
          }
          db.query(createStationsWithUsersTable, async (err) => {
            if (err) {
              process.exit(1);
            }
            console.log('--- TABLES CREATED ---');
            process.exit(0);
          })
        });
      });
    });
  });
});
