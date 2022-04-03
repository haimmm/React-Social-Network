import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import {Nav, NavItem } from 'layouts';
import { Home, Profile } from "routes"
import { Login, Register, Searchbar } from 'components';
import AuthContext from 'context/AutoContext';
import useAuth from 'hooks/useAuth';
import { useTweets } from 'hooks/useTweets';
import TweetsContext from 'context/TweetsContext';

function App() {
  let activeStyle = {opacity: "1"};
  const isActiveLink = ({isActive}) => isActive ? activeStyle : undefined;
  const auth = useAuth();
  const tweets = useTweets();
  
  
  return (
    <div className="App">
      {auth.user ?
        <TweetsContext.Provider value={tweets}>
          <Nav>
            <NavItem><NavLink style={isActiveLink}  onClick={() => tweets.hookReload()} to="/home">Home</NavLink></NavItem>
            <NavItem><NavLink style={isActiveLink} to="/profile">Profile</NavLink></NavItem>
            <NavItem><NavLink style={{color:"red"}} onClick={() => auth.signout()} to="">Sign Out</NavLink></NavItem>
            <NavItem><Searchbar/></NavItem>
          </Nav>
          <AuthContext.Provider value={auth}>
              <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/*" element={<Navigate to="/home" />} />
              </Routes>
          </AuthContext.Provider>
        </TweetsContext.Provider>
      : <>
          <Nav>
            <NavItem><NavLink style={isActiveLink} to="/login">Login</NavLink></NavItem>
            <NavItem><NavLink style={isActiveLink} to="/Register">Register</NavLink></NavItem>
          </Nav>
          <AuthContext.Provider value={auth}>
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/*"  element={<Navigate to="/login" />} />
            </Routes>
          </AuthContext.Provider>
        </>
      }

    </div>
  );
}

export default App;
