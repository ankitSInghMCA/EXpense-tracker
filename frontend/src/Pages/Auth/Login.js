// LoginPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";
import expenseimage from "../../assets/expense-management-process-flow.png"

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = values;
  
    setLoading(true);
  
    try {
      const { data } = await axios.post(loginAPI, {
        email,
        password,
      });
  
      if (data.success === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        toast.success(data.message, toastOptions);
        setLoading(false);
      } else {
        // If login is unsuccessful, display an error message
        toast.error(data.message, toastOptions);
        setLoading(false);
      }
    } catch (error) {
      // Handle any errors from the API request
      console.error("Error logging in:", error);
      toast.error("An error occurred while logging in. Please try again later.", toastOptions);
      setLoading(false);
    }
  };
  
  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <>
      <div className="expense-page">
        <div className="expense-page-conatiner">
          <div className="expense-page-main">
            <div className="expense-header">  
                <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "primary" }}/>
                <h1 className="text-center text-#000">Welcome to Expense Management System</h1>
              </div>
            <div className="center-expensepage">
              <div className="left-expense-img">
                <img src={expenseimage} alt="img1" />
              </div>
              <div className="right-cntaint-expense">
                <h2 className="text-#000 text-center ">Login</h2>
                <Form>
                  <Form.Group controlId="formBasicEmail" className="mt-3">
                    <Form.Label className="text-#000">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label className="text-#000">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                    />
                  </Form.Group>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                    className="mt-4"
                  >
                    <Link to="/forgotPassword" className="text-#000 lnk">
                      Forgot Password?
                    </Link>

                    <Button
                      type="submit"
                      className=" text-center mt-3 btnStyle"
                      onClick={!loading ? handleSubmit : null}
                      disabled={loading}
                    >
                      {loading ? "Signin…" : "Login"}
                    </Button>

                    <p className="mt-3" style={{ color: "#9d9494" }}>
                      Don't Have an Account?{" "}
                      <Link to="/register" className="text-#000 lnk">
                        Register
                      </Link>
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        /</div>
      <ToastContainer />

    </>
  );
};

export default Login;
