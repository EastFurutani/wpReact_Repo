import styled from "@emotion/styled";
import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Box, Container, createTheme, ThemeProvider } from "@mui/system";
import React, {useState} from "react";
import { useForm } from 'react-hook-form';

const Delete = () => {
    const [deleteId, setDeleteId] = useState(String)

    const {register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = () => {
        fetch("https://wpapi.azurewebsites.net/word/" + deleteId, {
            method: "DELETE"
        })
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box 
            sx={{
                display: "inline-flex",
                flexDirection: "column"
            }}
            >
                <TextField {...register("deleteId", {required: true, pattern: /\d/})} variant="outlined" label="id" value={deleteId} onChange={(e) => setDeleteId(e.target.value)}></TextField>
                {errors.deleteId?.required && <p>入力して下さい</p>}
                {errors.deleteId?.pattern && (
                    <p>入力値は整数です</p>
                )}
                <br />
                <Button variant="contained" type="submit">Delete</Button>
            </Box>
        </form>
    )
}

export default Delete;