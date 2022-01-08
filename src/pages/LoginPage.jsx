import { GlobalContext } from "../contexts/GlobalState";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromDB, addUserToDB } from "../contexts/ClientDBOperations";

const LoginPage = () => {
  const { addUser } = useContext(GlobalContext);
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
  const [regError, setRegError] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    return String(password).match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  };

  // sign-up function
  async function signUp() {
    setBtnDisabled(true);
    if (
      regFirstName.current.value === "" ||
      regLastName.current.value === "" ||
      regEmail.current.value === "" ||
      regPassword.current.value === ""
    ) {
      setBtnDisabled(false);
      setRegError("Required fields");
      return;
    }
    if (!validateEmail(regEmail.current.value)) {
      setBtnDisabled(false);
      setRegError("Invalid email");
      return;
    }
    if (!validatePassword(regPassword.current.value)) {
      setBtnDisabled(false);
      setRegError(
        "Password must contain minimum eight characters, at least one letter and one number"
      );
      return;
    }
    const user = {
      firstName: regFirstName.current.value,
      lastName: regLastName.current.value,
      email: regEmail.current.value,
      password: regPassword.current.value,
    };

    const { status, message } = await addUserToDB(user);

    if (status === 200) {
      setType("");
      await login(user.email, user.password);
    } else {
      setRegError("User already exists with this email address");
    }
    setBtnDisabled(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (validateLoginInput()) {
      login(userEmail.current.value, userPassword.current.value);
    }
  }

  function validateLoginInput() {
    if (userEmail.current.value === "" || userPassword.current.value === "") {
      setLoginError("Email and password are required");
      setBtnDisabled(false);
      return false;
    }
    if (!validateEmail(userEmail.current.value)) {
      setBtnDisabled(false);
      setLoginError("Invalid email");
      return false;
    }
    return true;
  }
  // login function
  async function login(email, password) {
    setBtnDisabled(true);
    const { status, message } = await getUserFromDB(email, password);
    if (status === 200) {
      let user = message;
      if (user.length > 0) {
        addUser(user[0]);
        sessionStorage.setItem("user", JSON.stringify(user[0]));
        navigate("/");
      } else {
        setLoginError("Wrong username-password combination");
      }
    } else {
      setLoginError(message);
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
              <h2 className="title">Sign in</h2>
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
              <div className="input-field">
                <i className="bi bi-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  ref={userPassword}
                  required
                  id="signInPassword"
                />
              </div>
              <button
                className="btn btn-basic solid"
                id="signInButton"
                onClick={(e) => handleLogin(e)}
              >
                {btnDisabled ? "Loading..." : "Login"}
              </button>
              <p className="social-text">{loginError}</p>
            </form>
            {/*Sign up form*/}
            <form action="#" className="form-section sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="bi bi-person"></i>
                <input
                  type="text"
                  placeholder="First name"
                  ref={regFirstName}
                  required
                  id="signUpFirstName"
                />
              </div>
              <div className="input-field">
                <i className="bi bi-person"></i>
                <input
                  type="text"
                  placeholder="Last name"
                  ref={regLastName}
                  required
                  id="signUpLastName"
                />
              </div>
              <div className="input-field">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  ref={regEmail}
                  required
                  id="signUpEmail"
                />
              </div>
              <div className="input-field">
                <i className="bi bi-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  ref={regPassword}
                  required
                  id="signUpPassword"
                />
              </div>
              <button
                className="btn btn-basic solid"
                id="signUpButton"
                onClick={(e) => {
                  e.preventDefault();
                  signUp();
                }}
              >
                {btnDisabled ? "Loading..." : "SIGN UP"}
              </button>
              <p className="social-text">{regError}</p>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <p>
                Welcome to BudgetUp! <br></br>
                Join us on an exciting journey to proper financial management.
              </p>
              <button
                className="btn btn-basic transparent"
                id="sign-up-btn"
                onClick={() => {
                  setType(" sign-up-mode");
                  setLoginError("");
                  setRegError("");
                }}
              >
                Sign up
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us?</h3>
              <p>
                Great! We are exciting to have you back. Click the button to
                login to your account.
              </p>
              <button
                className="btn btn-basic transparent"
                id="sign-in-btn"
                onClick={() => {
                  setType("");
                  setLoginError("");
                  setRegError("");
                }}
              >
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
