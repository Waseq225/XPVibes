import { Close } from '@mui/icons-material'
import { IconButton, Snackbar } from '@mui/material'
import { createContext, useEffect, useState } from 'react'

export const SnackbarContext = createContext({})

export function SnackbarContextProvider({ children }) {
    const [toastOpen, setToastOpen] = useState(false)
    const [toastText, setToastText] = useState('')

    useEffect(() => {
        let timerId
        if (toastOpen) {
            timerId = setTimeout(() => {
                setToastOpen(false)
                setToastText('')
                timerId = null;
            }, 5000);
        }
        // clear the timer when component unmouts
        return () => clearTimeout(timerId);
    }, [toastOpen]);

    const handleToastClose = () => {
        setToastOpen(false)
    }
    return (
        <SnackbarContext.Provider value={{
            setToastOpen,
            setToastText
        }}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={toastOpen}
                autoHideDuration={5000}
                onClose={handleToastClose}
                message={toastText}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleToastClose}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                }
            />
            {children}
        </SnackbarContext.Provider>
    )
}
