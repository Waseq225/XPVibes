import React from 'react'
import { PersonalDetails } from "../components/ProfileComponents/PersonalDetails"
import { PaymentDetails } from "../components/ProfileComponents/PaymentDetails"

export const ProfilePage = () => {
    return (
        <>
            <PersonalDetails />
            <PaymentDetails />
        </>
    )
}
