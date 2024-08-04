import { useState, useEffect, useCallback } from 'react'

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        let currentValue

        try {
            currentValue = JSON.parse(localStorage.getItem(key))
            if (currentValue === null) throw new Error('null value')
        } catch (error) {
            currentValue = defaultValue
        }

        return currentValue
    })

    const removeValue = useCallback(() => {
        setValue([])
        localStorage.removeItem(key)
    }, [key, setValue])

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue, removeValue]
}
