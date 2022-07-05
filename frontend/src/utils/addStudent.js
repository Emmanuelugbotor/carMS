import { Button, Modal, ModalBody } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';

const PGModal = ({
  status,
  managerid,
  handleShow,
  handleClose,
  showCarRecord,
  user,
  submitWorkerData,
  show,
  showWorkers,
  hideWorkers,
  handleShowWorkers,
  title,
  submitCarData,
}) => {

  const { register, handleSubmit, reset } = useForm();
  
  const addCarsToDB = (body) => {
    toast("processing request");
    let bodyData = {
      dob: body.dob,
      email: body.email,
      gender: body.gender,
      managerid: body.managerid,
      name: body.name,
      phone: body.phone,
      plateid: body.plateid,
      createdAt: moment().format('YYYY-MM-DD'),
    };
    submitCarData(bodyData);
    reset();

  }


  const addWorkersToDB = (body) => {
    toast("processing request");
    let bodyDat = {
      managerid: managerid,
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: body.address,
    };
    submitWorkerData(bodyDat);
    reset();

  }

  return (
    <>
    <ToastContainer/>
      <Button variant="primary" onClick={handleShowWorkers}>
        Add Workers
      </Button>
      <small style={{ margin: "2px" }}></small>
      <Button variant="primary" onClick={handleShow}>
        Add Cars
      </Button>
      <small style={{ margin: "2px" }}></small>
      <Button variant="primary" onClick={showCarRecord}>
        {title}
      </Button>

      {/* REGISTER CARS */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"REGISTER" + " " + "CAR"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(addCarsToDB)}
            class="needs-validation"
            noValidate=""
          >
            {/* {courseErr && <h4> {courseErr} </h4>}

            {courses && <h4> {courses.msg} </h4>} */}

            <div class="form-group">
              <input
                type="hidden"
                {...register("managerid")}
                class="form-control"
                name="managerid"
                tabIndex="1"
                required
                value={managerid}
              />
            </div>

            <div class="form-group">
              <label htmlFor="email">Car Plate Number *</label>
              <input
                type="text"
                {...register("plateid")}
                class="form-control"
                name="plateid"
                tabIndex="1"
                required
                autoFocus
                placeholder="Enter the car plate number"
              />
            </div>

            <div class="form-group">
              <label htmlFor="name">Car Owner's Name *</label>
              <input
                type="text"
                {...register("name")}
                class="form-control"
                name="name"
                tabindex="1"
                required
                placeholder="Enter the car owner's full name"
                // pattern="[a-z]{3}/[a-z]{3}/[0-9]{4}/[0-9]{3}"
              />
            </div>

            <div class="form-group">
              <label htmlFor="gender">Geneder *</label>

              <select
                type="hidden"
                {...register("gender")}
                class="form-control"
                name="gender"
                tabIndex="1"
                required
              >
                <option selected={true} value="Male">
                  Male
                </option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div class="form-group">
              <label htmlFor="phone">
                Car Owner's WhatsApp or Phone Number *{" "}
              </label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                class="form-control"
                name="phone"
                tabindex="1"
                required
                placeholder="Enter phone of car owner"
              />
            </div>

            <div class="form-group">
              <label htmlFor="email">Car Owner's Email ( Optional ) </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                class="form-control"
                name="email"
                tabindex="1"
                required
                placeholder="Enter email of car owner"
              />
            </div>

            <div class="form-group">
              <label htmlFor="dob">
                Car Owner's Date of Birth ( Optional ){" "}
              </label>
              <input
                id="dob"
                type="date"
                {...register("dob")}
                class="form-control"
                name="dob"
                tabindex="1"
                required
              />
            </div>

            <div class="form-group">
              <button
                type="submit"
                class="btn btn-primary btn-lg btn-block"
                tabindex="4"
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

      {/* REGISTER WORKERS */}

      <Modal show={showWorkers} onHide={hideWorkers}>
        <Modal.Header closeButton>
          <Modal.Title> {"REGISTER" + " " + "WORKERS"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(addWorkersToDB)}
            class="needs-validation"
            noValidate=""
          >
            {/* {error && <h4> {error} </h4>}
            {studentInfo && (
              <h4 style={{ color: "green" }}> {studentInfo.msg} </h4>
            )} */}

            <div class="form-group">
              <input
                type="hidden"
                {...register("managerid")}
                class="form-control"
                name="managerid"
                tabIndex="1"
                required
                value={managerid}
              />
            </div>

            <div class="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                {...register("name")}
                class="form-control"
                name="name"
                tabIndex="1"
                required
                autoFocus
                placeholder="Enter worker's full name"
              />
            </div>

            <div class="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="text"
                {...register("phone")}
                class="form-control"
                name="phone"
                required
                id="phone"
                placeholder="Enter Worker's Phone Number"
              />
            </div>

            <div class="form-group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                {...register("address")}
                class="form-control"
                name="address"
                id="address"
                required
                placeholder="Worker's Address"
              />
            </div>

            <div class="form-group">
              <label htmlFor="email">Email (Optional) </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                class="form-control"
                name="email"
                tabindex="1"
                placeholder="Enter Workers Email"
                required
              />
            </div>

            <div class="form-group">
              <button
                type="submit"
                class="btn btn-primary btn-lg btn-block"
                tabindex="4"
              >
                Post
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideWorkers}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PGModal;
