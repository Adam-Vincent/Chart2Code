import {Navbar, Nav, Container} from 'react-bootstrap';

import backgroundImage from '../Assets/img/bg.jpg';
import React from "react";

function Navgation() {
    const navigationStyle = {
        backgroundImage: backgroundImage,
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };

    const headerStyle = {
        backgroundImage: backgroundImage,
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };

    return (
        <>
            <div style={navigationStyle}>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Chart2Code</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#link">Sign In</Nav.Link>
                                <Nav.Link href="#link">Sign Up</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <header id="header" style={headerStyle} className="d-flex align-items-center">
                    <div className="container d-flex flex-column align-items-center">
                        <h1>Welcome to Chart2Code!</h1>
                        <h2>Automatically convert your diagrams to code</h2>
                        <div style={{ position: 'relative' }}>
                            <h3>Upload your image now!</h3>
                            <input type="file" onChange={(e) => {
                                const files = e.target.files;
                                if (files != null && files.length > 0) {
                                    console.log(files[0]);
                                }
                            }}/>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
}

export default Navgation;
