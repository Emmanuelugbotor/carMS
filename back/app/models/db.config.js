const sql = require("mysql");

const connection = sql.createPool({

  host: "192.168.64.3",
  user: "alldb",
  password: "",
  database: "alldb",
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000

});

// const connection = sql.createPool({
//   host: "localhost",
//   user: "ahpojnip_pahpo",
//   password: "ahpojnip_pahpo",
//   database: "ahpojnip_pahpo",
//   port: 3306,
// });



// connection.query(
//   `CREATE TABLE IF NOT EXISTS msc(id INT(11) NOT NULL AUTO_INCREMENT, sectionid varchar(20) NOT NULL, regnumber varchar(20) NOT NULL,
//     mscid INT(11) NOT NULL, PRIMARY KEY(id), UNIQUE KEY(mscid),  FOREIGN KEY(regnumber) REFERENCES students(regnumber) ON DELETE CASCADE ON UPDATE CASCADE,
//     FOREIGN KEY(sectionid) REFERENCES sections(sectionid) ON DELETE CASCADE ON UPDATE CASCADE,
//     FOREIGN KEY(sectionid) REFERENCES students(sectionid) ON DELETE CASCADE ON UPDATE CASCADE,
//     FOREIGN KEY(mscid) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE)`,
//   (err, result) => { if (err) console.log(err);
//   }
// );


connection.query(
  "CREATE TABLE IF NOT EXISTS `farmers`(`id` INT(11) NOT NULL AUTO_INCREMENT, `name` TEXT(1000) NOT NULL,  `phone` TEXT(1000) NOT NULL, `email` TEXT(1000) NOT NULL, `address` TEXT(1000)  NULL, `password` text(1000) NOT NULL, `otp` int(11)  NULL, `verified` text(1000) NULL, PRIMARY KEY(`id`))",
  (err, result) => {
    if (err) console.log(err);
  }
);

connection.query(
  "CREATE TABLE IF NOT EXISTS paid_farmers(`id` int(11) AUTO_INCREMENT NOT NULL, `buyer_id` int(11) NOT NULL, `product_id` int(11) NOT NULL, `quantity` text(1000) NULL, `amount` text(1000) NULL, `package` text(1000) NULL, `deposit_date` DATE NULL, `product_name` text(1000) NULL, `others` text(1000) NULL, `status` text(1000) NULL, PRIMARY KEY(`id`), FOREIGN KEY(buyer_id) REFERENCES farmers(id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE)",
  (x, y) => {
    if (x) {
      console.log(x);
    }
  }
);

connection.query(
  "CREATE TABLE IF NOT EXISTS `product`(`id` int(11) NOT NULL AUTO_INCREMENT, `farmer_id` int(11) NOT NULL, `category` text(1000) NULL,  `desc` text(1000) NULL, `weight` text(1000) NOT NULL, `amt` text(1000) NOT NULL, `fullbag` text(1000) NOT NULL, `halfbag` text(1000) NOT NULL, `quaterbag` text(1000) NOT NULL, `imagesName` text(1000) NOT NULL, `verify` text(1000)  NULL,  PRIMARY KEY(`id`), FOREIGN KEY(farmer_id) REFERENCES farmers(id) ON DELETE CASCADE ON UPDATE CASCADE)"
);

connection.query(
  "CREATE TABLE IF NOT EXISTS contact(id int(11) AUTO_INCREMENT NOT NULL, name TEXT(1000) NOT NULL, phone TEXT(1000) NOT NULL, email TEXT(1000) NOT NULL, subject TEXT(1000) NOT NULL, message TEXT(1000) NOT NULL, PRIMARY KEY(id))",
  (err, result) => {
    if (err) console.log(err);
  }
);

connection.query(
  "CREATE TABLE IF NOT EXISTS `admin`(`id` int(11) NOT NULL AUTO_INCREMENT, `first_name` TEXT(1000) NULL, `last_name` TEXT(100) NULL, `isSuperAdmin` bool default false, `email` TEXT(1000) NOT NULL, `repeat_password` text(1000) NOT NULL, `password` text(1000) NOT NULL, `number` int(11) NOT NULL, `createdAt` datetime default now(), PRIMARY KEY(`id`))",
  (err, result) => {
    if (err) console.log(err);
  }
);

connection.query(
  "CREATE TABLE IF NOT EXISTS `sub_admin`(`id` int(11) NOT NULL AUTO_INCREMENT, `fullname` TEXT(1000) NULL, `privillage` TEXT(100) NULL, `username` TEXT(1000) NULL, `email` TEXT(1000) NULL, `password` text(1000) NOT NULL, `number` TEXT(1000) NULL, PRIMARY KEY(`id`))",
  (err, result) => {
    if (err) console.log(err);
  }
);

module.exports = connection;
