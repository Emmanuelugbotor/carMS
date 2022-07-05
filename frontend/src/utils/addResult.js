import { Button, Modal, ModalBody } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addResult } from "../redux/actions/usersAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";

const AddCarRecords = ({
  status,
  managerid,
  handleShow,
  handleClose,
  carid,
  user,
  workerList,
  show,
  submitCarRecords,
}) => {

  const { register, handleSubmit, reset } = useForm();

  const addCarRecords = (body) => {
    let bodyData = {
      managerid: managerid,
      carid: carid,
      workerid: body.workerid,
      amt: body.amt,
      createdAt: moment().format("YYYY-MM-DD"),
    };
    submitCarRecords(bodyData);
    reset();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className={"fas fa-plus"}> </i>
        {/* Add */}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"ADD " + "CAR " + "RECORD "} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(addCarRecords)}
            class="needs-validation"
            noValidate=""
          >
            {/* {resErr && <h4> {resErr} </h4>}
            {result && <h4> {result.msg} </h4>} */}

            <div class="form-group">
              <label htmlFor="email">Cost of washing this car *</label>
              <input
                type="number"
                {...register("amt")}
                class="form-control"
                name="amt"
                tabIndex="1"
                required
                autoFocus
                placeholder="Enter the amount paid by the car owner"
              />
            </div>

            <div className="form-group">
              <label>Select worker that washed this car * </label>
              <select
                {...register("workerid")}
                name="workerid"
                class="form-control"
              >
                {workerList &&
                  workerList.map((items, index) => {
                    return <option value={items.id}>{items.name}</option>;
                  })}
              </select>
            </div>

            {workerList && workerList.length > 0 ? (
              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg btn-block"
                  tabindex="4"
                >
                  Post
                </button>
              </div>
            ) : (
              <h2>Kindly Add worker before adding car records</h2>
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

export default AddCarRecords;
