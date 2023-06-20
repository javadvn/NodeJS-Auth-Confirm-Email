import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Chat } from './pages/Chat';
import { Layout } from './components/Layout';
import { RegisterPage } from './pages/Auth/Register';
import { LoginPage } from './pages/Auth/Login';
import ConfirmPage from './pages/Auth/ConfirmPage';
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  
  const token = JSON.parse(localStorage.getItem("token"));
  const [user, setUser] = useState(token?.length > 0 ? true :false);

    const [loading, setLoading] = useState(true); // Yüklenme durumu ekle
  
    useEffect(() => {
   
      const fetchData = async () => {
        if (token) {
          const res = await axios.post(
            "http://localhost:5000/api/webuser/token",
            { token }
          );
          setUser(res.data.message === "Success" ? true : false);
        }
        setLoading(false); 
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>; 
    }
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={user ? <Chat /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/confirm" element={!user ? <ConfirmPage /> : <Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;

