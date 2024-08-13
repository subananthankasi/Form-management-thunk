
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import UserDetails from './components/UserDetails';
import NewUser from './components/NewUser';
import UpdateUser from './components/UpdateUser';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import PageNotFound from './components/PageNotFound';


function App() {


  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element = {<Login/>} />
        <Route path='/userDetails' element = {<UserDetails/>} /> 
        <Route path='/newUser' element = {<NewUser/>} /> 
        <Route path='/updateUser' element = {<UpdateUser/>} /> 
        <Route path='*' element ={<PageNotFound/>} />
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;


