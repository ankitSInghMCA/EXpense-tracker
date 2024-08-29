// SignupPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./auth.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";
import expenseimage1 from "../../assets/expense-management-process-flow.png"

const Register = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  const [values, setValues] = useState({
    name: "",
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
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, password } = values;
    // Basic validation for name, email, and password
    if (!/^[a-zA-Z ]+$/.test(name)) {
      toast.error("Name must contain only alphabets", toastOptions);
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address", toastOptions);
      return;
    }
  
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      toast.error("Password must be at least 8 characters long and contain both letters and numbers", toastOptions);
      return;
    }
    setLoading(false);

    const { data } = await axios.post(registerAPI, {
      name,
      email,
      password
    });

    if (data.success === true) {
      delete data.user.password;
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(data.message, toastOptions);
      setLoading(true);
      navigate("/");
    }
    else {
      toast.error(data.message, toastOptions);
      setLoading(false);
    }
  };

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
                  <img src={expenseimage1} alt="logo1" />
                </div>
                <div className="right-cntaint-expense">
                  
                    <h2>Registration</h2>
                    <Form>
                      <Form.Group controlId="formBasicName" className="mt-3" >
                        <Form.Label className="text-#000">Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Full name" value={values.name} onChange={handleChange} />
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail" className="mt-3">
                        <Form.Label className="text-#000">Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword" className="mt-3">
                        <Form.Label className="text-#000">Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
                      </Form.Group>
                      <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} className="mt-4">
                        <Link to="/forgotPassword" className="text-#000 lnk" >Forgot Password?</Link>

                        <Button
                          type="submit"
                          className=" text-center mt-3 btnStyle"
                          onClick={!loading ? handleSubmit : null}
                          disabled={loading}
                        >
                          {loading ? "Registering..." : "Signup"}
                        </Button>

                        <p className="mt-3" style={{ color: "#9d9494" }}>Already have an account? <Link to="/login" className="text-#000 lnk" >Login</Link></p>
                      </div>
                    </Form>
  
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
    </>   
  )
}

export default Register