import axios from "axios";
import url from "../../constant/url";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut, sectiondata } from "../../redux/actions/usersAction";


const PGNav=()=>{

    const history = useHistory();
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignIn);

    const [errorMsg, setErrMsg] = useState("");
    const [sections, setSection] = useState([]);

    const { userInfo } = userSignin;
    const logOut=()=> {
      dispatch(signOut())
      history.push("/adminlogin")
    }

    const getSection = (sectionid) => dispatch(sectiondata(sectionid, userInfo));


    
  useEffect(() => {

    if (userInfo.length  == 0 ) {
      history.push("/adminlogin");
    } else {
      axios
        .get(`${url}getsection`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((res) => {
          setSection(res.data.items);
        })
        .catch((error) =>  setErrMsg(error));
      }
    }, [userInfo, sections]);

    return (
        <div className="main-sidebar sidebar-style-3">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <a hreSf="index-2.html">UNICAL CSC PG PORTAL</a>
          </div>
          <div className="sidebar-brand sidebar-brand-sm">
            <a hreSf="index-2.html">CP</a>
          </div>
          <ul className="sidebar-menu">
            <li className="menu-header">DASHBOARD</li>
            <li className="dropdown active">
              <a href="#" className="nav-link has-dropdown" >
                <i className="fas fa-fire"></i>
                <span>SECTIONS</span>
              </a>
              <ul className="dropdown-menu">
                {sections
                  ? sections.map((items) => {
                      return (
                        <li className="active">
                          <button onClick={() => getSection(items.sectionid)} className="nav-link w-100 bg-primary text-white" >
                            {items.sectionid}
                          </button>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </li>

            <li className="menu-header">Starter</li>
            <li className="dropdown">
              <a
                href="#"
                className="nav-link has-dropdown"
                data-toggle="dropdown"
              >
                <i className="fas fa-columns"></i> <span>Pages</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="nav-link" to="/admindashboard">
                    Dashboard
                  </Link>
                  <Link className="nav-link" to="/editor">
                    Editor
                  </Link>
                </li>

                <li>
                  <Link className="nav-link" onClick={()=>logOut()}>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>

            
          </ul>
        </aside>
      </div>

    )
}

export default PGNav;