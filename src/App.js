
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import UserDetails from './components/UserDetails';
import NewUser from './components/NewUser';
import UpdateUser from './components/UpdateUser';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function App() {

  const jwtToken = localStorage.getItem('auth_Token');
  console.log('jwtToken', jwtToken);

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element = {<Login/>} />
        <Route path='/userDetails' element = {<UserDetails/>} /> 
        <Route path='/newUser' element = {<NewUser/>} /> 
        <Route path='/updateUser' element = {<UpdateUser/>} /> 
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;


