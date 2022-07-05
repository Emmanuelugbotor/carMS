const db = require("../models/models");
const sql = require("../models/db.config");
const bcrypt = require("bcryptjs");
const request = require("request");
const { Register } = require("../utils/registerValidate");
const {
  Packages,
  imageParams,
  withdrawalDB,
  studentDataCounter,
  filterReqBody,
  CGPAcalculator,
} = require("../utils/packages");
const { sendOtp } = require("../utils/email.controller");
const {
  packagesPlans,
  validateWithdrawalRequest,
} = require("../utils/runningPlans");
const { data } = require("../models/models");
const { generateToken } = require("../utils/token");
const saltRounds = 10;
let { generatePdf, sendAdminReceipt } = require("../utils/email.controller");

let imageArray = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/JPG",
  "image/gif",
];

exports.readAll = async (req, res) => {
  await sql.query(
    `select *, admin.first_name, ${
      req.params.db
    }.id as tableID, admin.id as adminid from ${
      req.params.db
    } inner join admin on(admin.id=${req.params.db}.createdBy) where ${
      req.params.db
    }.branchid = ${parseInt(req.params.id)} order by ${req.params.db}.id desc`,
    (error, result) => {
      if (error) return console.log(error), res.status(400).send({});
      return res.status(200).send({ items: result });
    }
  );
};

exports.editAll = async (req, res) => {
  let databaseTable = req.params.db;
  let tableID = req.params.id;

  if (!req.body || !tableID || !databaseTable)
    return res.status(403).send({ error: "Bad Request" });

  await db.update(
    databaseTable,
    req.body,
    "id",
    tableID,
    async (error, output) => {
      console.log("OUTPUT ", output);
      if (error)
        return (
          console.log(error), res.status(400).send({ error: "Network errror" })
        );
      return res.status(200).send({
        msg: `Edited successfully`,
      });
    }
  );
};

exports.ReadProduct = async (req, res) => {
  let resultObj = {};
  await db.select("managers", (error, result) => {
    if (error) return console.log(error), res.status(400).send({});
    return res.status(200).send({ items: result });
  });
};

exports.getadmin = async (req, res) => {
  let resultObj = {};
  await db.select("admin", (error, result) => {
    if (error) return console.log(error), res.status(400).send({});
    return res.status(200).send({ items: result });
  });
};

exports.readCarRecord = async (req, res) => {
  if (!req.params.id) return res.status(403).send({ error: "Bad Request" });

  sql.query(
    `select *, carsrecord.id as tableID, workers.firstName as workers_name, workers.middleName as workers_name_middle, workers.lastName as workers_name_last, workers.phone as workers_phone, workers.createdAt as workers_createdDate, cars.createdAt as cars_createdDate, carsrecord.createdAt as date, carsrecord.id as cid from carsrecord inner join workers on(carsrecord.workerid=workers.id) inner join cars on(carsrecord.carid = cars.id) where carsrecord.branchid = ? order by carsrecord.id desc`,
    [req.params.id],
    (err, data) => {
      if (err)
        return console.log(err), res.status(400).send({ error: "DB Error" });
      else {
        res.status(200).send({ data });
      }
    }
  );
};

exports.addmanager = async (req, res) => {
  const { name, email, phone, address, password } = req.body;
  if (!req.body) return res.status(403).send({ error: "Bad Request" });

  await db.selectByOne("managers", "phone", phone, async (err, output) => {
    if (err)
      return (
        console.log(err), res.status(400).send({ error: "Network Error 1" })
      );
    if (!Object.entries(output).length == 0)
      return res.status(400).send({
        error: "Manager with this Phone number already exist",
      });

    await db.insert("managers", req.body, async (err, output) => {
      if (err)
        return console.log(err), res.status(400).send({ error: "DB Error 1" });
      else {
        res.status(200).send({
          msg: "Manager added successfully",
        });
      }
    });
  });
};

exports.addCars = async (req, res) => {
  let { plateid, managerid } = req.body;
  await sql.query(
    `select * from cars where plateid=? and managerid=?`,
    [plateid, managerid],
    async (err, output) => {
      if (err)
        return (
          console.log(err), res.status(400).send({ error: "Network Error 2" })
        );
      if (!Object.entries(output).length == 0)
        return res.status(400).send({ error: "Cars already registered" });

      await db.insert("cars", req.body, async (err, ans) => {
        if (err)
          return (
            console.log(err), res.status(400).send({ error: "Network Error 3" })
          );
        return res.status(200).send({
          msg: `Car registered successfully`,
        });
      });
    }
  );
};

exports.addServices = async (req, res) => {
  if (!req.body) return res.status(500).send({ error: "Invalid request" });

  await db.insert("services", req.body, async (err, ans) => {
    if (err)
      return (
        console.log(err), res.status(400).send({ error: "Network Error 3" })
      );
    return res.status(200).send({
      msg: `Services registered successfully`,
    });
  });
};

exports.addExpenses = async (req, res) => {
  // console.log(req.body)
  if (!req.body) return res.status(500).send({ error: "Invalid request" });

  await db.insert("expenses", req.body, async (err, ans) => {
    if (err)
      return (
        console.log(err), res.status(400).send({ error: "Network Error 3" })
      );
    return res.status(200).send({
      msg: `expenses added successfully`,
    });
  });
};

exports.addManagerToBranch = async (req, res) => {
  console.log("BODY ", req.body);
  if (!req.body) return res.status(403).send({ error: "Bad Request" });

  const { password, email, first_name, number, address, createdAt } = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  let userInfo = {
    email: email,
    first_name: first_name,
    password: encryptedPassword,
    number: number,
    isSuperAdmin: false,
    createdAt: createdAt,
    repeat_password: password,
    address: address,
  };

  await db.createAdmin(userInfo, (err, result) => {
    if (err)
      return (
        console.log(err), res.status(400).send({ error: "Network Error 4" })
      );
    res.status(200).send({
      msg: "admin Added Successfuly",
    });
  });
};

