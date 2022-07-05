import React from "react";
import { Link } from "react-router-dom";
const AboutContainer = () => {
  
  return (
    <>
    <section className="about__section">
    <div className="about__section-video">
        <video autoPlay={true} loop={true}>
            <source src="/img/production ID_3816531.mp4" type="video/mp4" />
        </video>
        <div className="about__section-text">
            
            <h1>About Us  </h1>

        </div>
        </div>
</section>
<div className="about__section-text-1">
    <h3 className="dressing__font">About <span className="green"> One</span>FarmTech</h3>
   
    <p style={{textAlign: "left", fontSize: "15px"}} > 
        Onefarmtech is an agritech company that is committed to empowering farmers through leveraging technology.
        The Platform offers solutions to a diverse range of agricultural challenges to consequently improve the end-to-end efficiency of the agro supply chain in Nigeria and beyond.
        We connect hundreds of thousands of local farmers with prospective buyers for seemly agricultural trading activities
        
    </p>
</div>
<div className="about__section-content-1">
    <div className="about__section-content-1-img">
        <img src="/img/bg3.jpg" alt="Onefarmtech" />
    </div>
    <div className="about__section-content-1-text">
        <h1>Our Vision</h1>
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam consequuntur ab
            corporis reprehenderit, error quos id. Praesentium temporibus sint veniam laudantium ut minima
            quis illum quas, provident maiores rerum recusandae a incidunt tempora quos fugiat eligendi odit 
            quasi cupiditate. Quibusdam similique labore amet sit tempora eveniet ipsam, doloribus cum ab adipisci aliquid,
            ratione alias earum nihil, nulla mollitia iste necessitatibus quae aliquam perspiciatis ducimus recusandae modi.
            Ipsa consequuntur cumque maxime.
        </p>
    </div>

</div>
<div className="about__section-content-2">
    <div className="about__section-content-2-text">
        <h1>Our Mission</h1>
        <p>Our mission Is To sustainly make the pleasurable and benefit of agricultural produces accessible to many by providing agricultural selfless services to everyone.
            We aim at providing and delivering fresh quality agricultural produces to your doorsteps, with our high quality customer services we aimed to serve you better.
           </p>
    </div>
    <div className="about__section-content-2-img">
        <img src="/img/bg2.jpg" alt="onefarmtech" />
    </div>
</div>
<div className="about__section-content-3">
    <div className="about__section-content-3-img">
        <img src="/img/bg4.jpg" alt="onefarmtech" />
    </div>
    <div className="about__section-content-3-text">
        <h1>Innovation</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam consequuntur ab
             corporis reprehenderit, error quos id. Praesentium temporibus sint veniam laudantium ut minima
              quis illum quas, provident maiores rerum recusandae a incidunt tempora quos fugiat eligendi odit 
              quasi cupiditate. Quibusdam similique labore amet sit tempora eveniet ipsam, doloribus cum ab adipisci aliquid, ratione alias earum nihil, nulla mollitia iste 
            necessitatibus quae aliquam perspiciatis ducimus recusandae modi. Ipsa consequuntur cumque maxime.</p>
    </div>
</div>
    </>
  );
};
export default AboutContainer;
