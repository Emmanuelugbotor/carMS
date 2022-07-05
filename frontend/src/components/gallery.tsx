import React from "react";
import "../App.css";

const GalleryBanner = () => {
  return (
    
    <section className="section-meal">
        <button className="btn btn-outline-success" 
              style={{width: "100%", marginBottom: "5px",  color: 'white',
               backgroundColor: '#14fd1cba', borderColor: '#14fd1cba'}} type="button">
                   Our Products </button>
        <div className="div">

    
        <ul className="meals-showcase clearfix" style={{marginBottom: "0px"}}>
            <li>
                <figure className="photo-meal">
                    <img className="img-fluid" src="images/img1.jfif"  alt="delicious meal 1"/>
                </figure>
            </li>
            <li>
                <figure className="photo-meal">
                    <img className="img-fluid" src="images/Oranges.jpg" alt="delicious meal 2"/>
                </figure>
            </li>
            <li>
                <figure className="photo-meal">
                    <img className="img-fluid" src="images/onions22.jpg" alt="delicious meal 3"/>
                </figure>
            </li>
            <li>
                <figure className="photo-meal">
                    <img className="img-fluid" src="images/tatashe24.jpg" alt="delicious meal 4"/>
                </figure>
            </li>
        </ul>
        <ul className="meals-showcase clearfix">
            <li>
                <figure className="photo-meal">
                    <img className="img-fluid" src="images/bg2.jpg" alt="delicious meal 1"/>
                </figure>
            </li>
            <li>
                <figure className="photo-meal">
                    <img className="img-fluid" src="images/bg4.jpg" alt="delicious meal 2"/>
                </figure>
            </li>
            <li>
                <figure className="photo-meal">
                    <img className="img-fluid" src="images/bg3.jpg" alt="delicious meal 3"/>
                </figure>
            </li>
            <li>
                <figure className="photo-meal">
                    <img className="img-fluid" src="images/bg4.jpg"  alt="delicious meal 4"/>
                </figure>
            </li>
        </ul>
        </div>
        
    </section>

  );
};

export default GalleryBanner;
