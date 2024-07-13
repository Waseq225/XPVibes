import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        if (!user) {
            axios.get('/user/profile')
                .then(({ data }) => {
                    setUser(data)
                })
        }
    }, [user])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}