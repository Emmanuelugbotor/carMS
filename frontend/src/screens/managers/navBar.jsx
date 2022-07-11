import { Link, useHistory } from "react-router-dom";
import { signOut } from "../redux/actions/usersAction";
import ManagersModal from "../utils/addManagers";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import url from "../constant/url";
import {
  AddServices,
  AddEmployer,
  AddCustomers,
  AddSales,
  AddExpenses,
  AddManager,
} from "../utils/addAll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { managersModalState } from "../utils/algorithms";

const NavBar = ({
  successMsg,
  remountParent,
  state,
  submitServicesData,
  submitWorkerData,
  submitCustomerData,
  submitSalesData,
  showTable,
  reservedServices,
  reservedWorkers,
  submitCarExpenses,
  submitManager,
  branchesArr,
}) => {
  let history = useHistory();

  const dispatch = useDispatch();
  let userSignin = useSelector((state) => state.userSignIn);

  const { userInfo } = userSignin;
  const [sections, setSection] = useState([]);
  const [managerShow, setManagerFormShow] = useState(false);
  const [addServicesShow, setAddService] = useState(false);
  const [addEmpShow, setAddEmpShow] = useState(false);
  const [addCustomShow, setAddCustm] = useState(false);
  const [addSalesShow, setAddSaleShow] = useState(false);
  const [addExpShow, setExpenShow] = useState(false);
  const [addManagerShow, setManagerShow] = useState(false);

  const student = useSelector((state) => state.student);
  const [msg, setMsg] = useState(null);

  // const managersModalState = (showState, value) => showState(value);

  const addManager = (dataBody) => {
    // console.log("manager branch ", dataBody);

    axios
      .post(
        `${url}addmanager`,
        { ...dataBody },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((res) => {
        toast(`${res.data.msg}`);
        setMsg(`${res.data.msg}`);
        remountParent("success");
      })
      .catch((error) => {
        console.log(error);
        toast(`${error?.response?.data?.error}`);
      });
  };

  const logOut = () => {
    dispatch(signOut());
    history.push("/adminlogin");
  };

  const getSection = (managerID) =>
    history.push(`/manager/${managerID.id}`, { manager: managerID });

  useEffect(() => {
    axios
      .get(`${url}getmanagers`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => {
        setSection(res.data.items);
      });
  }, [dispatch, successMsg, msg, student, state]);

  return (
    <>
      <div className="navbar-bg"></div>
      <ToastContainer />

      <nav className="navbar navbar-expand-lg main-navbar">
        <ul className="navbar-nav navbar-right">
          <li className="dropdown">
            <a
              style={{ cursor: "pointer" }}
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg nav-link-user"
            >
              {/* <img
                alt="image"
                src="/assets/img/avatar/avatar-1.png"
                className="rounded-circle mr-1"
              /> */}
              <div className="d-sm-none d-lg-inline-block">Hi, Admin</div>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-title">Logged in 5 min ago</div>

              {/* <a className="dropdown-item has-icon">
                <ManagersModal
                  handleShow={() =>
                    managersModalState(setManagerFormShow, true)
                  }
                  show={managerShow}
                  handleClose={() =>
                    managersModalState(setManagerFormShow, false)
                  }
                  user={userInfo}
                  addManager={addManager}
                />
              </a> */}
              <div className="dropdown-divider"></div>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => logOut()}
                className="dropdown-item has-icon text-danger"
              >
                {/* <i className="fas fa-sign-out-alt"></i> */}

                <Button variant="primary"> Logout Session </Button>
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <div className="main-sidebar sidebar-style-3">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <a
              href={`${
                userInfo && userInfo.isSupperAdmin == true
                  ? "/admindashboard"
                  : "#"
              } `}
            >
              GREENCAR WASH
            </a>
          </div>
          <div className="sidebar-brand sidebar-brand-sm">
            <a hreSf="index-2.html">CP</a>
          </div>
          <ul className="sidebar-menu">
            {userInfo && userInfo.isSupperAdmin == true && (
              <>
                <div
                  className="nav-link"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <ManagersModal
                    handleShow={() =>
                      managersModalState(setManagerFormShow, true)
                    }
                    show={managerShow}
                    handleClose={() =>
                      managersModalState(setManagerFormShow, false)
                    }
                    user={userInfo}
                    addManager={addManager}
                  />
                </div>
                <li className="menu-header">DASHBOARD</li>
                <li className="dropdown active">
                  <a hrefs="#" className="nav-link has-dropdown">
                    <i className="fas fa-fire"></i>
                    <span>BRANCHES</span>
                  </a>
                  <ul className="dropdown-menu">
                    {sections && sections
                      ? sections.map((items) => {
                          return (
                            <li className="active">
                              <a
                                href={`/manager/${items.id}`}
                                onClick={() => getSection(items)}
                                className="nav-link w-100 bg-primary text-white"
                              >
                                {items.name}
                              </a>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </li>
              </>
            )}
            {state && state?.manager ? (
              <>
                <li className="menu-header">Quick Link</li>
                <div
                  className="nav-link"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <AddSales
                    handleShow={() => managersModalState(setAddSaleShow, true)}
                    handleClose={() =>
                      managersModalState(setAddSaleShow, false)
                    }
                    show={addSalesShow}
                    title="Enter Car Washed"
                    state={state}
                    submitSalesData={submitSalesData}
                  />
                </div>

                <li className="dropdown">
                  <a
                    hrefs="#"
                    className="nav-link has-dropdown"
                    data-toggle="dropdown"
                  >
                    <i className="fas fa-columns"></i> <span>SERVICES</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="nav-link" style={{ textAlign: "center" }}>
                        <AddServices
                          show={addServicesShow}
                          handleClose={() =>
                            managersModalState(setAddService, false)
                          }
                          handleShow={() =>
                            managersModalState(setAddService, true)
                          }
                          addServiceHandler={submitServicesData}
                        />
                      </div>

                      <div
                        className="nav-link"
                        style={{ textAlign: "center" }}
                        onClick={() => showTable("services")}
                      >
                        <Button variant="primary">View Services</Button>
                      </div>
                    </li>
                  </ul>
                </li>

                <li className="dropdowns">
                  <a
                    hrefs="#"
                    className="nav-link has-dropdown"
                    data-toggle="dropdowns"
                  >
                    <i className="fas fa-columns"></i> <span> EMPLOYEES </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="nav-link" style={{ textAlign: "center" }}>
                        <AddEmployer
                          show={addEmpShow}
                          handleClose={() =>
                            managersModalState(setAddEmpShow, false)
                          }
                          handleShow={() =>
                            managersModalState(setAddEmpShow, true)
                          }
                          submitWorkerData={submitWorkerData}
                          state={state}
                        />
                      </div>

                      <div
                        className="nav-link"
                        onClick={() => showTable("employee")}
                        style={{ textAlign: "center" }}
                      >
                        <Button variant="primary"> View Employee</Button>
                      </div>
                    </li>
                  </ul>
                </li>

                <li className="customers">
                  <a
                    hrefs="#"
                    className="nav-link has-dropdown"
                    data-toggle="customers"
                  >
                    <i className="fas fa-columns"></i> <span> CUSTOMERS </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div style={{ textAlign: "center" }} className="nav-link">
                        <AddCustomers
                          handleShow={() =>
                            managersModalState(setAddCustm, true)
                          }
                          handleClose={() =>
                            managersModalState(setAddCustm, false)
                          }
                          show={addCustomShow}
                          submitWorkerData={submitCustomerData}
                          managerid={state.manager.id}
                        />
                      </div>

                      <div
                        className="nav-link"
                        onClick={() => showTable("customers")}
                        style={{ textAlign: "center" }}
                      >
                        <Button variant="primary"> View Customer</Button>
                      </div>
                    </li>
                  </ul>
                </li>

                <li className="sales">
                  <a
                    hrefs="#"
                    className="nav-link has-dropdown"
                    data-toggle="sales"
                  >
                    <i className="fas fa-columns"></i> <span> SALES </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div style={{ textAlign: "center" }} className="nav-link">
                        <AddSales
                          handleShow={() =>
                            managersModalState(setAddSaleShow, true)
                          }
                          handleClose={() =>
                            managersModalState(setAddSaleShow, false)
                          }
                          show={addSalesShow}
                          reservedServices={reservedServices}
                          reservedWorkers={reservedWorkers}
                          title="Create Sales"
                          submitSalesData={submitSalesData}
                        />
                      </div>

                      <div
                        className="nav-link"
                        onClick={() => showTable("sales")}
                        style={{ textAlign: "center" }}
                      >
                        <Button variant="primary"> View Sales</Button>
                      </div>
                    </li>
                  </ul>
                </li>

                <li className="expenses">
                  <a
                    hrefs="#"
                    className="nav-link has-dropdown"
                    data-toggle="expenses"
                  >
                    <i className="fas fa-columns"></i> <span> EXPENSES </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div style={{ textAlign: "center" }} className="nav-link">
                        <AddExpenses
                          handleShow={() =>
                            managersModalState(setExpenShow, true)
                          }
                          handleClose={() =>
                            managersModalState(setExpenShow, false)
                          }
                          show={addExpShow}
                          submitCarExpenses={submitCarExpenses}
                        />
                      </div>

                      <div
                        className="nav-link"
                        onClick={() => showTable("expenses")}
                        style={{ textAlign: "center" }}
                      >
                        <Button variant="primary"> View Expenses</Button>
                      </div>
                    </li>
                  </ul>
                </li>
                {userInfo && userInfo.isSupperAdmin == true && (
                  <>
                    <li className="report">
                      <a
                        hrefs="#"
                        className="nav-link has-dropdown"
                        data-toggle="report"
                      >
                        <i className="fas fa-columns"></i>{" "}
                        <span> DAILY REPORT </span>
                      </a>

                      <ul className="dropdown-menu">
                        <li>
                          <div
                            className="nav-link"
                            // onClick={() => showTable("sales")}
                            style={{ textAlign: "center" }}
                          >
                            <Button variant="primary">
                              {" "}
                              Customers Feedback{" "}
                            </Button>
                          </div>

                          <div
                            className="nav-link"
                            onClick={() => showTable("dailyCustomerRecord")}
                            style={{ textAlign: "center" }}
                          >
                            <Button variant="primary"> </Button>
                          </div>
                          {/* <div
                            className="nav-link"
                            onClick={() => showTable("monthlyBirthday")}
                            style={{ textAlign: "center" }}
                          >
                            <Button variant="primary">
                              {" "}
                              Monthly Birthday{" "}
                            </Button>
                          </div> */}
                          <div
                            className="nav-link"
                            onClick={() => showTable("carWashment")}
                            style={{ textAlign: "center" }}
                          >
                            <Button variant="primary">
                              {" "}
                              Car washmen performance{" "}
                            </Button>
                          </div>

                          <div
                            className="nav-link"
                            onClick={() => showTable("dailySalesRecord")}
                            style={{ textAlign: "center" }}
                          >
                            <Button variant="primary"> Sales </Button>
                          </div>

                          <div
                            className="nav-link"
                            onClick={() => showTable("dailyExpensesRecord")}
                            style={{ textAlign: "center" }}
                          >
                            <Button variant="primary"> Expenses </Button>
                          </div>

                          <div
                            className="nav-link"
                            onClick={() => showTable("dailySalaryAdvance")}
                            style={{ textAlign: "center" }}
                          >
                            <Button variant="primary"> Salary Advance </Button>
                          </div>
                        </li>
                      </ul>
                    </li>

                    <li className="settings">
                      <a
                        hrefs="#"
                        className="nav-link has-dropdown"
                        data-toggle="settings"
                      >
                        <i className="fas fa-columns"></i>{" "}
                        <span> SETTINGS </span>
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <div
                            style={{ textAlign: "center" }}
                            className="nav-link"
                          >
                            <AddManager
                              handleShow={() =>
                                managersModalState(setManagerShow, true)
                              }
                              handleClose={() =>
                                managersModalState(setManagerShow, false)
                              }
                              show={addManagerShow}
                              workerList={reservedWorkers}
                              submitManager={submitManager}
                              branchesArr={branchesArr}
                            />
                          </div>
                        </li>
                        <li>
                          <div
                            className="nav-link"
                            onClick={() => showTable("showManagers")}
                            style={{ textAlign: "center" }}
                          >
                            <Button variant="primary"> View Managers </Button>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
                <li className="logout">
                  <a
                    hrefs="#"
                    className="nav-link has-dropdown"
                    data-toggle="logout"
                  >
                    <i className="fas fa-columns"></i> <span> SIGN OUT </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="nav-link"
                        // to="/admindashboard"
                        onClick={() => logOut()}
                      >
                        LOG OUT
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : null}
          </ul>
        </aside>
      </div>
    </>
  );
};

export default NavBar;
