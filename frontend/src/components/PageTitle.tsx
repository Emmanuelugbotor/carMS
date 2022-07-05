// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.bundle.min.js"
// import "../App.css"
import { Link } from "react-router-dom";
const PageTitle = (props: any) => {
  return (
    <div className="page-top-info">
      <div className="container" style={{ marginTop: 100 }}>
        <h4>{props.title}</h4>
        <div className="site-pagination">
          <Link to="/products"> <button className="btn btn-sm" style={{backgroundColor: "#14fd1cba", color: 'white', marginBottom: '20px'}}> go to market / </button> </Link>
        </div>
      </div>
    </div>
  ); 
};
export default PageTitle;