exports.addWorkers = async (req, res) => {
  // console.log("BODY ", req.body);
  // console.log("BODY ", req.files);
  if (!req.body) return res.status(403).send({ error: "Bad Request" });

  const { phone } = req.body;

  if (req.files && !imageArray.includes(req.files.pic.mimetype)) {
    return res.status(400).send({ error: "please select a valid image file" });
  }
  if (req.files) req.files.pic.mv("public/images/" + req.files.pic.name);

  let realData = {
    ...req.body,
    pic: req.files ? "images/" + req.files.pic.name : "",
  };

  await db.selectByOne("workers", "phone", phone, async (err, output) => {
    if (err)
      return (
        console.log(err), res.status(400).send({ error: "Network Error 4" })
      );
    if (!Object.entries(output).length == 0)
      return res.status(400).send({
        error: "Worker with this Phone number already exist",
      });

    await db.insert("workers", realData, async (err, output) => {
      if (err)
        return console.log(err), res.status(400).send({ error: "DB Error 3" });
      else {
        res.status(200).send({
          msg: "Worker Added Successfully",
        });
      }
    });
  });
};

exports.changePic = async (req, res) => {
  console.log("files ", req.files);
  let databaseTable = req.params.db;
  let tableID = req.params.id;

  if (!req.files || !tableID || !databaseTable)
    return res.status(403).send({ error: "Bad Request" });

  if (req.files && !imageArray.includes(req.files.pic.mimetype)) {
    return res.status(400).send({ error: "please select a valid image file" });
  }

  if (req.files) req.files.pic.mv("public/images/" + req.files.pic.name);

  let realData = {
    pic: req.files ? "images/" + req.files.pic.name : "",
  };

  await db.update(
    databaseTable,
    realData,
    "id",
    tableID,
    async (error, output) => {
      console.log("OUTPUT ", output);
      if (error)
        return (
          console.log(error), res.status(400).send({ error: "Network errror" })
        );
      return res.status(200).send({
        msg: `Edited successfully`,
      });
    }
  );
};

exports.addCustomers = async (req, res) => {
  // console.log(req.files)
  if (!req.body) return res.status(403).send({ error: "Bad Request" });

  const { plateid } = req.body;

  if (req.files && !imageArray.includes(req.files.pic.mimetype)) {
    return res.status(400).send({ error: "please select a valid image file" });
  }
  if (req.files) req.files.pic.mv("public/images/" + req.files.pic.name);

  let realData = {
    ...req.body,
    plateid: req.body.plateid.toLowerCase(),
    pic: req.files ? "images/" + req.files.pic.name : "",
  };

  await db.selectByOne("cars", "plateid", plateid, async (err, output) => {
    if (err)
      return (
        console.log(err), res.status(400).send({ error: "Network Error 4" })
      );
    if (!Object.entries(output).length == 0)
      return res.status(400).send({
        error: "Customer with this Plate number already exist",
      });

    await db.insert("cars", realData, async (err, output) => {
      if (err)
        return console.log(err), res.status(400).send({ error: "DB Error 3" });
      else {
        res.status(200).send({ msg: "Customer Added Successfully" });
      }
    });
  });
};

exports.addCarRecord = async (req, res) => {
  let {
    plateid,
    branchid,
    createdBy,
    phone,
    type,
    createdAt,
    workerid,
    attendedBy,
    amount,
    payType,
    servType,
  } = req.body;

  let carData = {
    branchid,
    createdBy,
    plateid: "0000",
    phone,
    type,
    createdAt,
  };
  let carDataWithPlateID = {
    branchid,
    createdBy,
    plateid: plateid.toLowerCase(),
    phone,
    type,
    createdAt,
  };

  let carRecordData = {
    branchid,
    servType,
    payType,
    workerid,
    attendedBy,
    amount,
    createdAt,
  };

  if (!req.body) return res.status(403).send({ error: "Bad Request" });

  // console.log(req.body)

  // CHECK IF REQ.BODY CONTAIN PLATE NUMBER
  // IF YES DO THIS

  if (req.body.plateid) {
    await db.selectByOne(
      "cars",
      "plateid",
      plateid.toLowerCase(),
      async (err, output) => {
        if (err)
          return (
            console.log(err),
            res.status(400).send({ error: "Network Error 404" })
          );

        // IF NO CARS WITH THAT PLATE 0000 NUMBER THEN CREATE ONE AND ADD CAR RECORDS TO IT

        if (Object.entries(output).length == 0) {
          await db.insert("cars", carDataWithPlateID, async (err, output) => {
            if (err)
              return (
                console.log(err),
                res.status(400).send({ error: "DB Error 303" })
              );
            else {
              let carsrecordWithCardID = {
                ...carRecordData,
                carid: output.insertId,
              };

              await db.insert(
                "carsrecord",
                carsrecordWithCardID,
                async (err, output) => {
                  if (err)
                    return (
                      console.log(err),
                      res.status(400).send({ error: "DB Error 2" })
                    );
                  else {
                    res.status(200).send({
                      msg: "Car record added Successfully",
                    });
                  }
                }
              );
            }
          });
        } else {
          for (var result of output) {
            var carsrecordWithCardID_X = {
              ...carRecordData,
              carid: result.id,
            };
          }

          await db.insert(
            "carsrecord",
            carsrecordWithCardID_X,
            async (err, output) => {
              if (err)
                return (
                  console.log(err),
                  res.status(400).send({ error: "DB Error 2" })
                );
              else {
                res.status(200).send({
                  msg: "Car record added Successfully",
                });
              }
            }
          );
        }
      }
    );
  }
  // IF NO DO THIS
  else {
    // CHECK IF A PLATEID OF 0000 EXIST IN THE CARS TABLE

    await db.selectByOne("cars", "plateid", "0000", async (err, output) => {
      if (err)
        return (
          console.log(err), res.status(400).send({ error: "Network Error 404" })
        );

      // IF NO CARS WITH THAT PLATE 0000 NUMBER THEN CREATE ONE AND ADD CAR RECORDS TO IT

      if (Object.entries(output).length == 0) {
        await db.insert("cars", carData, async (err, output) => {
          if (err)
            return (
              console.log(err), res.status(400).send({ error: "DB Error 303" })
            );
          else {
            let carsrecordWithCardID = {
              ...carRecordData,
              carid: output.insertId,
            };

            await db.insert(
              "carsrecord",
              carsrecordWithCardID,
              async (err, output) => {
                if (err)
                  return (
                    console.log(err),
                    res.status(400).send({ error: "DB Error 2" })
                  );
                else {
                  res.status(200).send({
                    msg: "Car record added Successfully",
                  });
                }
              }
            );
          }
        });
      } else {
        for (var result of output) {
          console.log("finding the id of the selected values ", result.id);
          var carsrecordWithCardID = {
            ...carRecordData,
            carid: result.id,
          };
        }

        await db.insert(
          "carsrecord",
          carsrecordWithCardID,
          async (err, output) => {
            if (err)
              return (
                console.log(err), res.status(400).send({ error: "DB Error 2" })
              );
            else {
              res.status(200).send({
                msg: "Car record added Successfully",
              });
            }
          }
        );
      }
    });
  }
};

