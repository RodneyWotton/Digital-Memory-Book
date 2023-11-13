import React, { useState } from 'react';
import "./App.css";
import Login from "./Login";
import Registration from "./Registration";
import Home from "./Home";
import NavbarTop from "./NavbarTop";
import ContactUs from "./ContactUs";
import OurMission from "./OurMission";
import MeetTheCreators from "./MeetTheCreators";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DigitalTimeline from "./DigitalTimeline";
import FamilyView from "./FamilyView";
import PhotoBook from "./PhotoBook";
import PostUploaderV2 from "./PostUploaderV2";
import Post from "./Post";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const handleHomeClick = () => {
    if(isAuth){
      console.log("in here!");
      window.location.pathname = "/timeline";
    }
    else{
      window.location.pathname = "/";
    }
    
  };

  const handleLoginClick = () => {
    window.location.pathname = "/login";
  };

  const handleSignOutClick = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <BrowserRouter>
      <Navbar expand="lg" className="bg-body-tertiary" >
      <Container>
        <Navbar.Brand onClick={handleHomeClick}>
          Digital Memory Book
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleHomeClick}>
              Home
            </Nav.Link>
            <NavDropdown title="Resources">
              <NavDropdown.Item href="/ourmission">Our Mission</NavDropdown.Item>
              <NavDropdown.Item href="/meetus">Meet the Creators</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/contactus">Contact</Nav.Link>
            {isAuth ? (
              <Button variant="outline-danger" onClick={handleSignOutClick}>
                Sign Out
              </Button>
            ) : (
              <Button variant="outline-success" onClick={handleLoginClick}>
                Get Started
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/ourmission" element={<OurMission />} />
        <Route path="/meetus" element={<MeetTheCreators />} />
        <Route path="/timelinecreation" element={<DigitalTimeline isAuth={isAuth}/>} />
        <Route path="/timeline" element={<Post isAuth={isAuth}/>} />
        <Route path="/addpost" element={<PostUploaderV2 isAuth={isAuth}/>} />
        <Route path="/family" element={<FamilyView isAuth={isAuth}/>} />
        <Route path="/photobook" element={<PhotoBook isAuth={isAuth}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
