// NavbarComponent.js
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import logoexpense from "../assets/logoexpense.png"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const Header = () => {
  
const navigate = useNavigate();

  const handleShowLogin = () =>{
    navigate("/login");
  }

  const [user, setUser] = useState();

  useEffect(() => {
    
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        
        setUser(user);
        
      }


    
  }, []);

  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);
  
  return (
    <>
    <div className="headers">
      <div className="headers-main">
        <div className="headerof-expense">
          <h1>Expense Managment System</h1>
          <AccountBalanceWalletIcon  fontSize='large'/>
        </div>
      </div>
    </div>
     
    </>
  );
};

export default Header;