exports.deleteManager = async (req, res) => {
  db.adminDeleteUserWithID(req.params.id, "managers", async (err, data) => {
    if (err)
      return console.log(err), res.status(400).send({ error: "DB Error" });
    else {
      res.status(200).send({ msg: "Manager deleted successfully" });
    }
  });
};
exports.deleteAdmin = async (req, res) => {
  db.adminDeleteUserWithID(req.params.id, "admin", async (err, data) => {
    if (err)
      return console.log(err), res.status(400).send({ error: "DB Error" });
    else {
      res.status(200).send({ msg: "Admin deleted successfully" });
    }
  });
};

exports.deleteothers = async (req, res) => {
  let id = parseInt(req.params.id);
  let mid = parseInt(req.params.mid);
  let dbName = req.params.dbName;

  sql.query(
    `DELETE FROM ${dbName} WHERE id = ? AND branchid = ?`,
    [id, mid],
    (err, output) => {
      if (err)
        return console.log(err), res.status(400).send({ error: "DB Error" });
      res.status(200).send({ msg: "Deleted Successfully" });
    }
  );
};

exports.getPgResult = async (req, res) => {
  let resultObj = {};
  await db.select("pgd", async (error, pgd) => {
    if (error) return console.log(error), res.status(400).send({});
    await db.select("msc", async (err, msc) => {
      if (err) return console.log(err), res.status(400).send({});
      await db.select("phd", async (Perr, phd) => {
        if (Perr) return console.log(Perr), res.status(400).send({});
        await db.select("courses", async (Cerr, coursesData) => {
          if (Cerr) return console.log(Perr), res.status(400).send({});
          let pgdResult = await CGPAcalculator(pgd, coursesData);
          let mscResult = await CGPAcalculator(msc, coursesData);
          let phdResult = await CGPAcalculator(phd, coursesData);
          let body = {
            pgdResult,
            mscResult,
            phdResult,
            coursesData,
          };
          return res.status(200).send({ body });
        });
      });
    });
  });
};

exports.addsection = async (req, res) => {
  let { sectionid } = req.body;
  console.log(req.body);
  await db.selectByOne(
    "sections",
    "sectionid",
    sectionid,
    async (secErr, secRes) => {
      if (secErr)
        console.log(secErr), res.status(400).send({ error: "Network Error" });
      if (!Object.entries(secRes).length == 0)
        return res.status(400).send({ error: "Section Already Exist" });

      await db.insert("sections", req.body, async (error, reqpose) => {
        if (error)
          console.log(error), res.status(400).send({ error: "Network Error" });

        await db.select("sections", (errors, result) => {
          if (errors)
            return (
              console.log(errors),
              res.status(400).send({ error: "Network Error" })
            );
          return res
            .status(200)
            .send({ result, msg: "New section created successfully" });
        });
      });
    }
  );
};

