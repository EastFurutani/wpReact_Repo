import styled from "@emotion/styled";
import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Box, Container, createTheme, ThemeProvider } from "@mui/system";
import React, {useState} from "react";
import { useForm } from 'react-hook-form';

const Put = () => {
    const [putId, setPutId] = useState(String)
    const [putText, setPutText] = useState(String)
    const [putText2, setPutText2] = useState(String)

    const {register, handleSubmit, formState: {errors} } = useForm();
    const onSubmit = () => {
        let putData = {
            wordName: putText,
            wordType: putText2
        }

        fetch("https://wpapi.azurewebsites.net/word/" + putId, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putData)
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
                <TextField {...register("putId", {required: true, pattern: /\d/})} variant="outlined" label="id" value={putId} onChange={(e) => setPutId(e.target.value)}></TextField>
                {errors.putId?.required && <p>入力して下さい</p>}
                {errors.putId?.pattern && (
                        <p>入力値は整数です</p>
                )}
                <br />
                <TextField {...register("putWN", {required: true, maxLength: 20})} variant="outlined" label="WordName" value={putText} onChange={(e) => setPutText(e.target.value)}></TextField>
                {errors.putWN?.required && <p>入力して下さい</p>}
                {errors.putWN?.maxLength && (
                    <p>20文字以下です</p>
                )}
                <br />
                <TextField {...register("putWT", {required: true, maxLength: 15})} variant="outlined" label="WordType" value={putText2} onChange={(e) => setPutText2(e.target.value)}></TextField>
                {errors.putWT?.required && <p>入力して下さい</p>}
                {errors.putWT?.maxLength && (
                    <p>15文字以下です</p>
                )}
                <br />
                <Button variant="contained" type="submit">Put</Button>
            </Box>
        </form>
    )
}

export default Put;