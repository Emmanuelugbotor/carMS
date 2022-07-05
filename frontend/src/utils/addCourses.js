import { Button, Modal, ModalBody } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addCourses } from "../redux/actions/usersAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


const PGCourses = ({
  status,
  sectionid,
  handleShow,
  handleClose,
  css,
  user,
  show,
  onSubmit,
}) => {

  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  let { courses, loadCourse, courseErr } =  course;


  const { register, handleSubmit } = useForm();
  const addPGCourse = (body) => 
    {
        dispatch(addCourses(body, user));
    }
  


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {/* <i className={css ? css : "fas fa-dollar-sign"}> </i> */}
        Add Car
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {"ADD" + " " + status + " " + "COURSES"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(addPGCourse)}
            class="needs-validation"
            noValidate=""
          >
            
              {courseErr && <h4> { courseErr } </h4>}
              {courses && <h4> { courses.msg } </h4>}
            
            <div class="form-group">
              <input
                type="hidden"
                {...register("sectionid")}
                class="form-control"
                name="sectionid"
                tabindex="1"
                required
                value={sectionid}
              />
            </div>
            <div class="form-group">
              <input
                type="hidden"
                {...register("pgstatus")}
                class="form-control"
                name="pgstatus"
                tabindex="1"
                required
                value={status.toLowerCase()}
              />
            </div>

            <div class="form-group">
              <label htmlFor="email">Course Code*</label>
              <input
                type="text"
                {...register("coursecode")}
                class="form-control"
                name="coursecode"
                tabindex="1"
                required
                autofocus
                pattern="[a-z]{3}[0-9]{3}"
                maxLength="6"
                minLength={6}
                placeholder="csc611"
              />
            </div>

            <div class="form-group">
              <label htmlFor="email">Credit Load*</label>
              <input
                type="number"
                {...register("coursecredit")}
                class="form-control"
                name="coursecredit"
                tabindex="1"
                required
                placeholder="3"
              />
            </div>

            <div class="form-group">
              <label htmlFor="email"> Course Title* </label>
              <input
                type="text"
                {...register("coursetitle")}
                class="form-control"
                name="coursetitle"
                tabindex="1"
                required
                placeholder="Course Title"
              />
            </div>
            
            <div class="form-group">
              <label htmlFor="email"> Course Description </label>
              <input
                type="text"
                {...register("coursedescription")}
                class="form-control"
                name="coursedescription"
                tabindex="1"
                placeholder="Course Description"
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

export default PGCourses;