exports.sectionData = async (req, res) => {
  const { sectionid, id } = req.body;
  console.log("This is the section id", sectionid);
  await db.selectByMany(
    "students",
    "sections",
    "sectionid",
    "sectionid",
    sectionid,
    async (error, result) => {
      if (error)
        return (
          console.log(error), res.status(400).send({ error: "Network Error" })
        );
      else {
        await sql.query(
          `select pgstatus, coursecode from courses where sectionid=?`,
          [sectionid],
          async (courErr, courRes) => {
            if (courErr) {
              console.log(courErr);
              let studentCounter = await studentDataCounter(result);
              res.status(200).send({ result, sectionid, studentCounter });
              return;
            } else {
              await sql.query(
                "select * from pgd where sectionid=?",
                [sectionid],
                async (error, pgd) => {
                  if (error)
                    return console.log(error), res.status(400).send({});
                  await sql.query(
                    "select * from msc where sectionid=?",
                    [sectionid],
                    async (err, msc) => {
                      if (err)
                        return console.log(err), res.status(400).send({});
                      await sql.query(
                        "select * from phd where sectionid=?",
                        [sectionid],
                        async (Perr, phd) => {
                          if (Perr)
                            return console.log(Perr), res.status(400).send({});
                          await db.select(
                            "courses",
                            async (Cerr, coursesData) => {
                              if (Cerr)
                                return (
                                  console.log(Perr), res.status(400).send({})
                                );
                              let pgdResult = await CGPAcalculator(
                                pgd,
                                coursesData
                              );
                              let mscResult = await CGPAcalculator(
                                msc,
                                coursesData
                              );
                              let phdResult = await CGPAcalculator(
                                phd,
                                coursesData
                              );
                              let body = {
                                pgdResult,
                                mscResult,
                                phdResult,
                                coursesData,
                              };

                              let studentCounter = await studentDataCounter(
                                result
                              );
                              res.status(200).send({
                                result,
                                sectionid,
                                body,
                                studentCounter,
                                courRes,
                              });
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          }
        );
      }
    }
  );
};

exports.addStudentToSection = async (req, res) => {
  const { sectionid, id, regnumber, pgstatus } = req.body;
  console.log(req.body);
  if (!req.body) return res.status(403).send({ error: "Bad Request" });

  await db.selectByOne(
    "students",
    "regnumber",
    regnumber,
    async (err, output) => {
      if (err)
        return (
          console.log(err), res.status(400).send({ error: "Network Error" })
        );
      if (!Object.entries(output).length == 0)
        return res.status(400).send({
          error: "Student with this registration number already exist",
        });

      await db.insert("students", req.body, async (err, output) => {
        if (err)
          return (
            console.log(err), res.status(400).send({ error: "Network Error" })
          );

        await db.selectByMany(
          "students",
          "sections",
          "sectionid",
          "sectionid",
          sectionid,
          async (error, result) => {
            if (error)
              return (
                console.log(error),
                res.status(400).send({ error: "Network Error" })
              );
            // console.log("glmosrnvls kfv", result);
            let studentCounter = await studentDataCounter(result);
            res.status(200).send({
              result,
              studentCounter,
              sectionid,
              msg: `${pgstatus} student created successfully`,
            });
          }
        );
      });
    }
  );
};

exports.deleteStudentFromSection = async (req, res) => {
  const { sectionid, id, regnumber, pgstatus } = req.body;
  console.log("delete request ", req.body);

  if (!req.body) return res.status(403).send({ error: "Bad Request" });

  await sql.query(
    "delete from students where id=? and regnumber=? and pgstatus=? and sectionid=?",
    [id, regnumber, pgstatus, sectionid],
    async (err, output) => {
      if (err)
        return (
          console.log(err), res.status(400).send({ error: "Network Error" })
        );

      await db.selectByMany(
        "students",
        "sections",
        "sectionid",
        "sectionid",
        sectionid,
        async (error, result) => {
          if (error)
            return (
              console.log(error),
              res.status(400).send({ error: "Network Error" })
            );
          // console.log("glmosrnvls kfv", result);
          let studentCounter = await studentDataCounter(result);
          res.status(200).send({
            result,
            studentCounter,
            sectionid,
            msg: `${pgstatus} student created successfully`,
          });
        }
      );
    }
  );
};

exports.addResult = async (req, res) => {
  console.log(req.body);
  var columnName;
  let { body, courses } = req.body;
  courses.toLowerCase();
  if (!req.body) return res.status(400).send({ error: "Network  errror" });
  var studentData = filterReqBody(body);
  if (courses.toLowerCase() == "msc") columnName = "mscid";
  if (courses.toLowerCase() == "pgd") columnName = "pgdid";
  if (courses.toLowerCase() == "phd") columnName = "phdid";

  await db.selectByOne(
    courses.toLowerCase(),
    "regnumber",
    body.regnumber,
    async (error, resu) => {
      if (error)
        return (
          console.log(error), res.status(400).send({ error: "Network errror" })
        );
      if (Object.entries(resu).length == 0) {
        await db.insert(courses, body, async (error, output) => {
          if (error)
            return (
              console.log(error),
              res.status(400).send({ error: "Network errror" })
            );

          await db.select(courses, async (err, resultData) => {
            if (err)
              return (
                console.log(err),
                res.status(400).send({ error: "Network errror" })
              );
            await db.select("courses", async (err, courseData) => {
              if (err)
                return (
                  console.log(err),
                  res.status(400).send({ error: "Network errror" })
                );
              let result = await CGPAcalculator(resultData, courseData);
              return res
                .status(200)
                .send({ result, msg: "Result created successfully" });
            });
            // let result = CGPAcalculator(resultData, courseData);
            // return res.status(200).send({result, msg: "Result created successfully"});
          });

          // await db.selectByTwo("courses", "coursecode", "coursecredit" , "pgstatus", courses, async (err, courseData) => {
          //   if(err) return console.log(err), res.status(400).send({ error: "Network errror" });
          //   await db.select(courses, (err, resultData)=>{
          //     if(err) return console.log(err), res.status(400).send({ error: "Network errror" });

          //     let result = CGPAcalculator(resultData, courseData);
          //     return res.status(200).send({result, msg: "Result created successfully"});
          //   })
          // })
        });
      } else {
        await db.update(
          courses,
          body,
          columnName,
          body[columnName],
          async (error, output) => {
            console.log("OUTPUT ", output);
            if (error)
              return (
                console.log(error),
                res.status(400).send({ error: "Network errror" })
              );
            await db.select(courses, async (err, resultData) => {
              if (err)
                return (
                  console.log(err),
                  res.status(400).send({ error: "Network errror" })
                );

              await db.select("courses", async (err, courseData) => {
                if (err)
                  return (
                    console.log(err),
                    res.status(400).send({ error: "Network errror" })
                  );
                let result = await CGPAcalculator(resultData, courseData);
                return res
                  .status(200)
                  .send({ result, msg: "Result created successfully" });
              });
            });
          }
        );
      }
    }
  );
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};

exports.LoginUser = async (req, res) => {
  let { pgstatus, regnumber } = req.body;
  console.log("The user data ", req.body);

  await sql.query(
    `select * from students where regnumber=? and pgstatus=?`,
    [regnumber, pgstatus],
    async (err, result) => {
      if (err) res.status(400).send({ error: "Server Error" });
      else {
        if (result.length > 0) {
          await sql.query(
            `select * from courses where pgstatus=? `,
            [pgstatus],
            async (courErr, courRes) => {
              if (courErr) {
                res.status(200).send({
                  id: result[0].id,
                  email: result[0].email,
                  name: result[0].name,
                  phone: result[0].phone,
                  token: generateToken(result[0]),
                  isAdmin: false,
                });
              } else {
                await sql.query(
                  `select * from ${pgstatus} where regnumber=?`,
                  [regnumber],
                  async (pgErr, pgRes) => {
                    if (pgErr) {
                      console.log(pgErr);
                      res.status(200).send({
                        id: result[0].id,
                        email: result[0].email,
                        name: result[0].name,
                        phone: result[0].phone,
                        token: generateToken(result[0]),
                        isAdmin: false,
                      });
                    } else {
                      let cgpa = await CGPAcalculator(pgRes, courRes);
                      console.log("Reuslt ", pgRes);
                      console.log("Courses ", courRes);
                      console.log("CGPA ", cgpa);
                      res.status(200).send({
                        id: result[0].id,
                        email: result[0].email,
                        name: result[0].name,
                        phone: result[0].phone,
                        token: generateToken(result[0]),
                        isAdmin: false,
                        courRes,
                        pgRes,
                        cgpa,
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          res.status(400).send({ error: "Incorrect Registration number " });
        }
      }
    }
  );
};

exports.CscAdmin = async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);

  await db.selectByOne("admin", "email", email, async (err, result) => {
    if (err) console.log("err login admin ", err), res.status(400).send({ error: "Server Error" });
    else {
      if (result.length > 0) {
        const hash = result[0].password.toString();
        bcrypt.compare(password, hash, function (err, response) {
          if (response === true) {
            res.status(200).send({
              id: result[0].id,
              email: result[0].email,
              name: result[0].first_name,
              branchID: result[0].number,
              token: generateToken(result[0]),
              isAdmin: result[0].isSuperAdmin,
              isSupperAdmin: result[0].isSuperAdmin,
            });
          } else {
            res.status(400).send({ error: "Incorrect email or password" });
          }
        });
      } else {
        res.status(400).send({ error: "Incorrect email or password" });
      }
    }
  });
};

exports.usersEditEmail = async (req, res) => {
  console.log(req.body);
  let { new_email } = req.body;
  let { id, email } = req.user;

  let otp = Math.round(Math.random() * 100000000);
  let userDbEmail;

  sql.query(
    `SELECT email FROM farmers WHERE id = ?`,
    [id],
    async (errors, output) => {
      for (var i in output) {
        userDbEmail = output[i].email;
      }
      if (errors) {
        console.log(errors);
        return res.status(400).send({ error: "Network error, try again." });
      }
      if (userDbEmail !== email) {
        return res
          .status(400)
          .send({ error: "previous email you entered is incorrect" });
      } else {
        await db.validateViaEmail(new_email, async (err, emailData) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ error: "Network error, try again." });
          }
          if (emailData.email && emailData.email == new_email) {
            // console.log("GOT HERE")
            return res.status(400).send({ error: "This Email already exist" });
          } else {
            await sendOtp(email, otp, (emailErr, emailRes) => {
              if (emailRes) {
                sql.query(
                  `UPDATE farmers SET otp=? WHERE id=?`,
                  [otp, id],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      return res
                        .status(400)
                        .send({ error: "Network error, try again." });
                    } else {
                      return res.status(200).send({
                        msg: "An OTP code has been sent to your email",
                        new_email,
                      });
                    }
                  }
                );
              } else {
                return res
                  .status(400)
                  .send({ error: "Network error, try again." });
              }
            });
          }
        });
      }
    }
  );
};

exports.changedetails = async (req, res) => {
  console.log(req.body);
  let { name, phone, address } = req.body;
  let { id, email } = req.user;
  let auth = {
    id: id,
    email: email,
    name: name,
    phone: phone,
    address: address,
  };

  sql.query(
    `UPDATE farmers SET name=?, phone=?, address=? WHERE id=?`,
    [name, phone, address, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ error: "Network error, try again." });
      } else {
        return res.status(200).send({
          id: id,
          email: email,
          name: name,
          phone: phone,
          address: address,
          token: generateToken(auth),
          msg: "Details changed successfully.",
        });
      }
    }
  );
};

exports.usersEditPass = async (req, res) => {
  console.log(req.body);
  let { new_Pass } = req.body;
  let { id, email } = req.user;
  let otp = Math.round(Math.random() * 100000000);

  await sendOtp(email, otp, (emailErr, emailRes) => {
    if (emailRes) {
      sql.query(
        `UPDATE farmers SET otp=? WHERE id=?`,
        [otp, id],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ error: "Network error, try again." });
          } else {
            return res.status(200).send({
              msg: "An OTP code has been sent to your email",
              new_Pass,
            });
          }
        }
      );
    } else {
      return res.status(400).send({ error: "Network error, try again." });
    }
  });
};

exports.resetEmail = async (req, res) => {
  let hashPassword;

  let { id } = req.user;
  let { new_email, otpCode } = req.body;

  await sql.query(
    `SELECT id, email, name, phone, otp FROM farmers WHERE id=?`,
    [id],
    async (err, result) => {
      if (result[0].otp == parseInt(otpCode)) {
        await sql.query(
          `UPDATE farmers SET email=? WHERE id=?`,
          [new_email, id],
          async (errs, resp2) => {
            if (errs) {
              console.log(errs);
              return res
                .status(400)
                .send({ error: "Network Error, try again." });
            } else {
              return res.status(200).send({
                id: result[0].id,
                email: new_email,
                name: result[0].name,
                phone: result[0].phone,
                token: generateToken(result[0]),
                msg: "Email changed successfully.",
              });
            }
          }
        );
      } else {
        return res.status(400).send({ error: "Invalid OTP code" });
      }
    }
  );
};

exports.resetPass = async (req, res) => {
  let { id } = req.user;
  let { new_Pass, otpCode } = req.body;

  await sql.query(
    `SELECT id, email, name, phone, otp FROM farmers WHERE id=?`,
    [id],
    async (err, result) => {
      if (result[0].otp == parseInt(otpCode)) {
        await bcrypt.hash(new_Pass, saltRounds, async function (err, hash) {
          if (err)
            console.log(err),
              res.status(400).send({ error: "Network Error, try again." });
          else {
            await sql.query(
              `UPDATE farmers SET password=? WHERE id=?`,
              [hash, id],
              async (errs, resp2) => {
                if (errs) {
                  console.log(errs);
                  return res
                    .status(400)
                    .send({ error: "Network Error, try again." });
                } else {
                  return res.status(200).send({
                    id: result[0].id,
                    email: result[0].email,
                    name: result[0].name,
                    phone: result[0].phone,
                    token: generateToken(result[0]),
                    msg: "Password changed successfully.",
                  });
                }
              }
            );
          }
        });
      } else return res.status(400).send({ error: "Invalid OTP code" });
    }
  );
};

exports.RegisterUser = async (req, res) => {
  if (!req.body) {
    res.status(500).send({ error: "Provide valid user details" });
  } else {
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    let userInfo = {
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      password: encryptedPassword,
      // repeat_password: encryptedPassword,
    };

    req.body.name.split(" ").join("");
    let { error } = Register(req.body);
    if (error) {
      return res.status(502).send({ error: error.details[0]["message"] });
    } else {
      await db.selectByOne(
        "farmers",
        "email",
        userInfo.email,
        async (err, result) => {
          // console.log(result)
          if (err) {
            res.status(500).send({ error: "Network Error" });
          } else if (!Object.entries(result).length == 0) {
            res.status(500).send({ error: "email already exist" });
          } else {
            await db.insertUsers("farmers", userInfo, (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send({ error: "Network Error, try again" });
              } else {
                // console.log(result.insertId);
                let userRegObj = {
                  id: result.insertId,
                  email: req.body.email,
                  name: req.body.fullname,
                  phone: req.body.phone,
                };
                res.status(200).send({
                  id: result.insertId,
                  email: req.body.email,
                  name: req.body.name,
                  phone: req.body.phone,
                  token: generateToken(userRegObj),
                });
              }
            });
          }
        }
      );
    }
  }
};

exports.buyerCheckout = async (req, res) => {
  console.log("FLW REPONSE FROMT THE REACT SIDE", req.body);
  let { email, name } = req.user;
  let userID = req.user.id;
  var obj = req.body.response;
  var amount = parseInt(obj.amount);
  let cartOrderObj = req.body.cartItems;
  let buyerID = userID;
  let product_id = cartOrderObj[0].product;
  var package = "";
  var quantity = parseInt(cartOrderObj[0].qty);
  let flutterWaveReturnedObject;
  var transID = obj.transaction_id;
  let buyerAddress = "";

  let options = {
    method: "GET",
    url: `https://api.flutterwave.com/v3/transactions/${transID}/verify`,
    headers: {
      "content-type": "application/json",
      authorization: "FLWSECK-db2f2e4a8e3ceecd9d5e7dc73bf899d3-X",
    },
  };

  // authorization: "FLWSECK-db2f2e4a8e3ceecd9d5e7dc73bf899d3-X",

  // authorization: "FLWSECK_TEST-92366ffe2edb0cb5cfdf4c5eaabdaf6c-X",

  await request(options, async (err, response) => {
    flutterWaveReturnedObject = JSON.parse(response.body);
    buyerAddress = flutterWaveReturnedObject.data.meta.ShippingAddress;

    console.log("MEMBERSHIP FEE RES ", flutterWaveReturnedObject);
    let deposit_date = new Date();

    if (flutterWaveReturnedObject.data.status == "successful") {
      if (
        flutterWaveReturnedObject.data.amount == amount ||
        flutterWaveReturnedObject.data.amount > amount
      ) {
        if (cartOrderObj.length > 1) {
          //  for (var i = 0; i <= cartOrderObj.length; i++) {

          //   await db.buerValidateInsert(buyerID, cartOrderObj[i].id, 1, cartOrderObj[i].sellingPrice,
          //     package, deposit_date, "Pending", buyerAddress,  async (err, data) => {
          //       if (err) {
          //         console.log(err);
          //         return res
          //           .status(404)
          //           .send({
          //             error:
          //               "You have a slow network connection, please try again ",
          //           });
          //       }
          //     }
          //   );
          // }

          cartOrderObj.forEach(async (element) => {
            await db.buerValidateInsert(
              buyerID,
              element.id,
              1,
              element.sellingPrice,
              package,
              deposit_date,
              "Pending",
              buyerAddress,
              async (err, data) => {
                if (err) {
                  console.log(err);
                  return res.status(404).send({
                    error:
                      "You have a slow network connection, please try again ",
                  });
                }
              }
            );
          });

          await sendAdminReceipt("info@onefarmtech.com", name, cartOrderObj);
          await generatePdf(
            email,
            name,
            cartOrderObj,
            async (errorsP, resP) => {
              if (errorsP) {
                console.log(errorsP);
                return res.status(200).send({
                  msg: "Your payment was successful and you will be contacted within 24 hrs",
                });
              } else {
                return res.status(200).send({
                  msg: "Your payment was successful and you will be contacted within 24 hrs",
                });
              }
            }
          );
        } else {
          await db.buerValidateInsert(
            buyerID,
            product_id,
            1,
            amount,
            package,
            deposit_date,
            "Pending",
            buyerAddress,
            async (err, data) => {
              if (err) {
                console.log(err);
                return res.status(404).send({ error: "Network Error" });
              } else {
                await sendAdminReceipt(
                  "info@onefarmtech.com",
                  name,
                  cartOrderObj
                );
                await generatePdf(
                  email,
                  name,
                  cartOrderObj,
                  async (errsPP, resPP) => {
                    if (errsPP) {
                      return res.status(200).send({
                        msg: "Your payment was successful and you will be contacted within 24 hrs",
                      });
                    } else {
                      return res.status(200).send({
                        msg: "Your payment was successful and you will be contacted within 24 hrs",
                      });
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        return res
          .status(404)
          .send({ error: "You tried to pay invalid Amount !" });
      }
    } else {
      db.buerValidateInsert(
        buyerID,
        product_id,
        1,
        0,
        package,
        deposit_date,
        "Failed Transaction",
        async (err, data) => {
          if (err) {
            console.log(err);
            return res.status(404).send({
              error: "You have a slow network connection, please try again ",
            });
          } else {
            return res.status(200).send({
              msg: "We encoutered error with your card but you will be contacted within 24 hrs",
            });
          }
        }
      );
    }
  });
};

exports.dashboard = (req, res) => {
  let { id } = req.user;
  let totalProduct = 0;
  let pendingOrders = 0;
  let deliveredOrders = 0;

  db.usersDashboard(id, (err, product) => {
    for (var i = 0; i < product.length; i++) {
      totalProduct++;
      if (product[i].status == "pending") pendingOrders++;
      if (product[i].status == "Deliver") deliveredOrders++;
    }

    if (err) {
      console.log(err);
      res.status(400).send({ error: "Network Error" });
    } else {
      // console.log(product)
      res
        .status(200)
        .send({ product, totalProduct, pendingOrders, deliveredOrders });
    }
  });
};

exports.mining = async (req, res) => {
  let userDataInput;

  res.render("mining", { error: req.flash("error"), userDataInput });
};

exports.MiningPlans = (req, res) => {
  let img = "";
  let address = "";
  let userDataInput;

  // console.log(req.params.id)

  let miningCoin = req.params.id.split("$")[0];
  let miningPackage = req.params.id.split("$")[1];
  miningCoin == "Packages"
    ? ((address = "bc1qelgnqynwepx8d930u7esktmzj6x79d69wrsd7s"),
      (img = "/images/btc.jpeg"))
    : ((address = "0x38eD20fe105750EBc2a0bb8a9366f9C540857a25"),
      (img = "/images/eth.jpeg"));
  Packages[miningCoin] === undefined
    ? res.redirect("back")
    : Packages[miningCoin][miningPackage] === undefined
    ? res.redirect("back")
    : res.render("payment", {
        data: Packages[miningCoin][miningPackage],
        miningCoin,
        miningPackage,
        error: req.flash("error"),
        userDataInput,
        address,
        img,
      });
};

exports.paymemtamt = (req, res) => {
  let address = "bc1qelgnqynwepx8d930u7esktmzj6x79d69wrsd7s";
  let img = "/images/btc.jpeg";

  let userDataInput;
  let { package, depositAmt } = req.body;
  if (!req.body.package || !req.body.depositAmt) {
    req.flash("error", "Enter valid amount");
    res.redirect("back");
  } else {
    res.render("finalPayment", {
      data: package,
      depositAmt,
      error: req.flash("error"),
      userDataInput,
      address,
      img,
    });
  }
};

exports.MiningReceipts = async (req, res) => {
  let { name, mimetype, mv } = req.files.receipt;
  let { packages, depositAmount } = req.body;
  let { user_id } = req.user;
  let imagePath = "receiptImg/" + name;
  let userDataInput;

  await db.data(user_id, async (err, result) => {
    if (err) {
      console.log(err);
      imageParams.includes(mimetype)
        ? (mv("public/receiptImg/" + name),
          db.userReceipts(
            imagePath,
            "pending",
            packages,
            depositAmount,
            user_id,
            "",
            (err, result) => {
              err
                ? (req.flash("error", "network error"),
                  res.redirect("/runningPlans"))
                : (req.flash(
                    "error",
                    "Your transaction is under review and will be updated within 24 hrs"
                  ),
                  res.redirect("/runningPlans"));
            }
          ))
        : (req.flash(
            "error",
            "kindly select valid payment receipt and try again"
          ),
          console.log("Verifying body", req.body),
          res.redirect("/runningPlans"));
    } else {
      console.log("USER RESULT", result);
      var ref;
      for (var obj of result) {
        ref = parseInt(obj.ref);
      }
      console.log("REF", ref);
      if (isNaN(ref)) {
        imageParams.includes(mimetype)
          ? (mv("public/receiptImg/" + name),
            db.userReceipts(
              imagePath,
              "pending",
              packages,
              depositAmount,
              user_id,
              "",
              (err, result) => {
                err
                  ? (console.log(err),
                    req.flash("error", "network error"),
                    res.redirect("/runningPlans"))
                  : (req.flash(
                      "error",
                      "Your transaction is under review and will be updated within 24 hrs"
                    ),
                    res.redirect("/runningPlans"));
              }
            ))
          : (req.flash(
              "error",
              "kindly select valid payment receipt and try again"
            ),
            console.log(req.body),
            res.redirect("/runningPlans"));
      } else {
        imageParams.includes(mimetype)
          ? (mv("public/receiptImg/" + name),
            db.userReceipts(
              imagePath,
              "pending",
              packages,
              depositAmount,
              user_id,
              ref,
              (err, result) => {
                err
                  ? (console.log(err),
                    req.flash("error", "network error"),
                    res.redirect("/runningPlans"))
                  : (req.flash(
                      "error",
                      "Your transaction is under review and will be updated within 24 hrs"
                    ),
                    res.redirect("/runningPlans"));
              }
            ))
          : (req.flash(
              "error",
              "kindly select valid payment receipt and try again"
            ),
            res.redirect("/runningPlans"));
      }
    }
  });
};

exports.runningPlans = async (req, res) => {
  let userDataInput;
  await db.selectByOne(
    "receipts",
    "user_id",
    req.user.user_id,
    (err, result) => {
      if (err) {
        req.flash("error", "network error");
        res.redirect("back");
      } else {
        let { running, pending } = packagesPlans(result);
        console.log(running);
        res.render("tables", {
          error: req.flash("error"),
          running,
          pending,
          userDataInput,
        });
      }
    }
  );
};

exports.withdrawal = async (req, res) => {
  await db.userPackage(req.user.user_id, (err, result) => {
    if (err) {
      req.flash("error", "network error");
      res.redirect("back");
    } else {
      let { running, runningTotalAmt } = packagesPlans(result);
      let { outPut } = validateWithdrawalRequest(running);

      res.render("withdrawal", { outPut, error: req.flash("error") });
    }
  });
};

exports.withdrawalUpdate = async (req, res) => {
  let { id, userID, roi, deposit } = req.params;
  let parsedROI = parseInt(roi);
  let parsedDeposit = parseInt(deposit);
  let profit = parsedROI - parsedDeposit;
  console.log("PROFIT GOING TO THE DETABLE", profit);

  await sql.query(
    "UPDATE receipts SET roi = ? WHERE id=? AND user_id=?",
    [profit, parseInt(id), parseInt(userID)],
    async (err, result) => {
      if (err) {
        req.flash("error", "network error");
        res.redirect("back");
      } else {
        res.render("finalWithdraw", {
          receiptID: id,
          roi,
          profit,
          error: req.flash("error"),
          success: req.flash("success"),
        });
      }
    }
  );
};

exports.withdrawalRequest = async (req, res) => {
  console.log(req.body);
  let { wallet, roi, receiptID } = req.body;

  await sql.query(
    "SELECT roi, withdraw_req FROM receipts WHERE id=? AND user_id=?",
    [parseInt(receiptID), req.user.user_id],
    async (err, result) => {
      if (err) {
        console.log(err);
        req.flash("error", "network error");
        res.redirect("back");
      } else {
        let roiDB, withdraw_reqDB;
        for (var obj of result) {
          roiDB = parseInt(result[0].roi);
          withdraw_reqDB = parseInt(result[0].withdraw_req);
        }
        let compareRoi = roiDB - withdraw_reqDB;
        console.log("COMPARE TOTAL AMOUNT ", compareRoi);
        if (parseInt(roi) > compareRoi) {
          req.flash(
            "error",
            "Your total withdraw must be less than or equal to your return of investment (ROI)"
          );
          res.redirect("back");
        } else {
          await db.withdrawalRequest(
            wallet,
            req.user.user_id,
            roi,
            parseInt(receiptID),
            (err, result) => {
              if (err) {
                req.flash("error", "network error");
                res.redirect("back");
              } else {
                req.flash(
                  "error",
                  "Your request has been receive, it will be processed within 24hrs"
                );
                res.redirect("/withdrawal");
              }
            }
          );
        }
      }
    }
  );
};

exports.DeletePlan = (req, res) => {
  const { id } = req.params;
  db.deletePlan(id, req.user.user_id, (err, output) => {
    err
      ? (req.flash("error", "network error"), res.redirect("back"))
      : (req.flash("error", "Plan Deleted Successfully"), res.redirect("back"));
  });
};

exports.setting = (req, res) => {
  res.render("setting", {
    error: req.flash("error"),
    success: req.flash("success"),
  });
};

exports.changePassword = async (req, res) => {
  let { user_id } = req.user;
  let { email, password, newPassword } = req.body;

  const encryptedPassword = await bcrypt.hash(newPassword, saltRounds);

  await db.emailPasswordValidate(email, user_id, async (err, result) => {
    if (err)
      return req.flash("error", "Incorrect details"), res.redirect("back");
    else {
      if (result.length > 0) {
        const hash = result[0].password.toString();
        bcrypt.compare(password, hash, async function (err, response) {
          if (response === true) {
            await db.updatePassword(
              encryptedPassword,
              user_id,
              (err, outcome) => {
                err
                  ? (req.flash("error", "Network Error"), res.redirect("back"))
                  : (req.flash("success", "Password changed successfuly"),
                    res.redirect("back"));
              }
            );
          } else {
            return (
              req.flash("error", "Incorrect Password"), res.redirect("back")
            );
          }
        });
      } else return req.flash("error", "Incorrect Email"), res.redirect("back");
    }
  });
};

exports.contactSubmit = async (req, res) => {
  // console.log("____________________________")
  // console.log(req.body)
  await db.contact(req.body, (err, result) => {
    err
      ? (req.flash("error", "Network Error"), res.redirect("back"))
      : (req.flash("error", "Message sent successfuly"), res.redirect("back"));
  });
};

exports.resetPassword = async (req, res) => {
  let otp;
  console.log(req.body);

  await db.forgetPassword(req.body.email, async (err, data) => {
    if (err) {
      req.flash("error", "Email does not exist");
      res.redirect("back");
    } else if (data.length == 0) {
      req.flash("error", "Email does not exist");
      res.redirect("back");
    } else {
      let { email, id } = data;
      otp = Math.round(Math.random() * 100000000);
      db.updateOtp(id, otp, async (err, result) => {
        // console.log("LINE 175 ", result)
        if (err) {
          req.flash("error", "Network Error, try again");
          res.redirect("back");
        } else {
          console.log(otp);
          await sendOtp(email, otp, (err, respoObj) => {
            if (err)
              return (
                req.flash("error", "Network Error, try again"),
                res.redirect("back")
              );
            else
              return res.render("otp", {
                id,
                error: req.flash("error"),
                success: req.flash("success"),
                isAuthenticated: req.isAuthenticated() && req.user.user_id,
              });
          });
        }
      });
    }
  });
};

exports.resetPasswordOtpCode = async (req, res) => {
  let { id, otp } = req.body;
  let parsedID = parseInt(id);
  let parsedOTP = parseInt(otp);
  console.log(req.body, "Ddd");
  db.getOtpVerifications(parsedID, (err, data) => {
    if (err) {
      req.flash("error", "Network Error, Try Again");
      res.render("otp", {
        id,
        error: req.flash("error"),
        success: req.flash("success"),
        isAuthenticated: req.isAuthenticated() && req.user.user_id,
      });
    } else if (data.username == parsedOTP) {
      req.flash("success", "Enter new password");
      res.render("newPassword", {
        id,
        error: req.flash("error"),
        success: req.flash("success"),
        isAuthenticated: req.isAuthenticated() && req.user.user_id,
      });
    } else {
      req.flash("error", "The OTP code you entered is Incorrect");
      res.render("otp", {
        id,
        error: req.flash("error"),
        success: req.flash("success"),
        isAuthenticated: req.isAuthenticated() && req.user.user_id,
      });
    }
  });
};

exports.newPassword = async (req, res) => {
  let hashPassword;
  let { id, password } = req.body;
  console.log(password);
  let parsedID = parseInt(id);

  if (password !== "" || ("" && id)) {
    await bcrypt.hash(password, saltRounds, function (err, hash) {
      hashPassword = hash;
      if (err) {
        req.flash("error", "Network Error");
        res.redirect("back");
      } else {
        db.resetConfirmedPassword(parsedID, hashPassword, (err, data) => {
          if (err) {
            req.flash("error", "Network Error");
            res.redirect("back");
          } else {
            req.flash("success", "Password reset successfully");
            res.redirect("/login");
          }
        });
      }
    });
  } else {
    req.flash("error", "YOUR ENTERED INVALID INPUTS");
    res.render("newPassword", {
      id,
      error: req.flash("error"),
      success: req.flash("success"),
      isAuthenticated: req.isAuthenticated() && req.user.user_id,
    });
  }
};

const RegisterAdmin = async (req, res) => {
  const password = "admin@gmail.com";
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  let userInfo = {
    email: "admin@gmail.com",
    first_name: "Main",
    last_name: "Admin",
    password: encryptedPassword,
    number: 1,
    address: "Lagos Nigeria",
    isSuperAdmin: true,
    repeat_password: password,
  };
  await db.createAdmin(userInfo, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Admin created");
    }
  });
};

// RegisterAdmin()
