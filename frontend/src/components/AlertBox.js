import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, addStudentToSection } from "../redux/actions/usersAction";

const Pgbutton = (props) => {
  let dispatch = useDispatch();

  let courseData = useSelector((state) => state.courseData);
  let { courseError, loadCourse, allCourses } = courseData;

  let { sectionid, courses,  studentResult, title  } = props;

  let [show, setShow] = useState(false);
  let [coursetitle, setCourseTitle] = useState("");
  let [coursecode, setCourseCode] = useState("");
  let [coursecredit, setCourseCredit] = useState(0);
  let [coursedescription, setCourseDescription] = useState("");
  let [courselecturer, setCourseLecturer] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addNewCourse = (event) => { 
    event.preventDefault();
    if (!sectionid) return null;
    let body = {
      coursetitle,
      sectionid,
      coursecode,
      coursecredit, 
      coursedescription,
      pgstatus: courses,
      courselecturer
    };
    dispatch(addCourse(body));
  };
  
  useEffect(() => {
    if (courseError || !loadCourse) {
      handleClose();
    } 
  }, [courseData, courseError, loadCourse, allCourses]);

  return (
    <>
    
        {(courses && courses !== "" && !studentResult) ? (
          <>
            <Button
              onClick={handleShow}
              className={
               courses == "msc"
                  ? "badge badge-warning" :
                   courses == "pgd" ? "badge badge-success" :    "badge badge-danger"
                  
              }
              style={{
               
                fontWeight: "bold",
              }}
            >
              Add {courses} courses
            </Button>
          </>
        ):(
            <Button
              onClick={()=>studentResult(courses, true)}
              className={
                courses == "pgd"
                  ? "badge badge-success"
                  : courses == "msc"
                  ? "badge badge-warning"
                  : courses == "phd"
                  ? "badge badge-danger"
                  : ""
              }
              style={{
               
                fontWeight: "bold",
              }}
            >
              View {courses} {title}
            </Button>

        )}
        

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add {courses} course</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="card">
            <form onSubmit={addNewCourse}>
              <div className="card-header">
                <h4>Course Data</h4>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Course Title </label>
                  <input
                    type="text"
                    onChange={(event) => setCourseTitle(event.target.value)}
                    className="form-control"
                    required
                    placeholder={"Introduction to software development"}
                  />
                </div>
                <div className="form-group">
                  <label>Course Code </label>
                  <input
                    type="text"
                    onChange={(event) =>  setCourseCode(event.target.value.toLowerCase().split(" ").join("")) }
                    className="form-control"
                    placeholder={`${'csc851'}`}
                    pattern="[A-Za-z]{3}[0-9]{3}"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Credit Load </label>
                  <input
                    type="number"
                    min={1}
                    max={9}
                    minLength={1}
                    maxLength={9}
                    pattern='[0-9]{2}'
                    onChange={(event) => setCourseCredit(parseInt(event.target.value))}
                    className="form-control"
                    required
                    placeholder="2"
                  />
                </div>
                <div className="form-group">
                  <label>Course Description</label>
                  <input
                    className="form-control"
                    onChange={(event) => setCourseDescription(event.target.value) }
                    type="text"
                    placeholder="Optional"
                  />
                </div>
                <div className="form-group mb-0">
                  <label>Course Lectural</label>
                  <input
                    className="form-control"
                    onChange={(event) => setCourseLecturer(event.target.value) }
                    type="text"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="card-footer text-right">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    (courses == "" && courses.length < 2) ||
                    (coursecredit >=9 || coursecredit == 0) ||
                    (coursecode == "" && coursecode.length < 4)
                      ? true
                      : false
                  }
                  style={{
                    width: "100%",
                    backgroundColor: "#563d7c",
                    borderColor: "#563d7c",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} style={{ width: "100%" }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Pgbutton;
