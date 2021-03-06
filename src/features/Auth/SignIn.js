import React from "react";
import "./SignForms.css";
import useInput from "./CustomHooks/useInput";
// import { refreshTokenSetup } from "./refreshTokenSetup";
// import { useGoogleLogin } from "react-google-login";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

import GrailHouseBlack from "../../Svgs/GrailHouseBlack.svg";
// import GoogleIcon from "../../Svgs/GoogleIcon.svg";
import { Icon } from "@iconify/react";
import arrowIosBackFill from "@iconify/icons-eva/arrow-ios-back-fill";

// const clientId = "891130030394-9nr1pjp32dhv4rohq062m57gd2b91sn6.apps.googleusercontent.com";

function SignIn({ dispatch, isLoggedIn, message }) {
    let history = useHistory();

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput((value) => value.trim() !== "");

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput,
    } = useInput((value) => value.includes(""));

    // eslint-disable-next-line
    let formIsValid = false;

    if (enteredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    } else {
        formIsValid = false;
    }

    const formSubmit = (e) => {
        e.preventDefault();

        dispatch(login(enteredEmail, enteredPassword))
            .then(() => {
                history.push("/");
                // window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });

        resetEmailInput();
        resetPasswordInput();
    };

    const emailInputClasses = emailInputHasError ? "sign-in-inputs invaild" : "sign-in-inputs";
    const passwordInputClasses = passwordInputHasError ? "sign-in-inputs invaild" : "sign-in-inputs";

    // * Google Sign Up (Below)
    // const onSuccess = (res) => {
    //     console.log("[Login Success} currentUser", res.profileObj);
    //     refreshTokenSetup(res);
    // };

    // const onFailure = (res) => {
    //     console.log("[Login Failed} res:", res);
    // };

    // const { signIn } = useGoogleLogin({
    //     onSuccess,
    //     onFailure,
    //     clientId,
    //     isSignedIn: true,
    //     accessType: "offline",
    // });

    // * Google Sign Up (Above)

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <React.Fragment>
            <div className="back-button">
                <Icon icon={arrowIosBackFill} color="black" style={{ width: "2rem", height: "2rem" }} />
                <Link to="/" style={{ fontSize: "1.25rem", textDecoration: "none", color: "black" }}>
                    Go Back
                </Link>
            </div>
            <div className="sign-in-container">
                <div className="sign-in-content">
                    <div className="sign-in-imgs">
                        <img src={GrailHouseBlack} alt="logo" />
                    </div>
                    {/* <button onClick={signIn} className="google-btn">
                        <img src={GoogleIcon} alt="google login" className="icon" style={{ width: "8%" }} />
                        <p className="google_btn_text" style={{ margin: "0 0 0 7px" }}>
                            Continue with Google
                        </p>
                    </button> */}
                    {/* <div
                        style={{
                            width: "73%",
                            height: "20px",
                            borderBottom: "1px solid #c0c0c0",
                            textAlign: "center",
                            color: "#c0c0c0",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "15px",
                                padding: "0 10px",
                                position: "relative",
                                top: "8px",
                                background: "white",
                            }}
                        >
                            OR
                        </span>
                    </div> */}
                    <form className="sign-in-form" onSubmit={formSubmit}>
                        <div className="sign-in-inputs-container">
                            <div className={emailInputClasses}>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    onChange={emailChangedHandler}
                                    onBlur={emailBlurHandler}
                                    value={enteredEmail}
                                    onFocus={(e) => (e.target.placeholder = "")}
                                />
                                {emailInputHasError && <p className="error-text">Must enter a valid</p>}
                            </div>
                            <div className={passwordInputClasses}>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={passwordChangedHandler}
                                    onBlur={passwordBlurHandler}
                                    value={enteredPassword}
                                    onFocus={(e) => (e.target.placeholder = "")}
                                />
                                {passwordInputHasError && <p className="error-text">Must enter a vaild Password</p>}
                            </div>
                            <button disabled={!formIsValid} className="sign-in-btn" type="submit">
                                Sign In
                            </button>
                            <p>
                                Don't have an account?{" "}
                                <Link to="/signup" className="sign-up-link">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        message: state.message,
    };
};

export default withRouter(connect(mapStateToProps)(SignIn));
