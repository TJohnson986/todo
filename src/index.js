import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';
import AuthProvider from './context/Auth.js';

class Main extends React.Component {
  render() {
    return <AuthProvider><App /></AuthProvider>;
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);