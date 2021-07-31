import { useContext } from 'react';
import { Button, InputGroup } from '@blueprintjs/core'
import { AuthContext } from '../context/Auth';

function Login() {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;

    login(username, password);
  }

  return (
    <div className="login">
      {isAuthenticated
        ? <Button onClick={logout}>Logout</Button>
        : <form onSubmit={handleSubmit}>
            <InputGroup name = "username" id="username" placeholder="username" />
            <InputGroup name ="password" id="password" placeholder="password" />
            <Button type='submit'>Login</Button>
          </form>
          }
    </div>
  )
}

export default Login;