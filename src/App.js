import React from "react";
import LandingPage from "./Components/LandingPage";
import LandingPage2 from "./Components/LandingPage2";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import RequireAuthOnline from "./Auth/RequireAuthOnline";
import RequireAuth from './Auth/RequireAuth_role'
import Home from "./Home";
import GuidanceHome from './Guidance/GuidanceHome'
import Register from "./Register";
import './input.css';


function App() {
  return (
   
      <Routes>

        <Route path="/" element={<LandingPage />}/>
        <Route path="/referral" element={<LandingPage2 />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        
        <Route element={<RequireAuthOnline allowed={["loggedIN"]}/>}>

            <Route element={<RequireAuth allowedRoles={["student"]}/>}>
                  <Route path="/nav/home/student" exact element={<Home/>}/>
            </Route>

            <Route element={<RequireAuth allowedRoles={["gc"]}/>}>
                  <Route path="/nav/home/gc" exact element={<GuidanceHome/>}/> 
            </Route>

        </Route>
        
        
      </Routes>
   
  );
}

export default App;
