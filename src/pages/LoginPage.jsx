import { GlobalContext } from "../contexts/GlobalState";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

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

  async function signUp() {
    if (
      regFirstName.current.value === "" ||
      regLastName.current.value === "" ||
      regEmail.current.value === "" ||
      regPassword.current.value === ""
    ) {
      setRegError("Required fields");
      return;
    }

    const user = await fetch("/api/registration", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: regFirstName.current.value,
        lastName: regLastName.current.value,
        email: regEmail.current.value,
        password: regPassword.current.value,
      }),
    }).then((res) => res.json());
    console.log(user);

    if (user.rowsAffected === 0) {
      console.log("1");
      setRegError("User already exists with the same email address");
    } else {
      console.log("2");
      setType("");
    }
  }

  async function login() {
    if (userEmail.current.value === "" || userPassword.current.value === "") {
      setLoginError("Email and password are required");
      return;
    }

    const user = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail.current.value,
        password: userPassword.current.value,
      }),
    }).then((res) => res.json());

    if (user.length > 0) {
      addUser(user[0]);
      navigate("/");
    } else {
      setLoginError("Wrong username-password combination");
    }
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
                <input type="text" placeholder="Email" ref={userEmail} />
              </div>
              <div className="input-field">
                <i className="bi bi-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  ref={userPassword}
                />
              </div>
              <button
                className="btn btn-basic solid"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                Login
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
                />
              </div>
              <div className="input-field">
                <i className="bi bi-person"></i>
                <input
                  type="text"
                  placeholder="Last name"
                  ref={regLastName}
                  required
                />
              </div>
              <div className="input-field">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  ref={regEmail}
                  required
                />
              </div>
              <div className="input-field">
                <i className="bi bi-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  ref={regPassword}
                  required
                />
              </div>
              <button
                className="btn btn-basic solid"
                onClick={(e) => {
                  e.preventDefault();
                  signUp();
                }}
              >
                SIGN UP
              </button>
              <p className="social-text">{regError}</p>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
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
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
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
