import { Button } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import React, { useContext } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        < div className="headerStyle">
            <Link to="/"><img src={logo} className="logoStyle" alt="logo" fluid/></Link>
            <Container>
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link><Link to="/">Home</Link></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link><Link to="/destination/bike">Destination</Link></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>Blog</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>Contact</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <span style={{ color: 'red' }}><b>{loggedInUser.username}</b></span>
                    </Nav.Item>
                    {
                        !(loggedInUser.isSignedin) &&
                        <Nav.Item>
                            <Nav.Link><Link to="/login"><Button variant="contained" color="danger">Log in</Button></Link></Nav.Link>
                        </Nav.Item>
                    }
                </Nav>
            </Container>
        </div >
    );
};

export default Header;