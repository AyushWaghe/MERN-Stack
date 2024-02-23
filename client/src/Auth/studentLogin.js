import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth.js';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons'; // Import the icon you want to use
import '../assets/Login.css'; 

const StudentLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState(""); // Define captcha state
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("Tryong");
            const res = await axios.post('http://localhost:8080/api/vit/auth/student/studentLogin', { email, password });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong');
        }
    };

    const handleCaptchaSubmit = () => {
        // Implement your captcha refresh logic here
    };

    return (
        <div className="Master">
            <div className="wrapper">
                <div className="loginDiv">
                    <div className="blueLine"></div>
                    <div className="loginTextDiv">
                        <p className="loginHeader">Login</p>
                    </div>
                </div>

                <div className="inputDiv">
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <label htmlFor="username"></label>
                                <input
                                    type="text"
                                    className="inputField"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="inputBox">
                                <label htmlFor="password"></label>
                                <input
                                    type="password"
                                    className="inputField"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="captcha">
                                <div className="preview">
                                    <div className="captchValueDiv">
                                        {/* <span className="captcha-value">asddd</span> */}
                                    </div>

                                    <div className="captchaButtonDiv">
                                        <button
                                            className="captchaRefresh"
                                            onClick={handleCaptchaSubmit}
                                        >
                                            <FontAwesomeIcon
                                                icon={faRotate}
                                                style={{ color: "white" }}
                                            />
                                        </button>
                                    </div>
                                </div>
                                <label htmlFor="Captcha"></label>
                                <input
                                    type="text"
                                    className="inputField"
                                    id="Captcha"
                                    name="Captcha"
                                    placeholder="Enter Captcha"
                                    required
                                    value={captcha}
                                    onChange={(e) => setCaptcha(e.target.value)}
                                />
                            </div>

                            <div className="submitButton">
                                <button type="submit" className="Submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="forgot">
                        <div className="forgot-Password">
                            <Link to="#">Forgot Password</Link> 
                        </div>
                        <div className="forgot-login">
                            <Link to="#">Forgot LoginID</Link> 
                        </div>
                        <div className="Go-to-home">
                            <Link to="/">Go To Home Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
