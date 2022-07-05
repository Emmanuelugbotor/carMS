import React from 'react'
import bg from "../assets/images/rug.jpg";
export default function Message() {
    return (
        <div className="message" id="contact">
            <h1>Contact Us </h1>
            <p>Write us and we ensure to responds to your mail swiftly</p>
            <div className="form_wrapper" style={{background:`url(${bg})`}}>
                <h1>Send <span>Message</span> </h1>
                <form action="">
                    <div className="input_wrapper">
                        <input type="text" placeholder='name' />
                        <input type="text" name="" id="" placeholder='phone number' />
                    </div>
                    <input type="email" name="" id="" placeholder='Email' />
                    <textarea name="" id="" cols="30" rows="10" placeholder='Write your message here...'></textarea>
                    <button className="btn">
                        <span>Send Request</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
