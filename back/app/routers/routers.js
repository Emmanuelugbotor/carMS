require("../utils/passport");
const passport = require("passport");
const usersRoutes = require("../controllers/user.controller");
const adminRoutes = require("../controllers/admin.controller");
const { autheticationMiddleware, adminMiddleWare } = require("../utils/auth");
const { usersAuthRoutes, adminAuthRoutes } = require("../utils/auth");
const { isAuth } = require("../utils/token");
const nodemailer = require("nodemailer");

const Routers = (app) => {
  return (routers = (paths, filename) => {
    app.get("/", (req, res) =>
      res.status(200).send({ msg: "Server working properly" })
    );
    app.get("/readAll/:id/:db", isAuth, usersRoutes.readAll);
    app.get("/readcarrecord/:id", isAuth, usersRoutes.readCarRecord);
    app.get("/getmanagers", isAuth, usersRoutes.ReadProduct);
    app.get("/getadmin", isAuth, usersRoutes.getadmin);

    app.post("/superadmin", usersRoutes.CscAdmin);
    app.post("/addmanager", isAuth, usersRoutes.addmanager);
    app.post("/addCars", isAuth, usersRoutes.addCars);
    app.post("/addworkers", isAuth, usersRoutes.addWorkers);
    app.post("/addServices", isAuth, usersRoutes.addServices);
    app.post("/addExpenses", isAuth, usersRoutes.addExpenses);
    app.post("/addcustomers", isAuth, usersRoutes.addCustomers);
    app.post("/addcarrecords", isAuth, usersRoutes.addCarRecord);
    app.post("/addManagerToBranch", isAuth, usersRoutes.addManagerToBranch);
    app.post("/editAll/:id/:db", isAuth, usersRoutes.editAll);
    app.post("/changePic/:id/:db", isAuth, usersRoutes.changePic);

    app.get("/deletemanager/:id", isAuth, usersRoutes.deleteManager);
    app.get("/deleteAdmin/:id", isAuth, usersRoutes.deleteAdmin);
    app.get("/deleteothers/:id/:mid/:dbName", isAuth, usersRoutes.deleteothers);

    app.post("/register", usersRoutes.RegisterUser);
    app.post("/login", usersRoutes.LoginUser);
    app.post("/orders", isAuth, usersRoutes.buyerCheckout);
    app.post("/addResult", isAuth, usersRoutes.addResult);
    app.post("/addsection", isAuth, usersRoutes.addsection);
    app.get("/getPgResult", isAuth, usersRoutes.getPgResult);
    app.post("/sectionData", isAuth, usersRoutes.sectionData);

    app.post("/resetPassword", usersRoutes.resetPassword);
    app.post("/resetPasswordOtpCode", usersRoutes.resetPasswordOtpCode);
    app.post("/newPassword", usersRoutes.newPassword);
    app.post("/contactSubmit", usersRoutes.contactSubmit);
    app.get("/refID/:ref", (req, res) => res.redirect("/"));

    app.get(paths, (req, res) =>
      res.render(filename, {
        error: req.flash("error"),
        success: req.flash("success"),
        isAuthenticated: req.isAuthenticated() && req.user.user_id,
      })
    );
    app.post(
      "/MainAdminLogin",
      passport.authenticate("admin", {
        successRedirect: "/adminDashboard",
        failureRedirect: "/adminlogin",
        failureFlash: true,
        successFlash: true,
      })
    );

    app.post("/subscribe", async (req, res) => {
      console.log("_________----------------", req.body);
      let { email } = req.body;

      let message =
        `<center>` +
        `<img src="http://coolpub2.coolinc.com.sa:3001/_next/static/image/assest/images/logblack.50aa9858569f6fbb96d792aff5fe8eae.png" height="100px" style="margin-bottom: -35px; height:100px; width:100px;" />` +
        `<div style="border-top-color: #26a69a; width: 100%; margin: 20; padding: 10; border-width: thick; border-style: outset;">` +
        `<h1 style="font-family:Arial, Helvetica, sans-serif ;">` +
        "Successful Subscription" +
        `</h1>` +
        `<div style="text-align: left; padding: 20px;">` +
        `<p>` +
        `<b>` +
        "Thanks for subscribing to our newsletters" +
        `</b>` +
        `</p>` +
        ` <p>` +
        "We have detected a request to add your email to our newsletter database." +
        ` </p>` +
        `<p>` +
        "Thanks for your warm gesture, let's stay in touch and make the world a better place" +
        `</p>` +
        `</div>` +
        `<div style="background-color: #f2f2f2; height: 40px; text-align: center;">` +
        `<p style="padding: 10px;">` +
        `</p>` +
        `</div>` +
        `<div style="text-align: left; padding: 20px;">` +
        `<h3>` +
        "That wasn't me ?" +
        `</h3>` +
        "If the above request attempt wasn't you, kindly unsubscribe here." +
        `</div>` +
        `</div>` +
        `</center>`;

      var mailOption = {
        from: `COOL INC info@onefarmtech.com`,
        to: `${email}`,
        subject: `Newsletters`,
        html: message,
      };

      var transporter = nodemailer.createTransport({
        host: `onefarmtech.com`,
        port: 465,
        secure: true,
        auth: {
          user: `info@onefarmtech.com`,
          pass: `info@onefarmtech.com`,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail(mailOption, async (error, info) => {
        if (!error) {
          console.log("otp code  receiptssssss. SENT");
          res.status(200).send({ msg: "Successful subscription " });
          return;
        } else {
          console.log("Error occured while sending otp code", error);
          res.status(400).send({ error: "Server Error " });
        }
      });
    });
  });
};

const userAuthRouters = (app) =>
  (routers = (paths, filename) =>
    usersAuthRoutes(app)(paths, isAuth, usersRoutes[filename]));
const adminAuthRouter = (app) =>
  (routers = (paths, filename) =>
    adminAuthRoutes(app)(paths, adminMiddleWare, adminRoutes[filename]));

module.exports = (app) => {
  Routers(app)("/", "index");
  Routers(app)("/adminlogin", "mainAdminLogin");

  userAuthRouters(app)("/orders", "buyerCheckout", usersRoutes);
  userAuthRouters(app)("/dashboard", "dashboard", usersRoutes);
  userAuthRouters(app)("/usersEditEmail", "usersEditEmail", usersRoutes);
  userAuthRouters(app)("/usersEditPass", "usersEditPass", usersRoutes);
  userAuthRouters(app)("/changedetails", "changedetails", usersRoutes);
  userAuthRouters(app)("/resetEmail", "resetEmail", usersRoutes);
  userAuthRouters(app)("/resetPass", "resetPass", usersRoutes);

  userAuthRouters(app)("/logout", "logout", usersRoutes);
  userAuthRouters(app)("/setting", "setting", usersRoutes);
  userAuthRouters(app)("/mining/:id", "MiningPlans", usersRoutes);
  userAuthRouters(app)("/paymemtamt", "paymemtamt", usersRoutes);
  userAuthRouters(app)("/runningPlans", "runningPlans", usersRoutes);
  userAuthRouters(app)("/removeplan/:id", "DeletePlan", usersRoutes);
  userAuthRouters(app)("/withdrawal", "withdrawal", usersRoutes);
  userAuthRouters(app)("/finalPayment", "MiningReceipts", usersRoutes);
  userAuthRouters(app)("/withdrawalRequest", "withdrawalRequest", usersRoutes);
  userAuthRouters(app)("/changePassword", "changePassword", usersRoutes);
  userAuthRouters(app)(
    "/withdrawalUpdate/:id/:userID/:roi/:deposit",
    "withdrawalUpdate",
    usersRoutes
  );

  adminAuthRouter(app)("/product", "product", adminRoutes);
  adminAuthRouter(app)("/MainAdminLogout", "logout", adminRoutes);
  adminAuthRouter(app)("/adminDashboard", "adminDashboard", adminRoutes);
  adminAuthRouter(app)("/admin/:paths", "productsAndOrders", adminRoutes);
  adminAuthRouter(app)(
    "/adminProfileSettings",
    "adminProfileSettings",
    adminRoutes
  );
  adminAuthRouter(app)(
    "/adminDeleteUser/:id",
    "adminDeleteUserWithID",
    adminRoutes
  );
  adminAuthRouter(app)("/addDelivery", "deliveryStatus", adminRoutes);
  adminAuthRouter(app)(
    "/adminDeleteProduct/:dbTable/:formID/:userID",
    "adminDeleteProduct",
    adminRoutes
  );
  adminAuthRouter(app)("/editPrice/:customerId", "update", adminRoutes);

  adminAuthRouter(app)("/removeuser/:id", "removeUser", adminRoutes);
  adminAuthRouter(app)("/removemsg/:id", "removemsg", adminRoutes);
  adminAuthRouter(app)(
    "/approveplan/:receiptID/:userID/:packageplan",
    "approveplan",
    adminRoutes
  );
  adminAuthRouter(app)(
    "/deletePlans/:planID/:userID",
    "deletePlans",
    adminRoutes
  );
  adminAuthRouter(app)(
    "/deleteApprovedWithdrawal/:planID/:userID",
    "deleteApprovedWithdrawal",
    adminRoutes
  );
  adminAuthRouter(app)(
    "/approvedWithdrawal/:username/:email/:wallet/:roi/:receiptID/:user_id",
    "approvedWithdrawal",
    adminRoutes
  );
  adminAuthRouter(app)("/adminChangePassword", "changePassword", adminRoutes);
};
