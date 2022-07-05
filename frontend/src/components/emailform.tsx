import React from "react";


const EmailForm = () => {
  return (
    <section
      id="Contact"
      className=""
      style={{ height: "100px", backgroundColor: "#6c757d" }}
    >
      <div className="container">
        <form className="d-flex" style={{ padding: "30px" }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Subscribe to our newsletters"
            aria-label="Search"
          />
          <button
            className="btn btn"
            style={{
              backgroundColor: "#14fd1cba",
              color: "white",
              borderColor: "#14fd1cba",
            }}
            type="button"
          >
            Submit{" "}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailForm;
