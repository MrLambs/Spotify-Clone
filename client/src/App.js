import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login'
import Dashboard from './components/Dashboard'

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return code ? <Dashboard code={code} /> : <Login /> 
}

export default App;
