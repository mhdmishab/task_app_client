import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import  {ProtectedRoute}  from "../middleware/Authorization";
import { ProtectedRouteLogin } from "../middleware/AuthorizationLogin";
import CompletionPage from "../pages/CompletionPage";
import RegisterPage from "../pages/RegisterPage";
import OtpPage from "../pages/OtpPage";



const Router: React.FC = () => {
  return (
    <div>
      <Routes>
    
            
            <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>} ></Route>
            <Route path="/week-completed" element={<ProtectedRoute><CompletionPage/></ProtectedRoute>} ></Route>
        
          

            <Route path="/register" element={<ProtectedRouteLogin><RegisterPage/></ProtectedRouteLogin>} /> 
            <Route path="/otp" element={<ProtectedRouteLogin><OtpPage/></ProtectedRouteLogin>} /> 
            <Route path="/login" element={<ProtectedRouteLogin><LoginPage /></ProtectedRouteLogin>} /> 

      </Routes>
    </div>
  );
};

export default Router;