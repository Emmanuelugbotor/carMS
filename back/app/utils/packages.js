exports.routeParams = ["/", "/features", "/faq", "/login", "/register"];

exports.imageParams = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/JPG",
  "image/gif",
];

exports.usersDB = "miningusers";

exports.usersReceiptsDB = "receipts";

exports.withdrawalDB = "withdrawal";

exports.adminDB = "miningadmin";

exports.contactDB = "contact";

/*
Trial package $100-  $999 4% ROI daily for 6 days 
Premium package $1,000-  $19,999 5% ROI daily for 6 days.
Full membership  $20,000- $99,999 6% ROI daily for 6 days 
Diamond package $100,000- $499,999 7% ROI daily for 6 days 
Special Trades $500,000 - No maximum 8% ROI daily for 6 days

number of ref 
*/
exports.Packages = {
  Packages: {
    Trial: {
      Price: 100,
      Price2: 999,
      Duration: "6 days",
      Returns: "4% daily",
    },
    Premium: {
      Price: 1000,
      Price2: 19999,
      Duration: "6 days",
      Returns: "5% daily",
    },
    Full: {
      Price: 20000,
      Price2: 99999,
      Duration: "6 days",
      Returns: "6% daily",
    },

    Diamond: {
      Price: 100000,
      Price2: 499999,
      Duration: "6 days",
      Returns: "7% daily",
    },

    Special: {
      Price: 500000,
      Duration: "6 days",
      Returns: "8% daily",
    },
  },
};

exports.studentDataCounter = async (result) => {
  let pgdCounter = 0;
  let mscCounter = 0;
  let phdCounter = 0;
  let studentCounter = {};
  if (result) {
    await result.forEach((element) => {
      // console.log("sta", element.pgstatus)
      element.pgstatus == "pgd"
        ? pgdCounter++
        : element.pgstatus == "msc"
        ? mscCounter++
        : element.pgstatus == "phd"
        ? phdCounter++
        : null;
    });
    studentCounter = {
      pgdCounter,
      mscCounter,
      phdCounter,
    };
    // console.log(studentCounter);
    return studentCounter;
  }
  return [];
};

exports.filterReqBody = (body) => {
  let result = {};
  Object.entries(body).forEach((el) => {
    if (el[0] !== "") {
      result[el[0]] = el[1];
    }
  });
  return result;
};

let courseData = [
  {
    id: 1,
    sectionid: "2019/2020",
    pgstatus: "pgd",
    coursecode: "csc612",
    coursecredit: "3",
    coursetitle: "Introduction to computer",
    coursedescription:
      "This is the introduction to computer programming language",
    courselecturer: null,
  },
  {
    id: 2,
    sectionid: "2019/2020",
    pgstatus: "phd",
    coursecode: "csc873",
    coursecredit: "3",
    coursetitle: "Computer science",
    coursedescription: "computer science",
    courselecturer: null,
  },
  {
    id: 3,
    sectionid: "2019/2020",
    pgstatus: "msc",
    coursecode: "csc832",
    coursecredit: "4",
    coursetitle: "Master of bigdata",
    coursedescription:
      "This is the introduction to computer programming language",
    courselecturer: null,
  },
  {
    id: 4,
    sectionid: "2019/2020",
    pgstatus: "msc",
    coursecode: "csc811",
    coursecredit: "2",
    coursetitle: "Computer science",
    coursedescription:
      "This is the introduction to computer programming language",
    courselecturer: null,
  },
];

let studentResult = [
  {
    id: 2,
    sectionid: "2019/2020",
    regnumber: "csc/msc/2019/003",
    mscid: 2,
    csc811: 25,
    csc832: 90,
  },
  {
    id: 2,
    sectionid: "2019/2020",
    regnumber: "csc/msc/2019/003",
    mscid: 2,
    csc811: 70,
    csc832: 30,
  },
];
exports.CGPAcalculator = async (studentResult, courseData) => {
  let sumOfCourseCredit = 0;

  if (
    Object.entries(studentResult).length !== 0 &&
    Object.entries(courseData).length !== 0
  ) {
    courseData.forEach(
      (el) => (sumOfCourseCredit += parseInt(el.coursecredit))
    );
    //   studentResult.id = ""
    //   studentResult.mscid ? studentResult.mscid = "" : studentResult.pgdid ? studentResult.pgdid = "" : studentResult.phdid = ""
    //   let obj ={ }
    // Object.entries(studentResult).forEach((items, index)=>{
    //   if(typeof(studentResult[items[0]]) !== "string"){
    //     obj[items[0]] = studentResult[items[0]]
    //   }
    // })

    studentResult.forEach((el, elVal) => {
      courseData.forEach((cu, val) => {
        if (el[cu.coursecode]) {
          if (el[cu.coursecode] >= 70 && el[cu.coursecode] <= 100) {
            el[`${"R" + Object.values(cu.coursecode).join("")}`] =
              el[cu.coursecode];
            el[cu.coursecode] = 5;
          } else if (el[cu.coursecode] >= 60 && el[cu.coursecode] <= 69) {
            el[`${"R" + Object.values(cu.coursecode).join("")}`] =
              el[cu.coursecode];
            el[cu.coursecode] = 4;
          } else if (el[cu.coursecode] >= 50 && el[cu.coursecode] <= 59) {
            el[`${"R" + Object.values(cu.coursecode).join("")}`] =
              el[cu.coursecode];
            el[cu.coursecode] = 3;
          } else if (el[cu.coursecode] >= 45 && el[cu.coursecode] <= 49) {
            el[`${"R" + Object.values(cu.coursecode).join("")}`] =
              el[cu.coursecode];
            el[cu.coursecode] = 2;
          } else if (el[cu.coursecode] >= 40 && el[cu.coursecode] <= 44) {
            el[`${"R" + Object.values(cu.coursecode).join("")}`] =
              el[cu.coursecode];
            el[cu.coursecode] = 1;
          } else {
            el[`${"R" + Object.values(cu.coursecode).join("")}`] =
              el[cu.coursecode];
            el[cu.coursecode] = 0;
          }
        }
      });
    });

    studentResult.forEach((el, elVal) => {
      courseData.forEach((cu, val) => {
        if (el[cu.coursecode]) {
          el[`${Object.values(cu.coursecode).join("") + "gradeScore"}`] =
            el[cu.coursecode];
          el[`${Object.values(cu.coursecode).join("") + "courseUnit"}`] =
            cu.coursecredit;
          el[cu.coursecode] = el[cu.coursecode] * parseInt(cu.coursecredit);
        }
      });
    });

    studentResult.forEach((el, elVal) => {
      let totalGradeScore = 0;
      courseData.forEach((cu, val) => {
        if (el[cu.coursecode]) {
          totalGradeScore += el[cu.coursecode];
        }
      });
      el.totalGradeScore = totalGradeScore;
    });

    studentResult.forEach((el) => {
      let cgpa = el.totalGradeScore / sumOfCourseCredit;
      el.cgpa = cgpa.toPrecision(3);
      el.sumOfCourseCredit = sumOfCourseCredit;
    });
    console.log(studentResult);
    return studentResult;
  } else return {};
};

// CGPAcalculator(studentResult, courseData)

// console.log("PGD" == "pgd")
