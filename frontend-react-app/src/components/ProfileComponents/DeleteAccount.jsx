import { Button } from "@mui/material"
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../../userContext"

export const DeleteAccount = () => {
const {user} = useContext(UserContext)

const handleDeleteUser = async (ev) =>{
  ev.preventDefault()
  await axios.
  delete(`/user/delete/${user._id}`).then(()=>{
    alert("User deleted!")
})
  .catch((e)=>{
    alert(e.message)
  })
  
}

  return (
    <Button onClick={handleDeleteUser}>Cancel account</Button>
  )
}
