import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userLoading, setUserLoading] = useState(true)
    useEffect(() => {
        if (!user) {
            axios.get('/user/profileDetails')
                .then(({ data }) => {
                    setUser(data)
                    setUserLoading(false)
                })
        } else setUserLoading(false)
    }, [user])
    return (
        <UserContext.Provider value={{ userLoading, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}