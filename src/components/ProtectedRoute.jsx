import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import api from "../api";

function ProtectedRoute({children}) {
    const [authorized, setAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setAuthorized(false))
    }, []) 

    const refreshToken = async () => {
        const refreshVal = localStorage.getItem(REFRESH_TOKEN)

        try {
            const res = await api.post("/api/token/refresh/", { refresh: refreshVal })

            if(res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setAuthorized(true)
            }
            else {
                setAuthorized(false)
            }
        } 
        catch (error) {
            console.log(error)
            setAuthorized(false)
        }
    }

    // Here we check for access token , if it exists then check if expired or not(login if expired)
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if(!token) {
            setAuthorized(false)
            return
        }

        const decode = jwtDecode(token)
        const tokenExp = decode.exp
        const now = Date.now() / 1000 // To get in seconds

        if(tokenExp < now) {
            await refreshToken()
        }
        else {
            setAuthorized(true)
        }
    }

    if(authorized === null) {
        return(
            <div>Please wait while loading...</div>
        )
    }

    return (
        authorized ? children : <Navigate to="/login" />
    )
}

export default ProtectedRoute