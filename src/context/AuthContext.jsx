import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlistedItems, setWishlistedItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    },[]);

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems]);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
    }

    const register = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
    }

    const logout = () => {
        localStorage.removeItem("user");
    }
    
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            setLoading,
            wishlistedItems,
            setWishlistedItems,
            cartItems,
            setCartItems,
            login,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
