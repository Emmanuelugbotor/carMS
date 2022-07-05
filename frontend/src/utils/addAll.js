import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import url from "../constant/url";

export const AddServices = ({
  status,
  handleShow,
  handleClose,
  show,
  addServiceHandler,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const addServicesToDB = async (body) => {
    toast("Processing Request");
    addServiceHandler(body);
    reset();
  };

  return (
    <>
      <ToastContainer />
      <Button variant="primary" onClick={handleShow}>
        Create Services
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"CREATE SERVICES"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(addServicesToDB)}
            className="needs-validation"
            noValidate=""
          >
            {/* {msg && <h4> {msg} </h4>} */}
            {/* {students && <h4 style={{ color: "green" }}> {students.msg} </h4>} */}

            <div className="form-group">
              <label htmlFor="name">Service Name *</label>
              <input
                type="text"
                {...register("name")}
                className="form-control"
                name="name"
                id="name"
                tabIndex="1"
                autoFocus
                required
                placeholder="Services Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="amt">Service Amount *</label>
              <input
                type="text"
                required
                {...register("amt")}
                className="form-control"
                name="amt"
                id="amt"
                placeholder="Enter Service Amount"
              />
            </div>

            <div className="form-group">
              <label htmlFor="desc">Service Description </label>
              <input
                id="desc"
                type="text"
                {...register("desc")}
                className="form-control"
                name="desc"
                tabIndex="1"
                placeholder="Enter service description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type"> Service Type * </label>
              <input
                id="type"
                type="text"
                {...register("type")}
                className="form-control"
                name="type"
                tabIndex="1"
                placeholder="eg Car Wash, Rug wash, Item sold, Home Service, House Cleaning, Fumigation"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                tabIndex="4"
              >
                Post
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const EditServices = ({
  status,
  handleShow,
  handleClose,
  show,
  editService,
  editData,
}) => {
  const { register, handleSubmit, reset } = useForm();

  let [EName, setEname] = useState("");
  let [EAmt, setEamt] = useState("");
  let [EDesc, setEdesc] = useState("");
  let [EType, setType] = useState("");

  const editServicesToDB = async (body) => {
    toast("Processing Request");

    let bodyData = {
      name: editData.name,
      amt: editData.amt,
      desc: editData.desc,
      type: editData.type,
      tableID: editData.tableID,
    };

    let realData = {
      name: EName ? EName : bodyData.name,
      amt: EAmt ? EAmt : bodyData.amt,
      desc: EDesc ? EDesc : bodyData.desc,
      type: EType ? EType : bodyData.type,
    };

    editService(realData, bodyData.tableID, "services");
    reset();
    setEname("");
    setEamt("");
    setEdesc("");
    setType("");
  };

  useEffect(() => {}, []);

  return (
    <>
      <ToastContainer />
      <Button onClick={handleShow} variant={"success"}>
        <i className={"fas fa-edit"}> </i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"EDIT SERVICES"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(editServicesToDB)}
            className="needs-validation"
            noValidate=""
          >
            <div className="form-group">
              <label htmlFor="name">Service Name * </label>
              <input
                type="text"
                {...register("name")}
                className="form-control"
                name="name"
                id="name"
                tabIndex="1"
                autoFocus
                placeholder="Services Name"
                onChange={(e) => setEname(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="amt">Service Amount * </label>
              <input
                type="text"
                {...register("amt")}
                className="form-control"
                name="amt"
                id="amt"
                placeholder="Enter Service Amount"
                onChange={(e) => setEamt(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="desc">Service Description </label>
              <input
                id="desc"
                type="text"
                // value={editData && editData.desc}
                {...register("desc")}
                className="form-control"
                name="desc"
                tabIndex="1"
                placeholder="Enter service description"
                onChange={(e) => setEdesc(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="type"> Service Type * </label>
              <input
                id="type"
                // value={editData && editData.type}
                type="text"
                {...register("type")}
                className="form-control"
                name="type"
                tabIndex="1"
                placeholder="eg Car Wash, Rug wash, Item sold, Home Service, House Cleaning, Fumigation"
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                tabIndex="4"
              >
                Post
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const AddEmployer = ({
  managerid,
  handleShow,
  handleClose,
  submitWorkerData,
  show,
  state,
}) => {
  const userSignin = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignin;

  const { register, handleSubmit, reset } = useForm();
  const [pics, setImg] = useState(null);

  const addEmployeeData = (body) => {
    let formData = new FormData();
    for (var obj in body) {
      formData.append(`${obj}`, body[obj]);
    }
    formData.append(`pic`, pics);
    formData.append(`branchid`, state.manager.id);
    formData.append(`createdBy`, userInfo.id);
    formData.append(`createdAt`, moment().format("YYYY-MM-DD"));

    toast("Processing Request");
    submitWorkerData(formData);

    reset();
  };
  useEffect(() => {}, [pics]);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Employee
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"CREATE" + " " + "EMPLOYEE"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(addEmployeeData)}
            className="needs-validation"
            noValidate=""
          >
            <label htmlFor="firstName">First Name</label>

            <div className="form-group">
              <input
                type="text"
                {...register("firstName")}
                className="form-control"
                name="firstName"
                tabIndex="1"
                required
                placeholder="Enter your first name"
              />
            </div>

            <label htmlFor="middleName">Middle Name</label>

            <div className="form-group">
              <input
                type="text"
                {...register("middleName")}
                className="form-control"
                name="middleName"
                tabIndex="1"
                placeholder="Enter your first name"
              />
            </div>
            <label htmlFor="lastName">Last Name</label>

            <div className="form-group">
              <input
                type="text"
                {...register("lastName")}
                className="form-control"
                name="lastName"
                tabIndex="1"
                placeholder="Enter your first name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob"> Date of Birth </label>
              <input
                id="dob"
                type="date"
                {...register("dob")}
                className="form-control"
                name="dob"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Height"> Height of employee </label>
              <input
                id="Height"
                type="text"
                {...register("height")}
                className="form-control"
                name="Height"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Sex"> Sex </label>
              <input
                id="Sex"
                type="text"
                {...register("sex")}
                className="form-control"
                name="Sex"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Resident"> Resident Address </label>
              <input
                id="Resident"
                type="text"
                {...register("resident")}
                className="form-control"
                name="Resident"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone"> Personal Phone Number </label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                className="form-control"
                name="phone"
                tabIndex="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stateofOrg"> State of Origin </label>
              <input
                id="stateofOrg"
                type="text"
                {...register("stateofOrg")}
                className="form-control"
                name="stateofOrg"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lga"> Local Government of Origin </label>
              <input
                id="lga"
                type="text"
                {...register("lga")}
                className="form-control"
                name="lga"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Town"> Town </label>
              <input
                id="Town"
                type="text"
                {...register("town")}
                className="form-control"
                name="Town"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edu"> Highest Qualification / Education </label>
              <input
                id="edu"
                type="text"
                {...register("edu")}
                className="form-control"
                name="edu"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="famRes"> Family Residential Address </label>
              <input
                id="famRes"
                type="text"
                {...register("famRes")}
                className="form-control"
                name="famRes"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="refoneName"> Referee 1 Name </label>
              <input
                id="refoneName"
                type="text"
                {...register("refoneName")}
                className="form-control"
                name="refoneName"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="refoneNumb"> Referee 1 Number </label>
              <input
                id="refoneNumb"
                type="text"
                {...register("refoneNumb")}
                className="form-control"
                name="refoneNumb"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="refoneAddr"> Referee 1 Address </label>
              <input
                id="refoneAddr"
                type="text"
                {...register("refoneAddr")}
                className="form-control"
                name="refoneAddr"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reftwoName"> Referee 2 Name </label>
              <input
                id="reftwoName"
                type="text"
                {...register("reftwoName")}
                className="form-control"
                name="reftwoName"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reftwoNumb"> Referee 2 Number </label>
              <input
                id="reftwoNumb"
                type="text"
                {...register("reftwoNumb")}
                className="form-control"
                name="reftwoNumb"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reftwoAddr"> Referee 2 Address </label>
              <input
                id="reftwoAddr"
                type="text"
                {...register("reftwoAddr")}
                className="form-control"
                name="reftwoAddr"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pic"> Attach profile pic </label>
              <input
                // id="pic"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                // {...register("file")}
                className="form-control"
                // name="pic"
                // tabIndex="1"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                tabIndex="4"
              >
                Post
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const EditEmployer = ({
  handleShow,
  handleClose,
  show,
  editHandler,
  editData,
  changePic,
}) => {
  const { register, handleSubmit, reset } = useForm();
  let [pics, setImg] = useState(null);
  let [firstName, setFirstName] = useState("");
  let [middleName, setmiddleName] = useState("");
  let [lastName, setlastName] = useState("");
  let [dob, setdob] = useState("");
  let [height, setheight] = useState("");
  let [sex, setsex] = useState("");
  let [resident, setresident] = useState("");
  let [phone, setphone] = useState("");
  let [stateofOrg, setstateofOrg] = useState("");
  let [lga, setlga] = useState("");
  let [town, settown] = useState("");
  let [edu, setedu] = useState("");
  let [famRes, setfamRes] = useState("");
  let [refoneName, setrefoneName] = useState("");
  let [refoneNumb, setrefoneNumb] = useState("");
  let [refoneAddr, setrefoneAddr] = useState("");
  let [reftwoName, setreftwoName] = useState("");
  let [reftwoNumb, setreftwoNumb] = useState("");
  let [reftwoAddr, setreftwoAddr] = useState("");

  const editToDB = async (body) => {
    toast("Processing Request");

    let bodyData = {
      firstName: firstName ? firstName : editData.firstName,
      middleName: middleName ? middleName : editData.middleName,
      lastName: lastName ? lastName : editData.lastName,
      dob: dob ? dob : editData.dob,
      height: height ? height : editData.height,
      sex: sex ? sex : editData.sex,
      resident: resident ? resident : editData.resident,
      phone: phone ? phone : editData.phone,
      stateofOrg: stateofOrg ? stateofOrg : editData.stateofOrg,
      lga: lga ? lga : editData.lga,
      town: town ? town : editData.town,
      edu: edu ? edu : editData.edu,
      famRes: famRes ? famRes : editData.famRes,
      refoneName: refoneName ? refoneName : editData.refoneName,
      refoneNumb: refoneNumb ? refoneNumb : editData.refoneNumb,
      refoneAddr: refoneAddr ? refoneAddr : editData.refoneAddr,
      reftwoName: reftwoName ? reftwoName : editData.reftwoName,
      reftwoNumb: reftwoNumb ? reftwoNumb : editData.reftwoNumb,
      reftwoAddr: reftwoAddr ? reftwoAddr : editData.reftwoAddr,
      // tableID: editData.tableID,
    };

    editHandler(bodyData, editData.tableID, "workers");

    setFirstName("");
    setmiddleName("");
    setlastName("");
    setdob("");
    setheight("");
    setsex("");
    setresident("");
    setphone("");
    setstateofOrg("");
    setlga("");
    settown("");
    setedu("");
    setfamRes("");
    setrefoneName("");
    setrefoneNumb("");
    setrefoneAddr("");
    setreftwoName("");
    setreftwoNumb("");
    setreftwoAddr("");
  };

  const changePicHandler = () => {
    console.log("pics ", pics);
    var formData = new FormData();
    formData.append(`pic`, pics);
    changePic(formData, editData.tableID, "workers");
  };

  return (
    <>
      <ToastContainer />
      <Button onClick={handleShow} variant="success">
        <i className={"fas fa-edit"}> </i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"EDIT EMPLOYER"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(editToDB)}
            className="needs-validation"
            noValidate=""
          >
            <label htmlFor="firstName">First Name</label>

            <div className="form-group">
              <input
                type="text"
                {...register("firstName")}
                className="form-control"
                name="firstName"
                tabIndex="1"
                required
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <label htmlFor="middleName">Middle Name</label>

            <div className="form-group">
              <input
                type="text"
                {...register("middleName")}
                className="form-control"
                name="middleName"
                tabIndex="1"
                placeholder="Enter your first name"
                onChange={(e) => setmiddleName(e.target.value)}
              />
            </div>
            <label htmlFor="lastName">Last Name</label>

            <div className="form-group">
              <input
                type="text"
                {...register("lastName")}
                className="form-control"
                name="lastName"
                tabIndex="1"
                placeholder="Enter your first name"
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob"> Date of Birth </label>
              <input
                id="dob"
                type="date"
                {...register("dob")}
                className="form-control"
                name="dob"
                tabIndex="1"
                onChange={(e) => setdob(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Height"> Height of employee </label>
              <input
                id="Height"
                type="text"
                {...register("height")}
                className="form-control"
                name="Height"
                tabIndex="1"
                onChange={(e) => setheight(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Sex"> Sex </label>
              <input
                id="Sex"
                type="text"
                {...register("sex")}
                className="form-control"
                name="Sex"
                tabIndex="1"
                onChange={(e) => setsex(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Resident"> Resident Address </label>
              <input
                id="Resident"
                type="text"
                {...register("resident")}
                className="form-control"
                name="Resident"
                tabIndex="1"
                onChange={(e) => setresident(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone"> Personal Phone Number </label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                className="form-control"
                name="phone"
                tabIndex="1"
                onChange={(e) => setphone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="stateofOrg"> State of Origin </label>
              <input
                id="stateofOrg"
                type="text"
                {...register("stateofOrg")}
                className="form-control"
                name="stateofOrg"
                tabIndex="1"
                onChange={(e) => setstateofOrg(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lga"> Local Government of Origin </label>
              <input
                id="lga"
                type="text"
                {...register("lga")}
                className="form-control"
                name="lga"
                tabIndex="1"
                onChange={(e) => setlga(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Town"> Town </label>
              <input
                id="Town"
                type="text"
                {...register("town")}
                className="form-control"
                name="Town"
                tabIndex="1"
                onChange={(e) => settown(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edu"> Highest Qualification / Education </label>
              <input
                id="edu"
                type="text"
                {...register("edu")}
                className="form-control"
                name="edu"
                tabIndex="1"
                onChange={(e) => setedu(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="famRes"> Family Residential Address </label>
              <input
                id="famRes"
                type="text"
                {...register("famRes")}
                className="form-control"
                name="famRes"
                tabIndex="1"
                onChange={(e) => setfamRes(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="refoneName"> Referee 1 Name </label>
              <input
                id="refoneName"
                type="text"
                {...register("refoneName")}
                className="form-control"
                name="refoneName"
                tabIndex="1"
                onChange={(e) => setrefoneName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="refoneNumb"> Referee 1 Number </label>
              <input
                id="refoneNumb"
                type="text"
                {...register("refoneNumb")}
                className="form-control"
                name="refoneNumb"
                tabIndex="1"
                onChange={(e) => setrefoneNumb(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="refoneAddr"> Referee 1 Address </label>
              <input
                id="refoneAddr"
                type="text"
                {...register("refoneAddr")}
                className="form-control"
                name="refoneAddr"
                tabIndex="1"
                onChange={(e) => setrefoneAddr(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reftwoName"> Referee 2 Name </label>
              <input
                id="reftwoName"
                type="text"
                {...register("reftwoName")}
                className="form-control"
                name="reftwoName"
                tabIndex="1"
                onChange={(e) => setreftwoName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reftwoNumb"> Referee 2 Number </label>
              <input
                id="reftwoNumb"
                type="text"
                {...register("reftwoNumb")}
                className="form-control"
                name="reftwoNumb"
                tabIndex="1"
                onChange={(e) => setreftwoNumb(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reftwoAddr"> Referee 2 Address </label>
              <input
                id="reftwoAddr"
                type="text"
                {...register("reftwoAddr")}
                className="form-control"
                name="reftwoAddr"
                tabIndex="1"
                onChange={(e) => setreftwoAddr(e.target.value)}
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="pic"> Attach profile pic </label>
              <input
              
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                
                className="form-control"
                
              />
            </div> */}

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                tabIndex="4"
              >
                Post
              </button>
            </div>
          </form>

          <form
            onSubmit={handleSubmit(changePicHandler)}
            className="needs-validation"
            noValidate=""
          >
            <Modal.Title> {"CHANGE EMPLOYER PIC"} </Modal.Title>

            <div className="form-group">
              <label htmlFor="pic"> Attach profile pic </label>
              <input
                id="pic"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                className="form-control"
                name="pic"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                tabIndex="4"
              >
                Post
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const AddCustomers = ({
  managerid,
  handleShow,
  handleClose,
  submitWorkerData,
  show,
}) => {
  const userSignin = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignin;

  const { register, handleSubmit, reset } = useForm();
  const [pics, setImg] = useState(null);

  const addCustomers = (body) => {
    let formData = new FormData();
    for (var obj in body) {
      formData.append(`${obj}`, body[obj]);
    }
    formData.append(`pic`, pics);
    formData.append(`branchid`, managerid);
    formData.append(`createdBy`, userInfo.id);
    formData.append(`createdAt`, moment().format("YYYY-MM-DD"));

    toast("Processing Request");
    submitWorkerData(formData);
    reset();
  };
  useEffect(() => {}, [pics]);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Customers
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"CREATE" + " " + "CUSTOMERS"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(addCustomers)}
            className="needs-validation"
            noValidate=""
          >
            <div className="form-group">
              <label htmlFor="name"> Name </label>
              <input
                type="text"
                {...register("name")}
                className="form-control"
                name="name"
                tabIndex="1"
                placeholder="Enter customer full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Car Plate Number *</label>
              <input
                type="text"
                {...register("plateid")}
                className="form-control"
                name="plateid"
                tabIndex="1"
                required
                placeholder="Enter the car plate number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Car Type</label>
              <select
                type="text"
                {...register("type")}
                className="form-control"
                name="type"
                tabIndex="1"
              >
                <option selected={true} value={"Bike"}>
                  Bike
                </option>
                <option value={"Tricycle"}> Tricycle </option>
                <option value={" Saloon car"}> Saloon car </option>
                <option value={"Jeep"}> Jeep </option>
                <option value={"Pick-up"}> Pick-up </option>
                <option value={"SUV"}> SUV </option>
                <option value={"Bus"}> Bus </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brand">Car Brand </label>
              <select
                type="text"
                {...register("brand")}
                className="form-control"
                name="brand"
                tabIndex="1"
              >
                <option selected value={"Mercedes Benz"}>
                  Mercedes Benz
                </option>
                <option value={"Toyota"}> Toyota </option>
                <option value={"Hyundia"}> Hyundia </option>
                <option value={"others"}> others </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="model">Car Model </label>
              <select
                type="text"
                {...register("model")}
                className="form-control"
                name="model"
                tabIndex="1"
              >
                <option selected value={"Camry"}>
                  {" "}
                  Camry{" "}
                </option>
                <option value={"Corolla"}>Corolla</option>
                <option value={"Sienna"}> Sienna</option>
                <option value={"Hillux"}>Hillux </option>
                <option value={"others"}>others </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="color">Car Color </label>
              <input
                type="text"
                {...register("color")}
                className="form-control"
                name="color"
                tabIndex="1"
                placeholder="eg red, black"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">WhatsApp or Phone Number</label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                className="form-control"
                name="phone"
                tabIndex="1"
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob"
                type="date"
                required
                {...register("dob")}
                className="form-control"
                name="dob"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender </label>
              <select
                type="hidden"
                {...register("gender")}
                className="form-control"
                name="gender"
                tabIndex="1"
              >
                <option selected={true} value="Male">
                  Male
                </option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="note">Add Note </label>
              <input
                id="note"
                type="text"
                {...register("note")}
                className="form-control"
                name="note"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pic"> Attach profile pic </label>
              <input
                // id="pic"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                // {...register("file")}
                className="form-control"
                // name="pic"
                // tabIndex="1"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                tabIndex="4"
              >
                Post
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const EditCustomers = ({
  handleShow,
  handleClose,
  show,
  editHandler,
  editData,
  changePic,
}) => {
  const { register, handleSubmit, reset } = useForm();
  let [pics, setImg] = useState(null);

  let [name, setname] = useState("");

  let [plateid, setplateid] = useState("");

  let [type, settype] = useState("");

  let [brand, setbrand] = useState("");

  let [model, setmodel] = useState("");

  let [color, setcolor] = useState("");

  let [phone, setphone] = useState("");

  let [dob, setdob] = useState("");

  let [gender, setgender] = useState("");

  let [note, setnote] = useState("");

  const editToDB = async (body) => {
    toast("Processing Request");

    let bodyData = {
      name: name ? name : editData.name,

      plateid: plateid ? plateid : editData.plateid,

      type: type ? type : editData.type,

      brand: brand ? brand : editData.brand,

      model: model ? model : editData.model,

      color: color ? color : editData.color,

      phone: phone ? phone : editData.phone,

      dob: dob ? dob : editData.dob,

      gender: gender ? gender : editData.gender,

      note: note ? note : editData.note,

      // tableID: editData.tableID,
    };

    // console.log("editData", bodyData);

    editHandler(bodyData, editData.tableID, "cars");

    setname("");
    setplateid("");
    settype("");
    setbrand("");
    setmodel("");
    setcolor("");
    setphone("");
    setdob("");
    setgender("");
    setnote("");
  };

  const changePicHandler = () => {
    let formData = new FormData();
    formData.append(`pic`, pics);
    changePic(formData, editData.tableID, "cars");
  };

  return (
    <>
      <ToastContainer />
      <Button onClick={handleShow} variant="success">
        <i className={"fas fa-edit"}> </i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"EDIT CUSTOMER"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(editToDB)}
            className="needs-validation"
            noValidate=""
          >
            <div className="form-group">
              <label htmlFor="name"> Name </label>
              <input
                type="text"
                {...register("name")}
                className="form-control"
                name="name"
                tabIndex="1"
                placeholder="Enter customer full name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Car Plate Number *</label>
              <input
                type="text"
                {...register("plateid")}
                className="form-control"
                name="plateid"
                tabIndex="1"
                placeholder="Enter the car plate number"
                onChange={(e) => setplateid(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Car Type</label>
              <input
                type="text"
                {...register("type")}
                className="form-control"
                name="type"
                tabIndex="1"
                placeholder="eg Bike, Tricycle, Saloon car, Jeep, SUV, pick-up, etc"
                onChange={(e) => settype(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand">Car Brand </label>
              <input
                type="text"
                {...register("brand")}
                className="form-control"
                name="brand"
                tabIndex="1"
                placeholder="eg Mercedes Benz, Toyora, Hyundia, etc"
                onChange={(e) => setbrand(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Car Model </label>
              <input
                type="text"
                {...register("model")}
                className="form-control"
                name="model"
                tabIndex="1"
                placeholder="eg Camry, Corolla, Sienna, Hillux, etc"
                onChange={(e) => setmodel(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Car Color </label>
              <input
                type="text"
                {...register("color")}
                className="form-control"
                name="color"
                tabIndex="1"
                placeholder="eg red, black"
                onChange={(e) => setcolor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">WhatsApp or Phone Number</label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                className="form-control"
                name="phone"
                tabIndex="1"
                placeholder="Enter phone number"
                onChange={(e) => setphone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob"
                type="date"
                required
                {...register("dob")}
                className="form-control"
                name="dob"
                tabIndex="1"
                onChange={(e) => setdob(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender </label>
              <select
                type="hidden"
                {...register("gender")}
                className="form-control"
                name="gender"
                tabIndex="1"
                onChange={(e) => setgender(e.target.value)}
              >
                <option selected={true} value="Male">
                  Male
                </option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="note">Add Note </label>
              <input
                id="note"
                type="text"
                {...register("note")}
                className="form-control"
                name="note"
                tabIndex="1"
                onChange={(e) => setnote(e.target.value)}
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="pic"> Attach profile pic </label>
              <input
              
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                
                className="form-control"
                
              />
            </div> */}

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                tabIndex="4"
              >
                Post
              </button>
            </div>
          </form>

          <form
            onSubmit={handleSubmit(changePicHandler)}
            className="needs-validation"
            noValidate=""
          >
            <Modal.Title> {"CHNAGE CUSTOMER PICTURE"} </Modal.Title>

            <div className="form-group">
              <label htmlFor="pic"> Attach profile pic </label>
              <input
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                tabIndex="4"
              >
                Post
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const AddSales = ({
  handleShow,
  handleClose,
  show,
  title,
  submitSalesData,
  reservedServices,
  reservedWorkers,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const addCarRecords = (body) => {
    // console.log("reservedWorkers", reservedWorkers);
    toast("Processing Request");
    // body.plateid.toLowerCase();
    let formattedBody = {
      ...body,
      plateid: body.plateid.toLowerCase(),
    };
    submitSalesData(formattedBody);
    reset();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {title}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Enter Car Washed or Sales </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(addCarRecords)}
            className="needs-validation"
            noValidate=""
          >
            <div className="form-group">
              <label htmlFor="plateid">Car Plate Number</label>
              <input
                type="text"
                onKeyUp={"this.value = this.value.toLowerCase();"}
                {...register("plateid")}
                className="form-control"
                name="plateid"
                tabIndex="1"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Car Type</label>
              <input
                type="text"
                {...register("type")}
                className="form-control"
                name="type"
                tabIndex="1"
                placeholder="eg Bike, Tricycle, Saloon car, Jeep, SUV, pick-up, etc"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">WhatsApp or Phone Number</label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                className="form-control"
                name="phone"
                tabIndex="1"
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Washed / Carried Out By * </label>
              <select
                {...register("workerid")}
                name="workerid"
                className="form-control"
                required
              >
                {reservedWorkers &&
                  reservedWorkers.map((items, index) => {
                    return (
                      <option value={items.tableID}>
                        {items?.firstName +
                          " " +
                          items?.middleName +
                          " " +
                          items?.lastName}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="form-group">
              <label>Attended By * </label>
              <select
                {...register("attendedBy")}
                name="attendedBy"
                className="form-control"
                required
              >
                {reservedWorkers &&
                  reservedWorkers.map((items, index) => {
                    return (
                      <option value={items.tableID}>
                        {items?.firstName +
                          " " +
                          items?.middleName +
                          " " +
                          items?.lastName}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="form-group">
              <label>Car wash type or sales type </label>
              <select
                {...register("servType")}
                name="servType"
                className="form-control"
                required
              >
                {reservedServices &&
                  reservedServices.map((items, index) => {
                    return <option value={items.name}>{items.name}</option>;
                  })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="amount"> Amount * </label>
              <input
                type="text"
                {...register("amount")}
                className="form-control"
                name="amount"
                tabIndex="1"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label> Type of payment </label>
              <select
                {...register("payType")}
                name="payType"
                className="form-control"
                required
              >
                <option value="cash">Select payment type</option>
                <option value="cash">Cash</option>
                <option value="transfer">transfer</option>
                <option value="company paid">company paid</option>
              </select>
            </div>

            <div className="form-group">
              {reservedWorkers?.length > 0 ? (
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    tabIndex="4"
                  >
                    Post
                  </button>
                </div>
              ) : (
                <h2>
                  Kindly Add employee before adding car wash records or sales
                  records
                </h2>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const EditSales = ({
  status,
  handleShow,
  handleClose,
  show,
  editHandler,
  editData,
  reservedWorkers,
  reservedServices,
}) => {
  const { register, handleSubmit, reset } = useForm();

  let [plateid, setplateid] = useState("");

  let [type, settype] = useState("");

  let [phone, setphone] = useState("");

  let [workerid, setworkerid] = useState("");

  let [attendedBy, setattendedBy] = useState("");

  let [servType, setservType] = useState("");

  let [amount, setamount] = useState("");

  let [payType, setpayType] = useState("");

  const editToDB = async (body) => {
    toast("Processing Request");

    let bodyData = {
      plateid: editData.plateid,
      type: editData.type,
      phone: editData.phone,
      workerid: editData.workerid,
      attendedBy: editData.attendedBy,
      servType: editData.servType,
      amount: editData.amount,
      payType: editData.payType,
      tableID: editData.tableID,
    };

    let realData = {
      // type: type ? type : bodyData.type,
      // phone: phone ? phone : bodyData.phone,
      workerid: workerid ? workerid : bodyData.workerid,
      attendedBy: attendedBy ? attendedBy : bodyData.attendedBy,
      servType: servType ? servType : bodyData.servType,
      amount: amount ? amount : bodyData.amount,
      payType: payType ? payType : bodyData.payType,
      // carid,
    };
    // console.log("finding ae==sakes ", bodyData)
    editHandler(realData, bodyData.tableID, "carsrecord");
    reset();

    setplateid("");
    settype("");
    setphone("");
    setworkerid("");
    setattendedBy("");
    setservType("");
    setamount("");
    setpayType("");
  };

  return (
    <>
      <ToastContainer />
      <Button onClick={handleShow} variant={"success"}>
        <i className={"fas fa-edit"}> </i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"EDIT SALES"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(editToDB)}
            className="needs-validation"
            noValidate=""
          >
            {/* <div className="form-group">
              <label htmlFor="plateid">Car Plate Number</label>
              <input
                type="text"
                onKeyUp={"this.value = this.value.toLowerCase();"}
                {...register("plateid")}
                className="form-control"
                name="plateid"
                tabIndex="1"
                autoFocus
                onChange={(e) => setplateid(e.target.value)}
              />
            </div> */}

            {/* <div className="form-group">
              <label htmlFor="type">Car Type</label>
              <input
                type="text"
                {...register("type")}
                className="form-control"
                name="type"
                tabIndex="1"
                placeholder="eg Bike, Tricycle, Saloon car, Jeep, SUV, pick-up, etc"
                onChange={(e) => settype(e.target.value)}
              />
            </div> */}

            {/* <div className="form-group">
              <label htmlFor="phone">WhatsApp or Phone Number</label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                className="form-control"
                name="phone"
                tabIndex="1"
                placeholder="Enter phone number"
                onChange={(e) => setphone(e.target.value)}
              />
            </div> */}

            <div className="form-group">
              <label>Washed / Carried Out By * </label>
              <select
                {...register("workerid")}
                name="workerid"
                className="form-control"
                required
                onChange={(e) => setworkerid(e.target.value)}
              >
                {reservedWorkers &&
                  reservedWorkers.map((items, index) => {
                    return (
                      <option value={items.tableID}>
                        {items?.firstName +
                          " " +
                          items?.middleName +
                          " " +
                          items?.lastName}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="form-group">
              <label>Attended By * </label>
              <select
                {...register("attendedBy")}
                name="attendedBy"
                className="form-control"
                required
                onChange={(e) => setattendedBy(e.target.value)}
              >
                {reservedWorkers &&
                  reservedWorkers.map((items, index) => {
                    return (
                      <option value={items.tableID}>
                        {items?.firstName +
                          " " +
                          items?.middleName +
                          " " +
                          items?.lastName}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="form-group">
              <label>Car wash type or sales type </label>
              <select
                {...register("servType")}
                name="servType"
                className="form-control"
                onChange={(e) => setservType(e.target.value)}
              >
                {reservedServices &&
                  reservedServices.map((items, index) => {
                    return <option value={items.name}>{items.name}</option>;
                  })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="amount"> Amount * </label>
              <input
                type="text"
                {...register("amount")}
                className="form-control"
                name="amount"
                tabIndex="1"
                autoFocus
                onChange={(e) => setamount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label> Type of payment </label>
              <select
                {...register("payType")}
                name="payType"
                className="form-control"
                onChange={(e) => setpayType(e.target.value)}
              >
                <option value="cash">Select payment type</option>
                <option value="cash">Cash</option>
                <option value="transfer">transfer</option>
                <option value="company paid">company paid</option>
              </select>
            </div>

            <div className="form-group">
              {reservedWorkers?.length > 0 ? (
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    tabIndex="4"
                  >
                    Post
                  </button>
                </div>
              ) : (
                <h2>
                  Kindly Add employee before adding car wash records or sales
                  records
                </h2>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const AddExpenses = (
  { handleShow, handleClose, show, submitCarExpenses },
  ...props
) => {
  const { register, handleSubmit, reset } = useForm();

  const addCarExpenses = (body) => {
    toast("Processing Request");
    submitCarExpenses(body);
    reset();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Expenses
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Create Expenses </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(addCarExpenses)}
            className="needs-validation"
            noValidate=""
          >
            <div className="form-group">
              <label htmlFor="amt">Amount</label>
              <input
                type="text"
                {...register("amt")}
                className="form-control"
                name="amt"
                tabIndex="1"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="purpose">Purpose of Expenses</label>
              <input
                type="text"
                {...register("purpose")}
                className="form-control"
                name="purpose"
                tabIndex="1"
              />
            </div>

            <div className="form-group">
              <label> Type of Expenses </label>
              <select
                {...register("type")}
                name="type"
                className="form-control"
              >
                <option value="MD Expenses">MD Expenses</option>
                <option value="Manager Expenses"> Manager Expenses </option>
                <option value="Salary Advance "> Salary Advance </option>
              </select>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                tabIndex="4"
              >
                Post
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const EditExpenses = ({
  handleShow,
  handleClose,
  show,
  editHandler,
  editData,
}) => {
  const { register, handleSubmit, reset } = useForm();

  let [EAmt, setEamt] = useState("");
  let [purpose, setPurpose] = useState("");
  let [EType, setType] = useState("");

  const editToDB = async (body) => {
    toast("Processing Request");

    let bodyData = {
      purpose: editData.purpose,
      amt: editData.amt,
      type: editData.type,
      tableID: editData.tableID,
    };

    let realData = {
      purpose: purpose ? purpose : bodyData.purpose,
      amt: EAmt ? EAmt : bodyData.amt,
      type: EType ? EType : bodyData.type,
    };
    console.log("editData", editData);

    editHandler(realData, bodyData.tableID, "expenses");
    reset();
    setPurpose("");
    setEamt("");
    setType("");
  };

  return (
    <>
      <ToastContainer />
      <Button onClick={handleShow} variant="success">
        <i className={"fas fa-edit"}> </i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"EDIT EXPENSES"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(editToDB)}
            className="needs-validation"
            noValidate=""
          >
            <div className="form-group">
              <label htmlFor="amt">Amount</label>
              <input
                type="text"
                {...register("amt")}
                className="form-control"
                name="amt"
                tabIndex="1"
                autoFocus
                onChange={(e) => setEamt(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="purpose">Purpose of Expenses</label>
              <input
                type="text"
                {...register("purpose")}
                className="form-control"
                name="purpose"
                tabIndex="1"
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label> Type of Expenses </label>
              <select
                {...register("type")}
                name="type"
                className="form-control"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="MD Expenses">MD Expenses</option>
                <option value="Manager Expenses"> Manager Expenses </option>
                <option value="Salary Advance "> Salary Advance </option>
              </select>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                tabIndex="4"
              >
                Post
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const AddManager = (
  { handleShow, handleClose, show, submitManager, workerList, branchesArr },
  ...props
) => {
  const { register, handleSubmit, reset } = useForm();

  const adManager = (body) => {
    // console.log("manager data ", body);
    toast("Processing Request");
    let realData = {
      ...body,
      number: body.number.split("&")[0],
      address: body.number.split("&")[1],
    };
    // console.log("manager data ", realData);
    submitManager(realData);
    reset();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Manager
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Create Manager </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(adManager)}
            className="needs-validation"
            noValidate=""
          >
            <div className="form-group">
              <label>Select employee to make manager </label>
              <select
                {...register("first_name")}
                name="first_name"
                className="form-control"
                required
              >
                {workerList &&
                  workerList.map((items, index) => {
                    return (
                      <option
                        value={
                          items?.firstName +
                          " " +
                          items?.middleName +
                          " " +
                          items?.lastName
                        }
                      >
                        {items?.firstName +
                          " " +
                          items?.middleName +
                          " " +
                          items?.lastName}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="form-group">
              <label>Select Branch this manager should manage </label>
              <select
                {...register("number")}
                name="number"
                className="form-control"
                required
              >
                {branchesArr &&
                  branchesArr.map((items, index) => {
                    return (
                      <option
                        value={items?.id + "&" + items?.name}
                        id={`${items?.name}`}
                      >
                        {items?.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email"> Create Email / Username </label>
              <input
                type="text"
                {...register("email")}
                className="form-control"
                name="email"
                tabIndex="1"
                autoFocus
                placeholder="Enter email / username for manager"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password"> Create Password</label>
              <input
                type="text"
                {...register("password")}
                className="form-control"
                name="password"
                tabIndex="1"
                autoFocus
                placeholder="Enter password for manager"
              />
            </div>

            {branchesArr?.length > 0 && workerList?.length > 0 ? (
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  tabIndex="4"
                >
                  Post
                </button>
              </div>
            ) : (
              <h2>
                Kindly Add employee before adding car wash records or sales
                records
              </h2>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const EditManager = ({
  handleShow,
  handleClose,
  show,
  editHandler,
  workerList,
  editData,
  branchesArr,
}) => {
  const { register, handleSubmit, reset } = useForm();
  let [address, setAddress] = useState("");
  let [first_name, setfirst_name] = useState("");
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [number, setnumber] = useState("");

  const editManager = async (body) => {
    toast("Processing Request");

    let bodyData = {
      address: address ? address : editData.address,
      first_name: first_name ? first_name : editData.first_name,
      email: email ? email : editData.email,
      password: password ? password : editData.password,
      number: number ? number : editData.number,
    };

    editHandler(bodyData, editData.tableID, "admin");

    reset();
    setAddress("");
    setfirst_name("");
    setemail("");
    setpassword("");
    setnumber("");
  };

  return (
    <>
      <ToastContainer />
      <Button onClick={handleShow} variant="success">
        <i className={"fas fa-edit"}> </i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"EDIT EXPENSES"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(editManager)}
            className="needs-validation"
            noValidate=""
          >
            <div className="form-group">
              <label>Select employee to make manager </label>
              <select
                {...register("first_name")}
                name="first_name"
                className="form-control"
                onChange={(e) => setfirst_name(e.target.value)}
              >
                {workerList &&
                  workerList.map((items, index) => {
                    return (
                      <option
                        value={
                          items?.firstName +
                          " " +
                          items?.middleName +
                          " " +
                          items?.lastName
                        }
                      >
                        {items?.firstName +
                          " " +
                          items?.middleName +
                          " " +
                          items?.lastName}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="form-group">
              <label>Select Branch this manager should manage </label>
              <select
                {...register("number")}
                name="number"
                className="form-control"
                required
                onChange={(e) => setAddress(e.target.value)}
              >
                {branchesArr &&
                  branchesArr.map((items, index) => {
                    return <option value={items?.id}>{items?.name}</option>;
                  })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email"> Create Email / Username </label>
              <input
                type="text"
                {...register("email")}
                className="form-control"
                name="email"
                tabIndex="1"
                autoFocus
                placeholder="Enter email / username for manager"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password"> Create Password</label>
              <input
                type="text"
                {...register("password")}
                className="form-control"
                name="password"
                tabIndex="1"
                autoFocus
                placeholder="Enter password for manager"
              />
            </div>

            {branchesArr?.length > 0 && workerList?.length > 0 ? (
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  tabIndex="4"
                >
                  Post
                </button>
              </div>
            ) : (
              <h2>
                Kindly Add employee before adding car wash records or sales
                records
              </h2>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
