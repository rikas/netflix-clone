import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/navbar.css';
import { loggedUser } from '../utils';
import Avatar from './Avatar';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class NavBar extends Component {
  gotoProfile = () => {
    this.props.history.push('/profile')
  }

  gotoLogout = () => {
    this.props.history.push('/logout')
  }

  render() {
    return (
      <div className="navbar-container">
        <nav className="navbar fixed-top">
          <Link to="/" className="logo">CloneFlix</Link>
          <ul className="navbar-menu">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <Avatar user={loggedUser()} /> {loggedUser().firstName} {loggedUser().lastName}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.gotoProfile}>
                  Profile
                </DropdownItem>
                <DropdownItem onClick={this.gotoLogout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
