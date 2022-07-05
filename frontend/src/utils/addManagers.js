import { Button, Modal, ModalBody } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagersModal = ({
  status,
  handleShow,
  handleClose,
  show,
  addManager,
}) => {
  
  const { register, handleSubmit, reset } = useForm();

  const addManagersToDB = async (body) => {
       toast("Processing Request");
       addManager(body);
       reset();
  };

  return (
    <>
    <ToastContainer/>
      <Button variant="primary" onClick={handleShow} style={{width: "100%"}} >
        Create Branch
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title> {"ADD BRANCHES "} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(addManagersToDB)}
            class="needs-validation"
            noValidate=""
          >
            {/* {msg && <h4> {msg} </h4>} */}
            {/* {students && <h4 style={{ color: "green" }}> {students.msg} </h4>} */}

            <div class="form-group">
              <label htmlFor="email">Branch Name *</label>
              <input
                type="text"
                {...register("name")}
                class="form-control"
                name="name"
                tabIndex="1"
                required
                autoFocus
                placeholder="Enter Manager's Name"
              />
            </div>
            

            <div class="form-group">
              <label htmlFor="address">Branch Location *</label>
              <input
                type="text"
                {...register("address")}
                class="form-control"
                name="address"
                id="address"
                required
                placeholder="Location of this Branch"
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
    </>
  );
};

export default ManagersModal;
