import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userLoading, setUserLoading] = useState(true)
    const [hasOrganizerPermission, setHasOrganizerPermission] = useState(false)
    useEffect(() => {
        setUserLoading(true)
        if (!user) {
            axios.get('/user/info')
                .then(({ data }) => {
                    setUser(data)
                    axios
                        .get('/auth/hasPermission/manageEvent')
                        .then(({ data }) => {
                            setHasOrganizerPermission(data)
                            setUserLoading(false)
                        })
                        .catch(() => {
                            setHasOrganizerPermission(false)
                            setUserLoading(false)
                        })
                })
        } else {
            axios
                .get('/auth/hasPermission/manageEvent')
                .then(({ data }) => {
                    setHasOrganizerPermission(data)
                    setUserLoading(false)
                })
                .catch(() => {
                    setHasOrganizerPermission(false)
                    setUserLoading(false)
                })

        }
    }, [user])

    return (
        <UserContext.Provider
            value={{
                userLoading,
                user,
                setUser,
                hasOrganizerPermission,
                setHasOrganizerPermission,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
