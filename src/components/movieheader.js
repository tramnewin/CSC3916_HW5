import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logoutUser} from "../actions/authActions";
import NavbarHeader from "react-bootstrap/lib/NavbarHeader";

class MovieHeader extends Component {
    logout() {
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <div>
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand>
                        Movie App
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <LinkContainer to="/movielist">
                                <Nav.Link disabled={!this.props.loggedIn}>Movie List</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/movie/' + (this.props.selectedMovie ? this.props.selectedMovie._id : '')}>
                                <Nav.Link disabled={!this.props.loggedIn}>Movie Detail</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/signin">
                                <Nav.Link>{this.props.loggedIn ? <button onClick={this.logout.bind(this)}>Logout</button> : 'Login'}</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn : state.auth.loggedIn,
        username : state.auth.username,
        selectedMovie: ''
    }
}

export default withRouter(connect(mapStateToProps)(MovieHeader));