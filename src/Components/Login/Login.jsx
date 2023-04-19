import React, { useContext, useState } from "react";
import "./Login.css";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import axios from "axios";
import validator from 'validator';
import * as BsIcons from 'react-icons/bs';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Loading from "../Loading/Loading";

const Login = () => {
    const {getLoggedIn} = useContext(AuthContext)
    const { loggedIn } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const validateEmail = (e) => {
        var email = e.target.value
        const regex = /^[a-zA-Z@.\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setEmail(e.target.value);
            if(!email){
                setEmailError('Required')
            }
            else if (validator.isEmail(email)) {
              setEmailError('')
            } else {
              setEmailError('Enter valid Email!')
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:4040/api/log/login",
            {
                email: email,
                password: password
            },
            {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            }).then((response) => {
                const userDetails = response.data;
                localStorage.setItem('admin', JSON.stringify(userDetails));
                setLoading(true);
                setTimeout(() => {
                    getLoggedIn();
                }, 2000);
            }).catch((error) => {
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 3000)
                setEmptyFields(error.response.data.emptyFields)
            })
        } catch (error) {
            setError(error);
        }
    }

    return (
        <>
            {loggedIn === false ?
                <>
                    { loading === false ?
                        (
                            <>
                                {error &&
                                    (
                                        <div className="loginerror_message">
                                            {error}
                                        </div>
                                    )
                                }         
                                <div className="login_container">
                                    <div className="login">
                                        <p>Login</p>
                                        <form onSubmit={handleSubmit}>
                                            <div className="login_field">
                                                <label>Email</label>
                                                <TextInput
                                                    type="text"
                                                    value={email}
                                                    onChange={validateEmail}
                                                    className = {`email ${emptyFields?.includes("email") ? "error" : ""}`}
                                                />
                                                <span className="login_email">
                                                    <p>{emailError}</p>
                                                </span>
                                            </div>
                                            <div className="login_field">
                                                <label>Password</label>
                                                <TextInput
                                                    type={passwordShown ? "text" : "password"}
                                                    value={password}
                                                    className = {emptyFields?.includes("password") ? "error" : ""}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                {passwordShown ? 
                                                    <BsIcons.BsEye className="hide_icon" onClick={() => setPasswordShown(false)}/> :
                                                    <BsIcons.BsEyeSlash className="hide_icon" onClick={() => setPasswordShown(true)}/>
                                                }
                                            </div>
                                            <Button type="submit">Login</Button>
                                        </form>
                                    </div>
                                </div>
                            </>
                        ) :
                        ( <div className="loading_circle"><Loading/></div> )
                    }
                </> :
                <Navigate replace to="/" />
            }
        </>
    )
}

export default Login;