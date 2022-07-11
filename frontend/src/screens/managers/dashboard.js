import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import url from "../../constant/url";
import NavBar from "../../components/navBar";
import { WhatsApp } from "@mui/icons-material";
import {
  EditCustomers,
  EditEmployer,
  EditExpenses,
  EditManager,
  EditSales,
  EditServices,
} from "../../utils/addAll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  managersModalState,
  dateFormater,
  openLink,
} from "../../utils/algorithms";
import { removeAll } from "../../redux/actions/usersAction";
import moment from "moment";
import Helmet from "react-helmet";
const Dashboard = (props) => {
  var today = moment(new Date()).format("YYYY-MM-DD");

  let history = useHistory();
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignin;
  const [info, setErrMsg] = useState("");
  const [filterSec, setFilterSec] = useState([]);
  const [carRecordReserved, setcarRecordReserved] = useState([]);

  const [branchesArr, setSection] = useState([]);

  const [allResult, setAllResult] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [reservedWorkers, setWorkerReserved] = useState([]);
  const [services, setServices] = useState([]);
  const [reservedServices, setReservedServices] = useState([]);
  const [managersList, showManagerList] = useState([]);

  const [dailySales, setDailySales] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [dailyNewCustomer, setDailyCustomer] = useState([]);
  const [dailySalary, setDailySalaryAdvance] = useState([]);

  const [expenses, setExpenses] = useState([]);
  const [expensesReserved, setExpensesReserved] = useState([]);

  const [reset, setReset] = useState([]);
  const [managerShow, setAddCardForm] = useState(false);
  const [showWorkers, setAddWorkerForm] = useState(false);
  const [isResultOpen, setResultOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [filterAtrr, setfilterAtrr] = useState("name");
  const [filterCarRecord, setfilterCarRecord] = useState("name");
  const [startDate, setStartDate] = useState(null);
  const [workerParams, setWorkerParams] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [carID, setCardID] = useState(null);
  const [salary, setSalary] = useState(null);
  const [state, setManagerState] = useState(props.location.state);
  const [sections, setCustomers] = useState([]);
  let [counter, setCounter] = useState(0);

  const [editServicesShow, setEditService] = useState(false);
  const [editExpShow, setEditExp] = useState(false);
  const [editEmployerShow, setEditEmployer] = useState(false);
  const [editCustomersShow, setEditCustomersShow] = useState(false);
  const [editSalesShow, setEditSales] = useState(false);
  const [carwashPerfomance, setCarwashPerfomance] = useState([]);

  const [editDat, setEdtServiceData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const managersModalEdit = (showState, value, data) => {
    setEdtServiceData(data);
    showState(value);
    return;
  };

  const managersModalEditHide = (showState, value) => {
    setEdtServiceData([]);
    showState(value);
    return;
  };

  const [tName, setTName] = useState({
    services: false,
    employee: false,
    customers: false,
    sales: false,
    expenses: false,
    dailySalesRecord: false,
    dailyCustomerRecord: false,
    dailyExpensesRecord: false,
    dailySalaryAdvance: false,
    showManagers: false,
    monthlyBirthday: false,
    carwashmen: false,
    phoneList: false,
    bankTransfer: false,
    customersFeedback: false
  });

  const showTable = (tableName) => {
    let altedTableName = tName;
    let alterArray = [...Object.entries(altedTableName).values()];
    alterArray.filter((item) => {
      if (altedTableName[item[0]] != tableName) {
        altedTableName[item[0]] = false;
      }
    });
    altedTableName[tableName] = true;
    setTName(altedTableName);
    setCounter(counter + 1);
    if (tableName === "carwashmen") {
      let arr = [...allResult]
      let combined = {}
      for (let x of arr) {
        if (x.workerid in combined) {
          combined[x.workerid] += 1
        } else {
          combined[x.workerid] = 1
        }
      }
      setCarwashPerfomance(Object.entries(combined).sort((a, b) => a[1] - b[1]).reverse())
    }

  };

  const removeState = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("course");
    localStorage.removeItem("studentInfo");
    localStorage.removeItem("results");
  };

  const filterData = (args, dataToFilter, setArgData, reserved) => {
    let data = dataToFilter.filter((items) =>
      items[filterAtrr]?.toLowerCase()?.includes(args.toLowerCase())
    );
    setArgData(data);
    if (data.length == 0) {
      setArgData(reserved);
    }
    if (!args) {
      setArgData(reserved);
    }
  };

  const searchByDate = (start, end) => {
    var counter = 0;
    let startDATE = moment(start).format("YYYY-MM-DD");
    let endDATE = moment(end).format("YYYY-MM-DD");

    if (!workerParams.length) {
      let refineArr = allResult.filter(
        (items) =>
          moment(items.date).format("YYYY-MM-DD") >= startDATE &&
          moment(items.date).format("YYYY-MM-DD") <= endDATE
      );
      refineArr.forEach((items) => {
        counter += parseInt(items.amount);
      });
      setSalary(counter);
      setAllResult(refineArr);
    } else {
      let refineArr = allResult.filter(
        (items) =>
          moment(items.date).format("YYYY-MM-DD") >= startDATE &&
          moment(items.date).format("YYYY-MM-DD") <= endDATE &&
          items?.firstName.toLowerCase() == workerParams.toLowerCase()
      );
      if (Object.entries(refineArr).length > 0) {
        setAllResult(refineArr);
      } else {
        alert("No Details found, Please click the reset button and try again!");
      }
    }
  };

  const resetStatus = () => {
    if (show == false) {
      setShow(true);
      return;
    }
    if (show == true) {
      setShow(false);
      return;
    }
    setErrMsg(" ");
  };

  const openResultModal = (carid) => {
    setResultOpen(true);
    setCardID(carid);
    return;
  };

  const deleteUser = (deleteURLs, dbName, status) => {
    var id;


    if (
      window.confirm(
        "Are sure you want to do this ?, this delete operation is irreversible!"
      )
    ) {
      toast("processing");
      if (dbName == "admin") {
        axios
          .get(`${url + "deleteAdmin/" + deleteURLs.id}`, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          })
          .then((res) => {
            toast(`${res.data.msg}`);
            setErrMsg(`${res.data.msg}`);
          })
          .catch((error) => {
            toast(`${error?.response?.data?.error}`);
          });
      } else {
        axios
          .get(
            `${url +
            "deleteothers/" +
            deleteURLs.tableID +
            "/" +
            deleteURLs.branchid +
            "/" +
            dbName
            }`,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          )
          .then((res) => {
            toast(`${res.data.msg}`);
            setErrMsg(`${res.data.msg}`);
          })
          .catch((error) => {
            toast(`${error?.response?.data?.error}`);
          });
      }
    } else {
      return null;
    }
  };

  const submitServicesData = async (dataBody) => {
    let body = {
      ...dataBody,
      createdBy: userInfo.id,
      branchid: state?.manager?.id,
      createdAt: moment().format("YYYY-MM-DD"),
    };

    axios
      .post(
        `${url}addServices`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((res) => {
        toast(`${res.data.msg}`);
        setErrMsg(`${res.data.msg}`);
      })
      .catch((error) => {
        toast(`${error?.response?.data?.error}`);
      });
  };

  const editAll = async (dataBody, id, dbTableName) => {
    // let body = {
    //   ...dataBody,
    //   createdBy: userInfo.id,
    //   branchid: state?.manager?.id,
    //   createdAt: moment().format("YYYY-MM-DD"),
    // };

    axios
      .post(
        `${url}editAll/${id}/${dbTableName}`,
        { ...dataBody },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((res) => {
        toast(`${res.data.msg}`);
        setErrMsg(`${res.data.msg}`);
        setCounter(counter + 1);
      })
      .catch((error) => {
        toast(`${error?.response?.data?.error}`);
      });
  };

  const changePic = async (dataBody, id, dbTableName) => {
    axios
      .post(`${url}changePic/${id}/${dbTableName}`, dataBody, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => {
        toast(`${res.data.msg}`);
        setErrMsg(`${res.data.msg}`);
        setCounter(counter + 1);
      })
      .catch((error) => {
        toast(`${error?.response?.data?.error}`);
      });
  };

  const submitWorkerData = async (dataBody) => {
    axios
      .post(`${url}addworkers`, dataBody, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => {
        toast(`${res.data.msg}`);
        setErrMsg(`${res.data.msg}`);
      })
      .catch((error) => {
        toast(`${error?.response?.data?.error}`);
      });
  };

  const submitCustomerData = async (dataBody) => {
    axios
      .post(`${url}addcustomers`, dataBody, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => {
        toast(`${res.data.msg}`);
        setErrMsg(`${res.data.msg}`);
      })
      .catch((error) => {
        toast(`${error?.response?.data?.error}`);
      });
  };

  const submitSalesData = async (data) => {
    let dataBody = {
      ...data,
      branchid: state.manager.id,
      createdBy: userInfo.id,
      createdAt: moment().format("YYYY-MM-DD"),
    };

    axios
      .post(`${url}addcarrecords`, dataBody, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => {
        toast(`${res.data.msg}`);
        setErrMsg(`${res.data.msg}`);
      })
      .catch((error) => {
        toast(`${error?.response?.data?.error}`);
      });
  };

  const submitCarExpenses = async (data) => {
    let dataBody = {
      ...data,
      branchid: state.manager.id,
      createdBy: userInfo.id,
      createdAt: moment().format("YYYY-MM-DD"),
    };

    axios
      .post(
        `${url}addExpenses`,
        { ...dataBody },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((res) => {
        toast(`${res.data.msg}`);
        setErrMsg(`${res.data.msg}`);
      })
      .catch((error) => {
        toast(`${error?.response?.data?.error}`);
      });
  };

  const submitManager = async (data) => {
    let dataBody = {
      ...data,
      // branchid: state.manager.id,
      createdAt: moment().format("YYYY-MM-DD"),
      isSuperAdmin: false,
    };

    axios
      .post(
        `${url}addManagerToBranch`,
        { ...dataBody },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((res) => {
        toast(`${res.data.msg}`);
        setErrMsg(`${res.data.msg}`);
      })
      .catch((error) => {
        toast(`${error?.response?.data?.error}`);
      });
  };

  let dispatchEdit = (element) => {
    // setCounter(counter + 1);
    // setEditService(true);
    setEdtServiceData(element);
  };

  let dispatchEditClose = () => {
    // setCounter(counter + 1);
    setEditService(false);
    setEdtServiceData([]);
  };

  let verifyEdit = (date) => {
    var editedDate = moment(date).format("YYYY-MM-DD");
    // console.log("finding verify edit", userInfo.isSuperAdmin == false);
    if (userInfo && userInfo.isSupperAdmin == false) {
      if (today > editedDate) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    // console.log("state ", state);
    // console.log("allResult ", allResult);
    // console.log("workers ", workers);
    if (userInfo.length <= 0) {
      history.push("/adminlogin");
    }
    // if (userInfo && userInfo.isSupperAdmin == false) {
    //   setCounter(0);
    // }
    else {
      axios
        .get(`${url}readAll/${state?.manager?.id}/cars`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          setCustomers(res.data.items);
          setFilterSec(res.data.items);
          setDailyCustomer(res.data.items);
        })
        .catch((error) => setErrMsg("error occured"));

      axios
        .get(`${url}readAll/${state?.manager?.id}/workers`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          setWorkers(res.data.items);
          setWorkerReserved(res.data.items);
        })
        .catch((error) => {
          setErrMsg("error occured");
        });

      axios
        .get(`${url}getFeedbacks`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          setFeedbacks(res.data.message);

        })
        .catch((error) => {
          setErrMsg("error occured");
        });

      axios
        .get(`${url}readAll/${state?.manager?.id}/services`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          setServices(res.data.items);
          setReservedServices(res.data.items);
          // setcarRecordReserved(res.data.data);
          // setReset(res.data.data);
        })
        .catch((error) => {
          setErrMsg("error occured");
        });

      axios
        .get(`${url}readcarrecord/${state?.manager?.id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          setAllResult(res.data.data);
          setcarRecordReserved(res.data.data);
          setReset(res.data.data);
          setDailySales(res.data.data);
          // console.log(res.data)
        })
        .catch((error) => {
          setErrMsg("error occured");
        });

      axios
        .get(`${url}readAll/${state?.manager?.id}/expenses`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          setExpenses(res.data.items);
          setExpensesReserved(res.data.items);
          setDailyExpenses(res.data.items);
          setDailySalaryAdvance(res.data.items);
        })
        .catch((error) => {
          setErrMsg("error occured");
        });

      axios
        .get(`${url}getmanagers`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          setSection(res.data.items);
        })
        .catch((error) => setErrMsg("error"));

      axios
        .get(`${url}getadmin`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          showManagerList(res.data.items);
        })
        .catch((error) => setErrMsg("error occured"));
    }

    return () => {
      removeState();
      dispatch(removeAll());
      setCounter(0);
      setfilterAtrr("name");
      setEdtServiceData([]);
    };
  }, [state, tName, props.location, counter, info]);

  return (
    <div id="app">
      <Helmet>
        <link
          rel="stylesheet"
          href="/assets/modules/bootstrap/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="/assets/modules/fontawesome/css/all.min.css"
        />

        <link
          rel="stylesheet"
          href="/assets/modules/jqvmap/dist/jqvmap.min.css"
        />
        <link
          rel="stylesheet"
          href="/assets/modules/summernote/summernote-bs4.css"
        />
        <link
          rel="stylesheet"
          href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"
        />
        <link
          rel="stylesheet"
          href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"
        />

        <link rel="stylesheet" href="/assets/css/style.min.css" />
        <link rel="stylesheet" href="/assets/css/components.min.css"></link>
      </Helmet>

      <ToastContainer />

      <div className="main-wrapper main-wrapper-1">
        <NavBar
          state={state}
          props={props}
          submitServicesData={submitServicesData}
          submitWorkerData={submitWorkerData}
          submitCustomerData={submitCustomerData}
          showTable={showTable}
          reservedServices={reservedServices}
          reservedWorkers={reservedWorkers}
          submitSalesData={submitSalesData}
          submitCarExpenses={submitCarExpenses}
          submitManager={submitManager}
          branchesArr={branchesArr}
        />

        <div className="main-content">
          <div className="row row-deck">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>{"MD " + state?.manager?.name + " Record's "}</h4>

                  {/* <div className="card-header-action">
                    <button className="btn btn-success">
                      <AddWorkersAndCar
                        css="fas fa-shopping-bag"
                        handleShow={() =>
                          managersModalState(setAddCardForm, true)
                        }
                        managerid={props.location.state?.manager?.id}
                        user={userInfo}
                        show={managerShow}
                        handleClose={() =>
                          managersModalState(setAddCardForm, false)
                        }
                        hideWorkers={() =>
                          managersModalState(setAddWorkerForm, false)
                        }
                        handleShowWorkers={() =>
                          managersModalState(setAddWorkerForm, true)
                        }
                        showWorkers={showWorkers}
                        showCarRecord={() => resetStatus()}
                        title={
                          show == true
                            ? "Show Cars Record"
                            : "Show Registered Cars"
                        }
                        
                        submitWorkerData={submitWorkerData}
                      />
                    </button>
                  </div> */}
                </div>

                {tName.services == true && (
                  <div className="card-body p-0">
                    <div className="table-responsive table-invoice">
                      {services !== null &&
                        services !== undefined &&
                        services.length > 0 ? (
                        <>
                          <h3 style={{ paddingLeft: "30px" }}>
                            Service Records{" "}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              padding: "20px",
                            }}
                          >
                            <input
                              className="form-control"
                              style={{ padding: "5px" }}
                              id="myInput"
                              type="text"
                              placeholder="search..."
                              onChange={(event) =>
                                filterData(
                                  event.target.value,
                                  services,
                                  setServices,
                                  reservedServices
                                )
                              }
                            />
                            <select
                              className="form-control"
                              onChange={(e) => setfilterAtrr(e.target.value)}
                            >
                              <option> please select</option>
                              <option value={"name"}> name</option>
                              <option value={"type"}> Type </option>
                              <option value={"amt"}> Amount </option>
                              <option value={"createdAt"}> CreatedAt </option>
                              <option value={"desc"}> Desc </option>
                              <option value={"first_name"}>Created By</option>
                            </select>
                          </div>

                          <table className="table table-striped">
                            <tr>
                              <th>Name </th>
                              <th>Type </th>
                              <th>Amount </th>
                              <th>CreatedAt </th>
                              <th>Desc </th>
                              <th>CreatedBy </th>
                              <th>Actions</th>
                            </tr>

                            {services.map((element, index, item) => {
                              return (
                                <tbody id="myTable">
                                  <tr key={index}>
                                    <td className="font-weight-600">
                                      {element.name}
                                    </td>
                                    <td>
                                      <div>{element.type}</div>
                                    </td>
                                    <td>
                                      <div className={"badge badge-success"}>
                                        #{element.amt}
                                      </div>
                                    </td>
                                    <td> {dateFormater(element.createdAt)}</td>

                                    <td> {element.desc}</td>
                                    <td> {element.first_name}</td>

                                    <td key={index}>
                                      <EditServices
                                        key={index}
                                        handleShow={() =>
                                          managersModalEdit(
                                            setEditService,
                                            true,
                                            element
                                          )
                                        }
                                        show={editServicesShow}
                                        handleClose={() =>
                                          managersModalEditHide(
                                            setEditService,
                                            false
                                          )
                                        }
                                        editData={editDat}
                                        editService={editAll}
                                      />

                                      <button
                                        onClick={() =>
                                          deleteUser(element, "services")
                                        }
                                        className="btn btn-danger text-white"
                                      >
                                        <i className={"fas fa-trash"}> </i>
                                      </button>

                                      {/* <button className="btn btn-success text-white">
                                      <i className={"fa fa-whatsapp"}> </i>
                                    </button> */}
                                    </td>

                                    {/* <td>
                                {filterSecData && (
                                  <>
                                    <PGResult
                                      status={status}
                                      handleShow={() =>
                                        openResultModal(
                                          element.pgstatus,
                                          sectionID,
                                          element.name,
                                          element.pgstatus,
                                          element.id,
                                          element.regnumber
                                        )
                                      }
                                      studentName={studentName}
                                      pgid={id}
                                      sectionid={sectionID}
                                      user={userInfo}
                                      handleClose={closeResultModal}
                                      regnumber={regNom}
                                      show={isResultOpen}
                                      courses={pgCours}
                                    />
                                  </>
                                )}
                              </td> */}
                                  </tr>
                                </tbody>
                              );
                            })}

                            {/* <tr>
                          <td>
                            <a >INV-48574</a>
                          </td>
                          <td className="font-weight-600">Susie Willis</td>
                          <td>
                            <div className="badge badge-success">Paid</div>
                          </td>
                          <td>July 21, 2018</td>
                          <td>
                            <a href="#" className="btn btn-primary">
                              Detail
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a href="#">INV-76824</a>
                          </td>
                          <td className="font-weight-600">Muhamad Nuruzzaki</td>
                          <td>
                            <div className="badge badge-warning">Unpaid</div>
                          </td>
                          <td>July 22, 2018</td>
                          <td>
                            <a href="#" className="btn btn-primary">
                              Detail
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a href="#">INV-84990</a>
                          </td>
                          <td className="font-weight-600">Agung Ardiansyah</td>
                          <td>
                            <div className="badge badge-warning">Unpaid</div>
                          </td>
                          <td>July 22, 2018</td>
                          <td>
                            <a href="#" className="btn btn-primary">
                              Detail
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a href="#">INV-87320</a>
                          </td>
                          <td className="font-weight-600">
                            Ardian Rahardiansyah
                          </td>
                          <td>
                            <div className="badge badge-success">Paid</div>
                          </td>
                          <td>July 28, 2018</td>
                          <td>
                            <a href="#" className="btn btn-primary">
                              Detail
                            </a>
                          </td>
                        </tr>
                         */}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}

                {tName.expenses == true && (
                  <div className="card-body p-0">
                    <div className="table-responsive table-invoice">
                      {expenses !== null &&
                        expenses !== undefined &&
                        expenses.length > 0 ? (
                        <>
                          <h3 style={{ paddingLeft: "30px" }}>
                            Expenses Records{" "}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              padding: "20px",
                            }}
                          >
                            <input
                              className="form-control"
                              style={{ padding: "5px" }}
                              id="myInput"
                              type="text"
                              placeholder="search..."
                              onChange={(event) =>
                                filterData(
                                  event.target.value,
                                  expenses,
                                  setExpenses,
                                  expensesReserved
                                )
                              }
                            />
                            <select
                              className="form-control"
                              onChange={(e) => setfilterAtrr(e.target.value)}
                            >
                              <option> please select</option>
                              <option value={"createdAt"}> createdAt</option>
                              <option value={"type"}> Type </option>
                              <option value={"amt"}> Amount </option>
                              <option value={"purpose"}> Purpose </option>
                              <option value={"first_name"}>Created By</option>
                            </select>
                          </div>

                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Type </th>
                                <th>Amount </th>
                                <th>Purpose </th>
                                <th>CreatedAt </th>
                                <th>CreatedBy </th>
                                <th>Actions</th>
                              </tr>
                            </thead>

                            {expenses.map((element, index) => {
                              return (
                                <tbody id="myTable">
                                  <tr key={index}>
                                    {/* <td className="font-weight-600">
                                      {element.name}
                                    </td> */}
                                    <td>
                                      <div>{element.type}</div>
                                    </td>
                                    <td>
                                      <div className={"badge badge-success"}>
                                        #{element.amt}
                                      </div>
                                    </td>
                                    <td> {element.purpose}</td>
                                    <td> {dateFormater(element.createdAt)}</td>
                                    <td> {element.first_name}</td>

                                    <td>
                                      <EditExpenses
                                        handleShow={() =>
                                          managersModalEdit(
                                            setEditExp,
                                            true,
                                            element
                                          )
                                        }
                                        show={editExpShow}
                                        handleClose={() =>
                                          managersModalEditHide(
                                            setEditExp,
                                            false
                                          )
                                        }
                                        editHandler={editAll}
                                        editData={editDat}
                                      />

                                      {/* <button className="btn btn-success text-white">
                                        <i className={"fas fa-edit"}> </i>
                                      </button> */}

                                      <button
                                        onClick={() =>
                                          deleteUser(element, "expenses")
                                        }
                                        className="btn btn-danger text-white"
                                      >
                                        <i className={"fas fa-trash"}> </i>
                                      </button>

                                      {/* <button className="btn btn-success text-white">
                                      <i className={"fa fa-whatsapp"}> </i>
                                    </button> */}
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}

                {tName.dailyExpensesRecord == true && (
                  <div className="card-body p-0">
                    <div className="table-responsive table-invoice">
                      {dailyExpenses !== null &&
                        dailyExpenses !== undefined &&
                        dailyExpenses.length > 0 ? (
                        <>
                          <h3 style={{ paddingLeft: "30px" }}>
                            Daily Expenses Records{" "}
                          </h3>

                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Type </th>
                                <th>Amount </th>
                                <th>Purpose </th>
                                <th>CreatedAt </th>
                                <th>CreatedBy </th>
                              </tr>
                            </thead>

                            {dailyExpenses
                              .filter(
                                (items) =>
                                  moment(items.createdAt).format(
                                    "YYYY-MM-DD"
                                  ) == today
                              )
                              .map((element, index) => {
                                return (
                                  <tbody id="myTable">
                                    <tr key={index}>
                                      {/* <td className="font-weight-600">
                                      {element.name}
                                    </td> */}
                                      <td>
                                        <div>{element.type}</div>
                                      </td>
                                      <td>
                                        <div className={"badge badge-success"}>
                                          #{element.amt}
                                        </div>
                                      </td>
                                      <td> {element.purpose}</td>
                                      <td>
                                        {" "}
                                        {dateFormater(element.createdAt)}
                                      </td>
                                      <td> {element.first_name}</td>
                                    </tr>
                                  </tbody>
                                );
                              })}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}

                {tName.dailySalaryAdvance == true && (
                  <div className="card-body p-0">
                    <div className="table-responsive table-invoice">
                      {dailySalary !== null &&
                        dailySalary !== undefined &&
                        dailySalary.length > 0 ? (
                        <>
                          <h3 style={{ paddingLeft: "30px" }}>
                            Daily Expenses Records{" "}
                          </h3>

                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Type </th>
                                <th>Amount </th>
                                <th>Purpose </th>
                                <th>CreatedAt </th>
                                <th>CreatedBy </th>
                              </tr>
                            </thead>

                            {dailySalary
                              .filter(
                                (items) =>
                                  items?.type?.trim() == "Salary Advance"
                              )
                              .map((element, index) => {
                                return (
                                  <tbody id="myTable">
                                    <tr key={index}>
                                      {/* <td className="font-weight-600">
                                      {element.name}
                                    </td> */}
                                      <td>
                                        <div>{element.type}</div>
                                      </td>
                                      <td>
                                        <div className={"badge badge-success"}>
                                          #{element.amt}
                                        </div>
                                      </td>
                                      <td> {element.purpose}</td>
                                      <td>
                                        {" "}
                                        {dateFormater(element.createdAt)}
                                      </td>
                                      <td> {element.first_name}</td>
                                    </tr>
                                  </tbody>
                                );
                              })}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}

                {tName.customers == true && (
                  <div className="card-body p-0">
                    <h3 style={{ paddingLeft: "30px" }}>Customers Record </h3>
                    <div className="table-responsive table-invoice">
                      {sections !== null &&
                        sections !== undefined &&
                        sections.length > 0 ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              padding: "20px",
                            }}
                          >
                            <input
                              className="form-control"
                              style={{ padding: "5px" }}
                              id="myInput"
                              type="text"
                              placeholder="search..."
                              onChange={(event) =>
                                filterData(
                                  event.target.value,
                                  sections,
                                  setCustomers,
                                  filterSec
                                )
                              }
                            />
                            <select
                              className="form-control"
                              onChange={(e) => setfilterAtrr(e.target.value)}
                            >
                              <option> please select</option>
                              <option value={"name"}> name</option>
                              <option value={"phone"}> phone</option>
                              <option value={"plateid"}> plateid</option>
                              <option value={"brand"}> brand</option>
                              <option value={"color"}> color</option>

                              <option value={"model"}> model</option>
                              <option value={"type"}> type</option>
                              <option value={"dob"}> dob</option>
                              <option value={"gender"}> gender</option>
                              <option value={"note"}> note</option>
                              <option value={"createdAt"}> createdAt</option>
                              <option value={"createdBy"}> createdBy</option>
                            </select>
                          </div>

                          {/* <div
                            style={{
                              display: "flex",
                              paddingLeft: "20px",
                              paddingRight: "20px",
                            }}
                          >
                            <div>
                              <label>Start Date</label>
                              <input
                                className="form-control"
                                style={{ padding: "5px" }}
                                id="myInput"
                                type="date"
                                
                              />
                            </div>

                            <div>
                              <label>End Date</label>

                              <input
                                className="form-control"
                                style={{ padding: "5px" }}
                                id="myInput"
                                type="date"
                                
                              />
                            </div>
                          </div> */}

                          <table className="table table-striped">
                            <tr>
                              <th>pic</th>
                              <th>name</th>
                              <th>phone</th>
                              <th>plateid</th>
                              <th>brand</th>
                              <th>color</th>

                              <th>model</th>
                              <th>type</th>
                              <th>dob</th>
                              <th>gender</th>
                              <th>note</th>
                              <th>createdAt</th>
                              <th>createdBy</th>
                              <th>chat</th>
                              <th colSpan={"2"}>Actions</th>
                            </tr>

                            {sections.map((element) => {
                              return (
                                <tbody id="myTable">
                                  <tr>
                                    <td
                                      className="font-weight-600"
                                      style={{
                                        padding: "0px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {element.pic && (
                                        <img
                                          // className="rounded-circle mr-1"
                                          style={{
                                            width: "100%",
                                            // height: "100%",
                                          }}
                                          src={url + element.pic}
                                        />
                                      )}
                                    </td>
                                    <td>{element.name}</td>
                                    <td> {element.phone} </td>
                                    <td>
                                      {" "}
                                      <div className={"badge badge-success"}>
                                        {" "}
                                        {element.plateid}{" "}
                                      </div>
                                    </td>
                                    <td> {element.brand} </td>
                                    <td> {element.color} </td>
                                    <td> {element.model} </td>
                                    <td> {element.type} </td>
                                    <td> {element.dob} </td>
                                    <td> {element.gender} </td>
                                    <td> {element.note} </td>
                                    <td>{dateFormater(element.createdAt)}</td>
                                    <td> {element.first_name} </td>
                                    <td>
                                      {element.phone && (
                                        <small
                                          onClick={() =>
                                            openLink(
                                              `https://wa.me/${element.phone}`
                                            )
                                          }
                                          className="btn btn-success text-white"
                                        >
                                          {/* <a
                                            style={{
                                              textDecoration: "none",
                                              color: "white",
                                            }}
                                            href={`https://wa.me/${element.phone}`}
                                          > */}
                                          <WhatsApp />
                                          {/* </a> */}
                                        </small>
                                      )}
                                    </td>

                                    <td style={{ padding: "0px" }}>
                                      {/* <AddCarRecords
                                          handleShow={() =>
                                            openResultModal(element.id)
                                          }
                                          managerid={state?.manager?.id}
                                          handleClose={closeResultModal}
                                          show={isResultOpen}
                                          carid={carID}
                                          workerList={workers}
                                          user={userInfo}
                                          submitCarRecords={submitCarRecords}
                                        /> */}

                                      <EditCustomers
                                        handleShow={() =>
                                          managersModalEdit(
                                            setEditCustomersShow,
                                            true,
                                            element
                                          )
                                        }
                                        show={editCustomersShow}
                                        handleClose={() =>
                                          managersModalEditHide(
                                            setEditCustomersShow,
                                            false
                                          )
                                        }
                                        editHandler={editAll}
                                        changePic={changePic}
                                        editData={editDat}
                                      />

                                      <span
                                        onClick={() =>
                                          deleteUser(element, "cars")
                                        }
                                        className="btn btn-danger text-white"
                                      >
                                        <i className={"fas fa-trash"}> </i>
                                      </span>
                                    </td>

                                    {/* <td>
                                {filterSecData && (
                                  <>
                                    <PGResult
                                      status={status}
                                      handleShow={() =>
                                        openResultModal(
                                          element.pgstatus,
                                          sectionID,
                                          element.name,
                                          element.pgstatus,
                                          element.id,
                                          element.regnumber
                                        )
                                      }
                                      studentName={studentName}
                                      pgid={id}
                                      sectionid={sectionID}
                                      user={userInfo}
                                      handleClose={closeResultModal}
                                      regnumber={regNom}
                                      show={isResultOpen}
                                      courses={pgCours}
                                    />
                                  </>
                                )}
                              </td> */}
                                  </tr>
                                </tbody>
                              );
                            })}

                            {/* <tr>
                          <td>
                            <a >INV-48574</a>
                          </td>
                          <td className="font-weight-600">Susie Willis</td>
                          <td>
                            <div className="badge badge-success">Paid</div>
                          </td>
                          <td>July 21, 2018</td>
                          <td>
                            <a href="#" className="btn btn-primary">
                              Detail
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a href="#">INV-76824</a>
                          </td>
                          <td className="font-weight-600">Muhamad Nuruzzaki</td>
                          <td>
                            <div className="badge badge-warning">Unpaid</div>
                          </td>
                          <td>July 22, 2018</td>
                          <td>
                            <a href="#" className="btn btn-primary">
                              Detail
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a href="#">INV-84990</a>
                          </td>
                          <td className="font-weight-600">Agung Ardiansyah</td>
                          <td>
                            <div className="badge badge-warning">Unpaid</div>
                          </td>
                          <td>July 22, 2018</td>
                          <td>
                            <a href="#" className="btn btn-primary">
                              Detail
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <a href="#">INV-87320</a>
                          </td>
                          <td className="font-weight-600">
                            Ardian Rahardiansyah
                          </td>
                          <td>
                            <div className="badge badge-success">Paid</div>
                          </td>
                          <td>July 28, 2018</td>
                          <td>
                            <a href="#" className="btn btn-primary">
                              Detail
                            </a>
                          </td>
                        </tr>
                         */}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}

                {tName.dailyCustomerRecord == true && (
                  <div className="card-body p-0">
                    <h3 style={{ paddingLeft: "30px" }}>
                      Daily New Customers' Record{" "}
                    </h3>
                    <div className="table-responsive table-invoice">
                      {dailyNewCustomer !== null &&
                        dailyNewCustomer !== undefined &&
                        dailyNewCustomer.length > 0 ? (
                        <>
                          <table className="table table-striped">
                            <tr>
                              <th>pic</th>
                              <th>name</th>
                              <th>phone</th>
                              <th>plateid</th>
                              <th>brand</th>
                              <th>color</th>

                              <th>model</th>
                              <th>type</th>
                              <th>dob</th>
                              <th>gender</th>
                              <th>note</th>
                              <th>createdAt</th>
                              <th>createdBy</th>
                            </tr>

                            {
                              // dailyNewCustomer
                              //   .filter((items) => {
                              //     console.log(items)
                              //     return (
                              //       moment(items.createdAt).format(
                              //         "YYYY-MM-DD"
                              //       ) == today
                              //     );
                              //   })

                              dailyNewCustomer?.filter(
                                (items) =>
                                  moment(items.createdAt).format(
                                    "YYYY-MM-DD"
                                  ) == today
                              ).map((element) => {
                                return (
                                  <tbody id="myTable">
                                    <tr>
                                      <td
                                        className="font-weight-600"
                                        style={{
                                          padding: "0px",
                                          overflow: "hidden",
                                        }}
                                      >
                                        {element.pic && (
                                          <img
                                            alt=""
                                            // className="rounded-circle mr-1"
                                            style={{
                                              width: "100%",
                                              // height: "100%",

                                            }}
                                            src={url + element.pic}
                                          />
                                        )}
                                      </td>
                                      <td>{element.name}</td>
                                      <td> {element.phone} </td>
                                      <td>
                                        {" "}
                                        <div className={"badge badge-success"}>
                                          {" "}
                                          {element.plateid}{" "}
                                        </div>
                                      </td>
                                      <td> {element.brand} </td>
                                      <td> {element.color} </td>
                                      <td> {element.model} </td>
                                      <td> {element.type} </td>
                                      <td> {element.dob} </td>
                                      <td> {element.gender} </td>
                                      <td> {element.note} </td>
                                      <td>{dateFormater(element.createdAt)}</td>
                                      <td> {element.first_name} </td>
                                    </tr>
                                  </tbody>
                                );
                              })}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}
                {tName.phoneList == true && (
                  <div className="card-body p-0">
                    <h3 style={{ paddingLeft: "30px" }}>
                      Customer Phone Record{" "}
                    </h3>
                    <div className="table-responsive table-invoice">
                      {dailyNewCustomer !== null &&
                        dailyNewCustomer !== undefined &&
                        dailyNewCustomer.length > 0 ? (
                        <>
                          <table className="table table-striped">
                            <tr>
                              <th>name</th>
                              <th>phone</th>
                              <th>Gender</th>

                            </tr>

                            {
                              dailyNewCustomer?.map((element) => {
                                return (
                                  <tbody id="myTable">
                                    <tr>
                                      <td>{element?.name}</td>
                                      <td>
                                        <a href={`tel:${element?.phone}`}>{element?.phone}</a>
                                      </td>
                                      <td> {element?.gender} </td>

                                    </tr>
                                  </tbody>
                                );
                              })}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}
                {tName.customersFeedback === true && (
                  <div className="card-body p-0">
                    <h3 style={{ paddingLeft: "30px" }}>
                      Customer Feedbacks{" "}
                    </h3>
                    <div className="table-responsive table-invoice">
                      {dailyNewCustomer !== null &&
                        dailyNewCustomer !== undefined &&
                        dailyNewCustomer.length > 0 ? (
                        <>
                          <table className="table table-striped">
                            <tr>
                              <th>Full Name</th>
                              <th>Phone number</th>
                              <th>Message</th>
                              <th>Email</th>
                              <th>Created At</th>

                            </tr>

                            {
                              feedbacks?.map((element) => {
                                return (
                                  <tbody id="myTable">
                                    <tr>
                                      <td>{element?.name}</td>
                                      <td>
                                        <a href={`tel:${element?.phone}`}>{element?.phone}</a>
                                      </td>
                                      <td> {element?.message} </td>
                                      <td> {element?.email} </td>
                                      <td> {element?.createdAt} </td>
                                    </tr>
                                  </tbody>
                                );
                              })}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}
                {tName.bankTransfer == true && (
                  <div className="card-body p-0">
                    <h3 style={{ paddingLeft: "30px" }}>
                      Bank Transfer Record{" "}
                    </h3>
                    <div className="table-responsive table-invoice">
                      {dailyNewCustomer !== null &&
                        dailyNewCustomer !== undefined &&
                        dailyNewCustomer.length > 0 ? (
                        <>
                          <table className="table table-striped">
                            <tr>
                              <th>Amount </th>
                              <th>Service Type </th>
                              <th>Payment Type </th>
                              <th>Date </th>
                            </tr>

                            {allResult.filter((item) => item.payType === 'transfer').map((element) => {
                              return (
                                <tbody id="myTable">
                                  <tr>
                                    <td># {element.amount}</td>
                                    <td>{element.servType}</td>
                                    <td>{element.payType}</td>
                                    <td> {dateFormater(element.date)}</td>
                                  </tr>
                                </tbody>
                              );
                            })}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}


                {tName.monthlyBirthday === true && (
                  <div className="card-body p-0">
                    <h3 style={{ paddingLeft: "30px" }}>
                      Monthly Customers Record{" "}
                    </h3>
                    <div className="table-responsive table-invoice">
                      {dailyNewCustomer !== null &&
                        dailyNewCustomer !== undefined &&
                        dailyNewCustomer.length > 0 ? (
                        <>
                          <table className="table table-striped">
                            <tr>
                              <th>pic</th>
                              <th>name</th>
                              <th>phone</th>
                              <th>plateid</th>
                              <th>brand</th>
                              <th>color</th>

                              <th>model</th>
                              <th>type</th>
                              <th>dob</th>
                              <th>gender</th>
                              <th>note</th>
                              <th>createdAt</th>
                              <th>createdBy</th>
                            </tr>

                            {
                              // dailyNewCustomer
                              //   .filter((items) => {
                              //     console.log(items)
                              //     return (
                              //       moment(items.createdAt).format(
                              //         "YYYY-MM-DD"
                              //       ) == today
                              //     );
                              //   })


                              dailyNewCustomer?.filter((item) => {
                                let currentMonth = `0${new Date().getMonth() + 1}`;
                                return item.dob.split("-")[1] === currentMonth
                              }).map((element) => {
                                return (
                                  <tbody id="myTable">
                                    <tr>
                                      <td
                                        className="font-weight-600"
                                        style={{
                                          padding: "0px",
                                          overflow: "hidden",
                                        }}
                                      >
                                        {element.pic && (
                                          <img
                                            // className="rounded-circle mr-1"
                                            style={{
                                              width: "100%",
                                              // height: "100%",
                                            }}
                                            src={url + element.pic}
                                          />
                                        )}
                                      </td>
                                      <td>{element.name}</td>
                                      <td> {element.phone} </td>
                                      <td>
                                        {" "}
                                        <div className={"badge badge-success"}>
                                          {" "}
                                          {element.plateid}{" "}
                                        </div>
                                      </td>
                                      <td> {element.brand} </td>
                                      <td> {element.color} </td>
                                      <td> {element.model} </td>
                                      <td> {element.type} </td>
                                      <td> {element.dob} </td>
                                      <td> {element.gender} </td>
                                      <td> {element.note} </td>
                                      <td>{dateFormater(element.createdAt)}</td>
                                      <td> {element.first_name} </td>
                                    </tr>
                                  </tbody>
                                );
                              })}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}























                {tName.employee == true && (
                  <div className="card-body p-0">
                    <div className="table-responsive table-invoice">
                      {workers !== null &&
                        workers !== undefined &&
                        workers.length > 0 ? (
                        <>
                          <h3 style={{ paddingLeft: "30px" }}>
                            Employee Record{" "}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              padding: "20px",
                            }}
                          >
                            <input
                              className="form-control"
                              style={{ padding: "5px" }}
                              id="myInput"
                              type="text"
                              placeholder="search..."
                              onChange={(event) =>
                                filterData(
                                  event.target.value,
                                  workers,
                                  setWorkers,
                                  reservedWorkers
                                )
                              }
                            />
                            <select
                              className="form-control"
                              onChange={(e) => setfilterAtrr(e.target.value)}
                            >
                              <option> please select</option>
                              <option value={"firstName"}> name</option>
                              <option value={"plateid"}>Car Reg Number</option>
                              <option value={"phone"}>Phone</option>
                              <option value={"gender"}>Gender</option>
                              <option value={"email"}>Email</option>
                            </select>
                          </div>

                          <table className="table table-striped">
                            <tr>
                              <th>pic</th>
                              <th>Name</th>
                              <th>phone</th>
                              <th>sex</th>
                              <th>dob</th>
                              <th>edu</th>
                              <th>height</th>
                              <th>resident</th>
                              <th>famRes</th>
                              <th>stateofOrg </th>
                              <th>town </th>
                              <th>lga</th>
                              <th>refoneAddr</th>
                              <th>refoneName</th>
                              <th>refoneNumb</th>
                              <th>reftwoAddr</th>
                              <th>reftwoName</th>
                              <th>reftwoNumb</th>
                              <th>createdAt</th>
                              <th>createdBy</th>
                              <th>chat</th>
                              <th colSpan={"2"}>Actions</th>
                            </tr>

                            {workers.map((element) => {
                              return (
                                <tbody id="myTable">
                                  <tr>
                                    <td
                                      className="font-weight-600"
                                      style={{
                                        padding: "0px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {element.pic && (
                                        <img
                                          style={{
                                            width: "100%",
                                          }}
                                          src={url + element.pic}
                                        />
                                      )}
                                    </td>
                                    <td>
                                      {element?.firstName +
                                        " " +
                                        element?.middleName +
                                        " " +
                                        element?.lastName}
                                    </td>
                                    <td> {element.phone} </td>
                                    {/* <td>  <div className={"badge badge-success"}> {element.plateid}  </div>  </td> */}
                                    <td> {element.sex} </td>
                                    <td> {element.dob} </td>

                                    <td> {element.edu} </td>
                                    <td> {element.height} </td>
                                    <td> {element.resident} </td>
                                    <td> {element.famRes} </td>
                                    <td> {element.stateofOrg} </td>
                                    <td> {element.town} </td>
                                    <td> {element.lga} </td>
                                    <td> {element.refoneName} </td>
                                    <td> {element.refoneNumb} </td>
                                    <td> {element.refoneAddr} </td>
                                    <td> {element.reftwoName} </td>
                                    <td> {element.reftwoNumb} </td>
                                    <td> {element.reftwoAddr} </td>
                                    <td>{dateFormater(element.createdAt)}</td>
                                    <td> {element.first_name} </td>
                                    <td>
                                      {element.phone && (
                                        <small
                                          className="btn btn-success text-white"
                                          onClick={() =>
                                            openLink(
                                              `https://wa.me/${element.phone}`
                                            )
                                          }
                                        >
                                          {/* <a
                                            style={{
                                              textDecoration: "none",
                                              color: "white",
                                            }}
                                            href={}
                                          > */}
                                          <WhatsApp />
                                          {/* </a> */}
                                        </small>
                                      )}
                                    </td>

                                    <td style={{ padding: "0px" }}>
                                      {/* <span className="btn btn-success text-white">
                                        <i className={"fas fa-edit"}> </i>
                                      </span> */}
                                      <EditEmployer
                                        handleShow={() =>
                                          managersModalEdit(
                                            setEditEmployer,
                                            true,
                                            element
                                          )
                                        }
                                        show={editEmployerShow}
                                        handleClose={() =>
                                          managersModalEditHide(
                                            setEditEmployer,
                                            false
                                          )
                                        }
                                        editHandler={editAll}
                                        changePic={changePic}
                                        editData={editDat}
                                      />

                                      <span
                                        onClick={() =>
                                          deleteUser(element, "workers")
                                        }
                                        className="btn btn-danger text-white"
                                      >
                                        <i className={"fas fa-trash"}> </i>
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}

                {tName.sales == true && (
                  <>
                    <div className="card-body p-0">
                      <div className="table-responsive table-invoice">
                        {allResult !== null &&
                          allResult !== undefined &&
                          allResult.length > 0 ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                padding: "20px",
                              }}
                            >
                              <input
                                className="form-control"
                                style={{ padding: "5px" }}
                                id="myInput"
                                type="text"
                                placeholder="search..."
                                // onChange={(event) =>
                                //   filterCarRecordData(event.target.value)
                                // }
                                onChange={(event) =>
                                  filterData(
                                    event.target.value,
                                    allResult,
                                    setAllResult,
                                    carRecordReserved
                                  )
                                }
                              />
                              <select
                                className="form-control"
                                onChange={(e) => setfilterAtrr(e.target.value)}
                              >
                                <option value={"name"}>
                                  Select Option.....
                                </option>
                                <option value={"workers_name"}>
                                  {" "}
                                  Worker's Name{" "}
                                </option>
                                <option value={"workers_phone"}>
                                  Worker's Phone
                                </option>
                                <option value={"plateid"}>
                                  {" "}
                                  Car Reg Number{" "}
                                </option>

                                <option value={"gender"}>Gender</option>
                              </select>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                paddingLeft: "20px",
                                paddingRight: "20px",
                              }}
                            >
                              <div>
                                <label>Start Date</label>
                                <input
                                  className="form-control"
                                  style={{ padding: "5px" }}
                                  id="myInput"
                                  type="date"
                                  onChange={(event) =>
                                    setStartDate(event.target.value)
                                  }
                                />
                              </div>


                              <div>
                                <label>End Date</label>

                                <input
                                  className="form-control"
                                  style={{ padding: "5px" }}
                                  id="myInput"
                                  type="date"
                                  onChange={(event) =>
                                    setEndDate(event.target.value)
                                  }
                                />
                              </div>

                              <div>
                                <label>Select Worker</label>

                                <select
                                  className="form-control"
                                  onChange={(e) =>
                                    setWorkerParams(e.target.value)
                                  }
                                >
                                  <option value={""} selected></option>

                                  {workers.map((element) => {
                                    return (
                                      <option value={element?.firstName}>
                                        {element?.firstName +
                                          " " +
                                          element?.middleName +
                                          " " +
                                          element?.lastName}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>

                              <div
                                style={{ display: "flex", paddingLeft: "20px" }}
                              >
                                <button
                                  className="btn btn-primary"
                                  onClick={() =>
                                    searchByDate(startDate, endDate)
                                  }
                                  disabled={
                                    startDate == null || endDate == null
                                  }
                                  style={{ marginRight: "5px" }}
                                >
                                  search
                                </button>

                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setAllResult(carRecordReserved);
                                    setSalary(null);
                                  }}
                                >
                                  Reset
                                </button>
                              </div>
                            </div>

                            <h4 style={{ padding: "20px" }}>Sales Record</h4>
                            {salary && (
                              <h5 style={{ paddingLeft: "20px" }}>
                                {" "}
                                INCOME = <b> {salary} </b>{" "}
                              </h5>
                            )}

                            <table className="table table-striped">
                              <tr>
                                <th>Customer Name </th>
                                <th>Car No. </th>
                                <th>Amount </th>
                                <th>Service Type </th>
                                <th>Payment Type </th>
                                <th>Date </th>
                                <th>Worker </th>
                                <th>Worker No. </th>
                                <th>Actions</th>
                              </tr>

                              {allResult.map((element) => {
                                return (
                                  <tbody id="myTable">
                                    <tr>
                                      <td className="font-weight-600">
                                        {element?.name}
                                      </td>
                                      <td>
                                        <div
                                          className={
                                            element.pgstatus === "pgd"
                                              ? "badge badge-warning"
                                              : element.pgstatus === "msc"
                                                ? "badge badge-primary"
                                                : "badge badge-success"
                                          }
                                        >
                                          {element?.plateid == "0000"
                                            ? ""
                                            : element.plateid}
                                        </div>
                                      </td>

                                      <td># {element.amount}</td>
                                      <td>{element.servType}</td>
                                      <td>{element.payType}</td>

                                      <td> {dateFormater(element.date)}</td>
                                      <td>
                                        {" "}
                                        {element?.workers_name +
                                          " " +
                                          element?.workers_name_middle +
                                          " " +
                                          element?.workers_name_last}
                                      </td>
                                      <td> {element.workers_phone}</td>

                                      <td style={{ padding: "0px" }}>
                                        {verifyEdit(element.date) == true && (
                                          <EditSales
                                            handleShow={() =>
                                              managersModalEdit(
                                                setEditSales,
                                                true,
                                                element
                                              )
                                            }
                                            reservedWorkers={reservedWorkers}
                                            reservedServices={reservedServices}
                                            show={editSalesShow}
                                            handleClose={() =>
                                              managersModalEditHide(
                                                setEditSales,
                                                false
                                              )
                                            }
                                            editHandler={editAll}
                                            editData={editDat}
                                          />
                                        )}
                                        <button
                                          onClick={
                                            () =>
                                              deleteUser(
                                                element,
                                                "carsrecord",
                                                true
                                              )
                                            // sectionID,
                                            // element.id,
                                            // element.regnumber,
                                            // element.pgstatus
                                          }
                                          className="btn btn-danger text-white"
                                        >
                                          <i className={"fas fa-trash"}> </i>
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                );
                              })}
                            </table>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}

                {tName.dailySalesRecord == true && (
                  <>
                    <div className="card-body p-0">
                      <div className="table-responsive table-invoice">
                        {dailySales !== null &&
                          dailySales !== undefined &&
                          dailySales.length > 0 ? (
                          <>
                            <h4 style={{ padding: "20px" }}>
                              Salary Advance Record
                            </h4>

                            <table className="table table-striped">
                              <tr>
                                <th>Customer Name </th>
                                <th>Car No. </th>
                                <th>Amount </th>
                                <th>Service Type </th>
                                <th>Payment Type </th>
                                <th>Date </th>
                                <th>Worker </th>
                                <th>Worker No. </th>
                              </tr>

                              {dailySales
                                .filter((items) => {
                                  return (
                                    moment(items.date).format("YYYY-MM-DD") ==
                                    today
                                  );
                                })
                                .map((element) => {
                                  return (
                                    <tbody id="myTable">
                                      <tr>
                                        <td className="font-weight-600">
                                          {element?.name}
                                        </td>
                                        <td>
                                          <div
                                            className={
                                              element.pgstatus === "pgd"
                                                ? "badge badge-warning"
                                                : element.pgstatus === "msc"
                                                  ? "badge badge-primary"
                                                  : "badge badge-success"
                                            }
                                          >
                                            {element?.plateid == "0000"
                                              ? ""
                                              : element.plateid}
                                          </div>
                                        </td>

                                        <td># {element.amount}</td>
                                        <td>{element.servType}</td>
                                        <td>{element.payType}</td>

                                        <td> {dateFormater(element.date)}</td>
                                        <td>
                                          {" "}
                                          {element?.workers_name +
                                            " " +
                                            element?.workers_name_middle +
                                            " " +
                                            element?.workers_name_last}
                                        </td>
                                        <td> {element.workers_phone}</td>
                                      </tr>
                                    </tbody>
                                  );
                                })}
                            </table>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
                {
                  tName.carwashmen === true && <table className="table table-striped">

                    <tr>
                      <th>Customer Name </th>
                      <th>phone number</th>
                      <th>car wash / service rendered </th>
                    </tr>

                    {

                      carwashPerfomance?.map((element) => {
                        return (
                          <tbody id="myTable">
                            <tr>
                              <td>
                                {
                                  allResult?.find((x) => x.workerid === parseFloat(element[0]))?.workers_name.toUpperCase() + " " +
                                  allResult?.find((x) => x.workerid === parseFloat(element[0]))?.workers_name_middle + " " +
                                  allResult?.find((x) => x.workerid === parseFloat(element[0]))?.workers_name_last
                                }
                              </td>
                              <td>{allResult?.find((x) => x.workerid === parseFloat(element[0]))?.workers_phone}</td>
                              <td> {element[1]}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </table>
                }

                {tName.showManagers == true && (
                  <div className="card-body p-0">
                    <div className="table-responsive table-invoice">
                      {managersList !== null &&
                        managersList !== undefined &&
                        managersList.length > 0 ? (
                        <>
                          <h3 style={{ paddingLeft: "30px" }}>
                            {" "}
                            Managers List{" "}
                          </h3>

                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Name </th>
                                <th>Email / Username </th>
                                <th>Password </th>
                                <th>Branch </th>
                                <th>CreatedAt </th>
                                <th>Actions</th>
                              </tr>
                            </thead>

                            {managersList.map((element, index) => {
                              return (
                                <tbody id="myTable">
                                  <tr key={index}>
                                    <td> {element.first_name}</td>
                                    <td> {element.email}</td>
                                    <td>
                                      <div>{element.repeat_password}</div>
                                    </td>

                                    <td> {element.address}</td>
                                    <td> {dateFormater(element.createdAt)}</td>

                                    <td>
                                      {/* <EditManager
                                        handleShow={() =>
                                          managersModalEdit(
                                            setEditExp,
                                            true,
                                            element
                                          )
                                        }
                                        show={editExpShow}
                                        handleClose={() =>
                                          managersModalEditHide(
                                            setEditExp,
                                            false
                                          )
                                        }
                                        editHandler={editAll}
                                        editData={editDat}
                                      /> */}

                                      {/* <button className="btn btn-success text-white">
                                        <i className={"fas fa-edit"}> </i>
                                      </button> */}

                                      <button
                                        onClick={() =>
                                          deleteUser(element, "admin")
                                        }
                                        className="btn btn-danger text-white"
                                      >
                                        <i className={"fas fa-trash"}> </i>
                                      </button>

                                      {/* <button className="btn btn-success text-white">
                                      <i className={"fa fa-whatsapp"}> </i>
                                    </button> */}
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })}
                          </table>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* <div className="col-md-4">
                <div className="card card-hero">
                  <div className="card-header">
                    <div className="card-icon">
                      <i className="far fa-question-circle"></i>
                    </div>
                    <h4>14</h4>
                    <div className="card-description">Customers need help</div>
                  </div>
                  <div className="card-body p-0">
                    <div className="tickets-list">
                      <a href="#" className="ticket-item">
                        <div className="ticket-title">
                          <h4>My order hasn't arrived yet</h4>
                        </div>
                        <div className="ticket-info">
                          <div>Laila Tazkiah</div>
                          <div className="bullet"></div>
                          <div className="text-primary">1 min ago</div>
                        </div>
                      </a>
                      <a href="#" className="ticket-item">
                        <div className="ticket-title">
                          <h4>Please cancel my order</h4>
                        </div>
                        <div className="ticket-info">
                          <div>Debra Stewart</div>
                          <div className="bullet"></div>
                          <div>2 hours ago</div>
                        </div>
                      </a>
                      <a href="#" className="ticket-item">
                        <div className="ticket-title">
                          <h4>Do you see my mother?</h4>
                        </div>
                        <div className="ticket-info">
                          <div>Syahdan Ubaidillah</div>
                          <div className="bullet"></div>
                          <div>6 hours ago</div>
                        </div>
                      </a>
                      <a
                        href="features-tickets.html"
                        className="ticket-item ticket-more"
                      >
                        View All <i className="fas fa-chevron-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
          </div>
        </div>

        <footer className="main-footer">
          <div className="footer-left">
            <div className="bullet"></div>
            <a hrefs="templateshub.net">
              GREEN CAR WASH ADMIN DASHBOARD {new Date().getFullYear()}{" "}
            </a>
          </div>
          <div className="footer-right"></div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
