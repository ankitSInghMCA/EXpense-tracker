import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Container } from "react-bootstrap";

// import loading from "../../assets/loader.gif";
import "./home.css";
import { addTransaction, getTransactions } from "../../utils/ApiRequest";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import TableData from "./TableData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";
import Analytics from "./Analytics";
import Feedback from "./Feedback";
import Footer from "./Footer"

const Home = () => {
  const navigate = useNavigate();

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
  const [cUser, setcUser] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");

  const handleStartChange = (date) => {
    setStartDate(date);
  };

  const handleEndChange = (date) => {
    setEndDate(date);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const avatarFunc = async () => {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);

        if (user.isAvatarImageSet === false || user.avatarImage === "") {
          navigate("/setAvatar");
        }
        setcUser(user);
        setRefresh(true);
      } else {
        navigate("/login");
      }
    };

    avatarFunc();
  }, [navigate]);

  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFrequency = (e) => {
    setFrequency(e.target.value);
  };

  const handleSetType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, amount, description, category, date, transactionType } =
      values;

    if (
      !title ||
      !amount ||
      !description ||
      !category ||
      !date ||
      !transactionType
    ) {
      toast.error("Please enter all the fields", toastOptions);
    }
    setLoading(true);

    const { data } = await axios.post(addTransaction, {
      title: title,
      amount: amount,
      description: description,
      category: category,
      date: date,
      transactionType: transactionType,
      userId: cUser._id,
    });

    if (data.success === true) {
      toast.success(data.message, toastOptions);
      handleClose();
      setRefresh(!refresh);
    } else {
      toast.error(data.message, toastOptions);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setType("all");
    setStartDate(null);
    setEndDate(null);
    setFrequency("7");
  };





  useEffect(() => {

    const fetchAllTransactions = async () => {
      try {
        setLoading(true);
        console.log(cUser._id, frequency, startDate, endDate, type);
        const { data } = await axios.post(getTransactions, {
          userId: cUser._id,
          frequency: frequency,
          startDate: startDate,
          endDate: endDate,
          type: type,
        });
        console.log(data);

        setTransactions(data.transactions);

        setLoading(false);
      } catch (err) {
        // toast.error("Error please Try again...", toastOptions);
        setLoading(false);
      }
    };

    fetchAllTransactions();
  }, [refresh, frequency, endDate, type, startDate]);

  const handleTableClick = (e) => {
    setView("table");
  };

  const handleChartClick = (e) => {
    setView("chart");
  };

  // **********************************************************************
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };
  const handleShowLogin = () => {
    navigate("/login");
  }
  useEffect(() => {

    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));

      setUser(user);

    }
  }, []);

  const [user, setUser] = useState();
  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <>
      <Header />

      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <div className="home-main">
            <div className="home-contair-new-main">
              <div className="home-main-container">
                <div className="home-main-contint">
                  <div className="left-conatint">
                    <div className="left-conatint-container">

                      <div className="profile-picture">
                        <div className="profile-main">
                          <div className="profilr-pic-inside">
                            <img src={user?.avatarImage} alt="logo1" />
                          </div>
                        </div>
                      </div>

                      <div className="left-nabbar">
                        <p>{user?.name}</p>
                        <hr className="underline-left" />
                      </div>
                     
                      <div className="left-nabbar">
                        <p onClick={handleShow} className="addNew">
                          Add New
                        </p>
                      </div>

                      <hr className="underline-left" />
                      {/* <p onClick={handleShow} className="mobileBtn">
                      +
                    </p> */}
                      <div className="left-nabbar">
                        <p className="vew-hide-transaction" onClick={toggleContent}>
                          {showContent ? 'Hide Transaction' : 'View Transaction'}
                        </p>
                      </div>

                      <hr className="underline-left" />
                      <div className="left-nabbar">
                        <p><Feedback /></p>
                      </div>

                      <hr className="underline-left" />
                      <div className="left-nabbar">
                        <>
                          {user ? (
                            <>

                              <p onClick={handleShowLogout}>Logout</p>


                            </>
                          ) : (

                            <>

                              <p onClick={handleShowLogin}>Login</p>

                            </>
                          )}
                        </>
                      </div>


                    </div>
                  </div>
                  <div className="right-containt">
                    <div className="Add-deatil">
                      <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                          <Modal.Title>Add Transaction Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3" controlId="formName">
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                name="title"
                                type="text"
                                placeholder="Enter Transaction Name"
                                value={values.name}
                                onChange={handleChange}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formAmount">
                              <Form.Label>Amount</Form.Label>
                              <Form.Control
                                name="amount"
                                type="number"
                                placeholder="Enter your Amount"
                                value={values.amount}
                                onChange={handleChange}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSelect">
                              <Form.Label>Category</Form.Label>
                              <Form.Select
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                              >
                                <option value="">Choose...</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Rent">Rent</option>
                                <option value="Salary">Salary</option>
                                <option value="Tip">Tip</option>
                                <option value="Food">Food</option>
                                <option value="Medical">Medical</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Other">Other</option>
                              </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDescription">
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                type="text"
                                name="description"
                                placeholder="Enter Description"
                                value={values.description}
                                onChange={handleChange}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSelect1">
                              <Form.Label>Transaction Type</Form.Label>
                              <Form.Select
                                name="transactionType"
                                value={values.transactionType}
                                onChange={handleChange}
                              >
                                <option value="">Choose...</option>
                                <option value="credit">Credit</option>
                                <option value="expense">Expense</option>
                              </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDate">
                              <Form.Label>Date</Form.Label>
                              <Form.Control
                                type="date"
                                name="date"
                                value={values.date}
                                onChange={handleChange}
                                max={new Date().toISOString().split('T')[0]} // Set the maximum date to today
                              />
                            </Form.Group>

                            {/* Add more form inputs as needed */}
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={handleSubmit}>
                            Submit
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <div className="transaction-detail">
                      {showContent && (
                        <>
                          <div>
                            <div className="filterRow">
                              <div className="text-#000">
                                <Form.Group className="mb-3" controlId="formSelectFrequency">
                                  <Form.Label>Select Frequency</Form.Label>
                                  <Form.Select
                                    name="frequency"
                                    value={frequency}
                                    onChange={handleChangeFrequency}
                                  >
                                    <option value="7">Last Week</option>
                                    <option value="30">Last Month</option>
                                    <option value="365">Last Year</option>
                                    <option value="custom">Custom</option>
                                  </Form.Select>
                                </Form.Group>
                              </div>

                              <div className="text-#000 type">
                                <Form.Group className="mb-3" controlId="formSelectFrequency">
                                  <Form.Label>Type</Form.Label>
                                  <Form.Select
                                    name="type"
                                    value={type}
                                    onChange={handleSetType}
                                  >
                                    <option value="all">All</option>
                                    <option value="expense">Expense</option>
                                    <option value="credit">Earned</option>
                                  </Form.Select>
                                </Form.Group>
                              </div>

                              <div className="text-#000 iconBtnBox">
                                <FormatListBulletedIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={handleTableClick}
                                  className={`${view === "table" ? "iconActive" : "iconDeactive"
                                    }`}
                                />
                                <BarChartIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={handleChartClick}
                                  className={`${view === "chart" ? "iconActive" : "iconDeactive"
                                    }`}
                                />
                              </div>


                            </div>
                            <br style={{ color: "white" }}></br>

                            {frequency === "custom" ? (
                              <>
                                <div className="date">
                                  <div className="form-group">
                                    <label htmlFor="startDate" className="text-#000">
                                      Start Date:
                                    </label>
                                    <div>
                                      <DatePicker
                                        selected={startDate}
                                        onChange={handleStartChange}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="endDate" className="text-#000">
                                      End Date:
                                    </label>
                                    <div>
                                      <DatePicker
                                        selected={endDate}
                                        onChange={handleEndChange}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}

                            <div className="containerBtn">
                              <Button variant="primary" onClick={handleReset}>
                                Reset Filter
                              </Button>
                            </div>
                            {view === "table" ? (
                              <>
                                <TableData data={transactions} user={cUser} />
                              </>
                            ) : (
                              <>
                                <Analytics transactions={transactions} user={cUser} />
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <ToastContainer />
                </div>
              </div>
            </div>

          </div>
          {/* <Footer /> */}
        </>
      )}
    </>
  );
};

export default Home;
