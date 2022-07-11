import { useForm } from "react-hook-form"
import bg from "../assets/images/rug.jpg";
import Axios from "axios"
import url from "../constant/url";
import { useState } from "react";
import CircularIndeterminate from "./Loader/Loader"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Message() {
    const { handleSubmit, formState: { errors }, register } = useForm()
    const { onChange, ...rest } = register("")
    const [loading, setLoading] = useState(false)
    async function onSubmit(body) {
        const product = {
            name: body.fullName,
            email: body.email,
            message: body.textField,
            phone: body.phone
        }
        console.log(product)
        setLoading(true)
        try {
            const { data } = await Axios.post(`${url}feedbacks`, product)
            setLoading(false)
            console.log(data)
            toast( data?.message)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }

    }
    return (
        <>
            <ToastContainer />
            <div className="message" id="contact">
                <h1>Contact Us </h1>
                <p>Write us and we ensure to responds to your mail swiftly</p>
                <div className="form_wrapper" style={{ background: `url(${bg})` }}>
                    <h1>Send <span>Message</span> </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input_wrapper">
                            <div className="input__field">
                                <input type="text" placeholder='name' {...register("fullName", {
                                    required: "Full name is required",
                                    pattern: {
                                        value:
                                            /[a-zA-Z]{3,}/,
                                        message: "full name should be atleat three character long",
                                    }
                                })} />
                                {errors?.fullName && (
                                    <span className="error-red">{errors.fullName.message}</span>
                                )}
                            </div>
                            <div className="input__field">
                                <input type="text" name="" id="" placeholder='phone number' {
                                    ...register("phone", {
                                        required: "phone number is required",
                                        pattern: {
                                            value: /^0[897][10][0-9]{8}/,
                                            message: "wrong number format"
                                        }
                                    })
                                } />
                                {errors?.phone && (
                                    <span className="error-red">{errors.phone.message}</span>
                                )}
                            </div>


                        </div>
                        <div className="input__field">
                            <input
                                type="email"
                                name=""
                                id=""
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is Required",
                                    pattern: {
                                        value:
                                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: "Please enter valid email",
                                    },
                                })}
                            />
                            {errors?.email && (
                                <span className="error-red">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="input__field">
                            <textarea name="" id="" cols="30" rows="10" placeholder='Write your message here...'

                                {
                                ...register("textField", {
                                    required: "text field is required",
                                    pattern: {
                                        value: /[a-zA-Z0-9]{3,}/,
                                        message: "text field should not be empty"
                                    }
                                })
                                }></textarea>
                            {errors?.textField && (
                                <span className="error-red">{errors.textField.message}</span>
                            )}
                        </div>

                        <button className="btn">
                            {
                                loading ? <CircularIndeterminate /> : <span>Send Request</span>
                            }

                        </button>
                    </form>
                </div>
            </div>
        </>

    )
}
