import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import '../styles/Form.css'
import Loading from "./Loading.jsx";

function Form({ route, method }) {
    
    const [username, setUsername] = useState("");
    const [password, setPasswrod] = useState("");
    const [dataloading, setDataLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register"
    const secName = method === "login" ? "Register" : "Login"

    const handleSubmit = async (e) => {
        setDataLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, {username, password})
            
            if(method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            }
            else {
                navigate("/login") 
            }
        } 
        catch (error) {
            if(method === "login") {
                alert("User does not exist or Wrong password")
            }
            else if(method === "register") {
                alert("User already exists")
            }
            else {
                alert(error)
            }
        } 
        finally {
            setDataLoading(false)
        }
    }

    const logRegister = () => {
        if(secName === "Login") {
            navigate("/login")
        }
        else {
            navigate("/register")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{ name }</h1>

            <input type="text" 
                    className="input-data" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username" />

            <input type="password" 
                    className="input-data" 
                    value={password} 
                    onChange={(e) => setPasswrod(e.target.value)} 
                    placeholder="Password" />

            {dataloading && <Loading />}

            <div className="btn">
                <button className="btn1" type="submit" > Submit </button>
                <button className="btn2" type="button" onClick={logRegister}> {secName} </button>
            </div>
        </form>
    )

}

export default Form