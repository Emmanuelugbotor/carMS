import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Button, Modal, ModalBody } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import url from "../../constant/url";
import {
  signOut,
  sectiondata,
  deleteStudent,
} from "../../redux/actions/usersAction";

// import { useAuthPost } from "../auth/usePost";
import { Helmet } from "react-helmet";
import PGModal from "../../utils/addStudent";
import ManagersModal from "../../utils/addManagers";
import NavBar from "../../components/navBar";
import PGCourses from "../../utils/addCourses";
import PGNav from "./navbar";
import { useFetch } from "../../utils/useFetch";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  const student = useSelector((state) => state.student);
  const userSignin = useSelector((state) => state.userSignIn);
  const sectionData = useSelector((state) => state.sectionData);
  const results = useSelector((state) => state.results);
  let { loadRes, result, resErr } = results;
  const { userInfo } = userSignin;

  const [successMsg, setMsg] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [sections, setSection] = useState([]);
  const { students, studentErr } = student;
  const { secErr, secData, secLoading } = sectionData;
  const [showResultData, setShowResultData] = useState(true);
  const [allResult, setAllResult] = useState([]);
  const [deleteURL, setUrl] = useState("");
  const [msg, setRemount] = useState(null);

  const remount = (args) => {
    setRemount(args);
  };
  const getSection = (managerID) =>
    history.push(`/manager/${managerID.id}`, { manager: managerID });

  const deleteUser = (deleteURLs) => {
    if (
      window.confirm(
        "Are sure you want to do this ?, this delete operation is irreversible!"
      )
    ) {
      axios
        .get(`${url + deleteURLs}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          // toast(`${res.data.msg}`)
          // setMsg(res.data.msg);
          setUrl(res.data.msg);
        })
        .catch((error) => {
          console.log(error);
          // setMsg("error");
          setUrl("error");
          // toast(`Network Error, contact developer`);
        });
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (students) {
      students.msg !== undefined && toast(`${students.msg}`);
    }
    if (studentErr) {
      studentErr !== undefined && toast(`${studentErr}`);
    }
    // console.log("student msg ", student)
    if (
      userInfo.length == 0 ||
      (userInfo.length > 0 && userInfo.isAdmin == false)
    ) {
      history.push("/adminlogin");
    } else {
      axios
        .get(`${url}getmanagers`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          setSection(res.data.items);
        })
        .catch((error) => setErrMsg(error));
    }

    return () => {
      setMsg("");
      setUrl("");
      localStorage.removeItem("student");
      localStorage.removeItem("course");
      localStorage.removeItem("studentInfo");
    };
  }, [dispatch, allResult, msg, student, deleteURL]);

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

        <NavBar successMsg={deleteURL} remountParent={remount} />

        <div className="main-content">
          {showResultData === true && userInfo && userInfo.isSupperAdmin == true ? (
            <section className="section">
              {/* {successMsg && <h6 style={{ color: "green" }}>{successMsg}</h6>}*/}
              {/* {deleteURL && <h6 style={{ color: "red" }}>{deleteURL}</h6>}  */}

              <div className="row">
                {/* <div className="col-lg-3 col-md-3 col-sm-12">
                      <div className="card card-statistic-2">
                        <div className="card-stats">
                          <div className="card-stats-title">
                            Total Statistics -
                          </div>
                          <div className="card-stats-items">
                            <div className="card-stats-item">
                              <div className="card-stats-item-count">
                                {studentCounter && studentCounter.pgdCounter}
                              </div>
                              <div className="card-stats-item-label">PGD</div>
                            </div>
                            <div className="card-stats-item">
                              <div className="card-stats-item-count">
                                {studentCounter && studentCounter.mscCounter}
                              </div>
                              <div className="card-stats-item-label">MSC</div>
                            </div>
                            <div className="card-stats-item">
                              <div className="card-stats-item-count">
                                {studentCounter && studentCounter.phdCounter}
                              </div>
                              <div className="card-stats-item-label">PHD</div>
                            </div>
                          </div>
                        </div>
                        <div className="card-icon shadow-primary bg-primary">
                          <i
                            className="fas fa-archive"
                            onClick={() => resetStatus()}
                          ></i>
                        </div>
                        <div className="card-wrap">
                          <div className="card-header">
                            <h4>Total Students</h4>
                          </div>
                          <div className="card-body">
                            {studentCounter &&
                              studentCounter.phdCounter +
                                studentCounter.mscCounter +
                                studentCounter.pgdCounter}
                          </div>
                        </div>
                      </div>
                </div> */}

                {sections
                  ? sections.map((items) => {
                      return (
                        <div className="col-lg-3 col-md-3 col-sm-12">
                          <div className="card card-statistic-2">
                            <div
                              className="card-body"
                              // style={{ fontSize: "20px" }}
                            >
                              <h5>Branch Name </h5>
                              <h5>{items.name} </h5>
                              {/* <h6>{items.phone}</h6>
                              <h6>{items.email}</h6>
                              <h6>{items.password}</h6> */}
                            </div>
                            <div
                              className="card-icon shadow-primary bg-primary"
                              style={{
                                margin: "10px",
                                width: "80%",
                              }}
                            >
                              <a
                                href={`/manager/${items.id}`}
                                variant="primary"
                                onClick={() => getSection(items)}
                              >
                                View Records
                              </a>
                              <i
                                className={"fas fa-trash"}
                                onClick={() =>
                                  deleteUser(`deletemanager/${items.id}`)
                                }
                                style={{
                                  color: "red",
                                  paddingLeft: "15px",
                                  cursor: "pointer",
                                }}
                              ></i>
                            </div>

                            {/* <div
                                  className="card-icon shadow-primary bg-primary"
                                  style={{
                                    margin: "10px",
                                    width: "80%",
                                  }}
                                >
                                  
                                  <PGCourses
                                    css="fas fa-shopping-bag"
                                    status={pgstat}
                                    handleShow={() =>
                                      showModal("PGD", sectionID)
                                    }
                                    sectionid={items.id}
                                    user={userInfo}
                                    show={isOpen}
                                    handleClose={closeModal}
                                  />
                                </div> */}
                          </div>
                        </div>
                      );
                    })
                  : null}

                {/* <div className="col-lg-3 col-md-3 col-sm-12">
                      <div className="card card-statistic-2">
                        <div className="card-body">MSC</div>
                        <div className="card-icon shadow-primary bg-primary">
                          <PGModal
                            css="fas fa-shopping-bag"
                            status={status}
                            handleShow={() => handleShow("msc", sectionID)}
                            show={show}
                            sectionid={sectionID}
                            user={userInfo}
                            handleClose={handleClose}
                          />
                        </div>
                        <div className="card-icon shadow-primary bg-primary">
                          
                          <PGCourses
                            css="fas fa-shopping-bag"
                            status={pgstat}
                            handleShow={() => showModal("MSC", sectionID)}
                            sectionid={sectionID}
                            user={userInfo}
                            show={isOpen}
                            handleClose={closeModal}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12">
                      <div className="card card-statistic-2">
                        <div className="card-body">PHD</div>

                        <div className="card-icon shadow-primary bg-primary">
                          <PGModal
                            css="fas fa-shopping-bag"
                            status={status}
                            handleShow={() => handleShow("phd", sectionID)}
                            sectionid={sectionID}
                            user={userInfo}
                            show={show}
                            handleClose={handleClose}
                          />
                        </div>
                        <div className="card-icon shadow-primary bg-primary">
                          <PGCourses
                            css="fas fa-shopping-bag"
                            status={pgstat}
                            handleShow={() => showModal("PHD", sectionID)}
                            sectionid={sectionID}
                            user={userInfo}
                            show={isOpen}
                            handleClose={closeModal}
                          />

                          <i className="fas fa-shopping-bag"></i>
                        </div>
                      </div>
                    </div> */}
              </div>
            </section>
          ) : (
            <>
              {/* <div className="row row-deck">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4> PGD RESULTS </h4>
                      <div className="card-header-action"></div>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive table-invoice">
                        {allResult.pgdResult !== null &&
                        showResultData == false &&
                        allResult.pgdResult !== undefined ? (
                          <table className="table table-striped">
                            <tr>
                              {allResult.coursesData.map((element) => {
                                return allResult.pgdResult.map((result) => {
                                  return (
                                    <>
                                      {
                                        <>
                                          {result[element.coursecode] !==
                                          undefined ? (
                                            <td>{element.coursecode}</td>
                                          ) : null}
                                        </>
                                      }
                                    </>
                                  );
                                });
                              })}
                              <th> CGPA </th>
                            </tr>

                            <tr>
                              {allResult.pgdResult.map((result) => {
                                return allResult.coursesData.map((element) => {
                                  return (
                                    <>
                                      {result[element.coursecode] !==
                                      undefined ? (
                                        <td>
                                          {result[element.coursecode] + "%"}
                                        </td>
                                      ) : null}
                                    </>
                                  );
                                });
                              })}

                              {allResult.pgdResult.map((element) => {
                                return <td> {element.cgpa} </td>;
                              })}
                            </tr>
                          </table>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row row-deck">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4> MSC RESULTS </h4>
                      <div className="card-header-action"></div>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive table-invoice">
                        {allResult.mscResult !== null &&
                        showResultData == false &&
                        allResult.mscResult !== undefined ? (
                          <table className="table table-striped">
                            <tr>
                              {allResult.coursesData.map((element) => {
                                return allResult.mscResult.map((result) => {
                                  return (
                                    <>
                                      {result[element.coursecode] !==
                                        undefined &&
                                      result[element.coursecode] !== null &&
                                      result[element.coursecode] !== "" ? (
                                        <th> {element.coursecode} </th>
                                      ) : null}
                                    </>
                                  );
                                });
                              })}
                              <th> CGPA </th>
                            </tr>

                       
                       
                            {allResult.mscResult.map((result) => {
                              return (
                                <tr>
                                  {allResult.coursesData.map((element) => {
                                    return (
                                      <>
                                        {result[element.coursecode] !==
                                        undefined ? (
                                          <td>
                                            {result["R" + element.coursecode] +
                                              "%"}
                                          </td>
                                        ) : null}
                                      </>
                                    );
                                  })}
                                  <td> {result.cgpa} </td>
                                </tr>
                              );
                            })}

                            
                          </table>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row row-deck">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4> PHD RESULTS </h4>
                      <div className="card-header-action"></div>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive table-invoice">
                        {allResult.phdResult !== undefined &&
                          allResult.phdResult.length &&
                          showResultData == false && (
                            <table className="table table-striped">
                              <tr>
                                {allResult.coursesData.map((element) => {
                                  return allResult.phdResult.map((result) => {
                                    return (
                                      <>
                                        {
                                          <>
                                            {result[element.coursecode] !==
                                            undefined ? (
                                              <td>{element.coursecode}</td>
                                            ) : null}
                                          </>
                                        }
                                      </>
                                    );
                                  });
                                })}
                                <th> CGPA </th>
                              </tr>

                              <tr>
                                {allResult.phdResult.map((result) => {
                                  return allResult.coursesData.map(
                                    (element) => {
                                      return (
                                        <>
                                          {result[element.coursecode] !==
                                          undefined ? (
                                            <td>
                                              {result[
                                                "R" + element.coursecode
                                              ] + "%"}
                                            </td>
                                          ) : null}
                                        </>
                                      );
                                    }
                                  );
                                })}

                                {allResult.phdResult.map((element) => {
                                  return <td> {element.cgpa} </td>;
                                })}
                              </tr>
                            </table>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </>
          )}
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
