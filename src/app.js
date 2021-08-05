import React, { useContext } from 'react';
import cookie from 'react-cookies';
// import './App.css';
import 'normalize.css';
// import '@blueprintjs/core/lib/css/blueprintjs.css';

import LoginForm from './components/Login.js';
import Auth from './components/todo/Auth.js'
import ToDo from './components/todo/todo.js';
import SettingsProvider from './context/Settings.js';

function App () {
  console.log(cookie.load('token'));

  return (
    <div>
      <h1>Sorta Cool App</h1>
      <SettingsProvider>
        <LoginForm />
          <Auth capability="read">
            <p>"Can you read?</p>
          </Auth>
          <Auth capability="delete">
            <p>Can you delete?</p>
          </Auth>
        <ToDo />
      </SettingsProvider>
    </div>
  );
}

export default App;




// export default class App extends React.Component {
//   render() {
//     return (
//       <SettingsProvider>
//         <ToDo />
//       </SettingsProvider>
//     );
//   }
// }