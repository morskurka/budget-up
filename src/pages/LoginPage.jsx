import { GlobalContext } from "../contexts/GlobalState";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { addUser, user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [type, setType] = useState(""); // **********************
  //user authentication details
  const userEmail = useRef();
  const userPassword = useRef();
  // authentication error massage
  const [error, setError] = useState("");
  //user registration details
  const regUserName = useRef();
  const regEmail = useRef();
  const regPassword = useRef();
  const regPasswordValidation = useRef(); // **************************

  async function login() {
    console.log("userLogin:");
    console.log(userEmail.current.value);
    console.log(userPassword.current.value);

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
    console.log("user:");
    console.log(user);
    if (user.length > 0) {
      console.log("1");
      addUser(user[0]);
      navigate("/");
    } else {
      console.log("2");
      setError("Wrong username-password combination");
    }
  }

  return (
    <div>
      <div className={"container" + type}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
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
              <button className="btn solid" onClick={() => login()}>
                Login
              </button>
              <p className="social-text">{error}</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="bi bi-person"></i>
                <input type="text" placeholder="Username" ref={regUserName} />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" ref={regEmail} />
              </div>
              <div className="input-field">
                <i className="bi bi-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  ref={regPassword}
                />
              </div>
              <input type="submit" className="btn" value="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => {
                setType(" sign-up-mode");
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
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => {
                setType(" ");
              }}
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
