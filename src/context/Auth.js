import React from 'react';
import jwt from 'jsonwebtoken'
import cookie from 'react-cookies';

export const AuthContext = React.createContext();

const testUsers = [
  {
    name:'Administrator',
    password:'pass',
    role:'admin',
    capabilities:['create','read','update','delete']
  },
  {
    name:'Editor',
    password:'pass',
    role:'editor',
    capabilities:['read','update']
  },
  {
    name:'Administrator',
    password:'pass',
    role:'admin',
    capabilities:['create']
  },
]

export default class AuthProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      login: this.login,
      logout: this.logout,
      isAuthenticated: this.isAuthenticated,
      isAuthorized: this.isAuthorized,
      user: {capabilities: []},
    }
  }

  login = (username, password) => {
    let validUser = {};
    let token = null;
    testUsers.forEach(user => {
      if (user.name === username && user.password === password) {
        validUser = user
      }
    });
    if (validUser) {
      token = jwt.sign(validUser, 'secretstring');
    }
    cookie.save('token', token);
    this.setState({ isAuthenticated: true, user: validUser });
  }

  logout = () => {
    this.setState({
      user: {capabilities: []},
      isAuthenticated: false,
    });
  }

  isAuthorized = (capability) => {
    if (this.state.user) {
      return this.state.user.capabilities?.includes(capability);
    }
  }

  render () {
    return (
      <AuthContext.Provider value = {this.state}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
};