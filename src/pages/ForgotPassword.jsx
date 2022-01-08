import { GlobalContext } from "../contexts/GlobalState";
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../contexts/ClientDBOperations";

const ForgotPassword = () => {
  const { addUser, user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [type, setType] = useState("");
  //user login details
  const userEmail = useRef("");
  const userPassword = useRef("");
  const [loginError, setLoginError] = useState("");
  //user registration details
  const regFirstName = useRef("");
  const regLastName = useRef("");
  const regEmail = useRef("");
  const regPassword = useRef("");
  const [forgotPassTitle, setForgotPassTitle] = useState("Forgot Password");
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user") && !user.email) {
      addUser(JSON.parse(sessionStorage.getItem("user")));
      navigate("/");
    }
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // login function
  async function handleForgotPassword(e) {
    e.preventDefault();
    if (!validateEmail(userEmail.current.value)) {
      setLoginError("Invalid email");
    }

    setBtnDisabled(true);
    const { status, message } = await forgotPassword(userEmail.current.value);
    if (status === 200) {
      setForgotPassTitle("Check your email");
    } else if (status === 404) {
      setLoginError(message);
    } else {
      setLoginError(`Error on server: ${message}`);
    }
    setBtnDisabled(false);
  }

  return (
    <div>
      <div className={"login-container" + type}>
        <div className="forms-container">
          <div className="signin-signup">
            {/*Sign in form*/}
            <form action="#" className="form-section sign-in-form">
              <div className=""></div>
              <h2 className="title">{forgotPassTitle}</h2>
              <div className="input-field">
                <i className="bi bi-person"></i>
                <input
                  type="text"
                  placeholder="Email"
                  ref={userEmail}
                  required
                  id="signInEmail"
                />
              </div>
              <button
                className="btn btn-basic solid"
                id="signInButton"
                onClick={(e) => handleForgotPassword(e)}
              >
                {btnDisabled ? "Wait..." : "Recover"}
              </button>
              <p className="social-text">{loginError}</p>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Forgot Your Password?</h3>
              <p>
                No worries! <br></br>
                Just fill your email and we will send a new password to your
                email.
              </p>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
