import axios from 'axios';

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function ConfirmPage() {
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate()
    const handleSubmit = () => {
        let email = JSON.parse(localStorage.getItem("userEmail"))
        console.log(email);

        axios.post("http://localhost:5000/api/webuser/confirm", { email, code })
            .then(res => {
                localStorage.setItem("token", JSON.stringify(res.data.token))
                navigate("/")
            })

    };

    const handleChange = (event) => {
        setCode(String(event.target.value));
    };

    return (
        <div>
            <div className="container">
                <div className="errMessage">
                    {err}
                </div>
                <div
                    className="form"
                    style={{
                        width: "500px",
                        height: "500px",
                        background: "grey",
                        margin: "auto",
                        marginTop: "calc(100vh - 1000px)/2"
                    }}
                >
                    <input
                        type="text"
                        value={code}
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPage;
