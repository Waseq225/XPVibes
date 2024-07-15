import { Button, styled } from "@mui/material";

export const AuthButton = styled((props) => (
    <Button
        variant="contained"
        {...props}
    />

))(() => ({
    borderRadius: 10,
   
}));