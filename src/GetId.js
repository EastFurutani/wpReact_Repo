import styled from "@emotion/styled";
import { ErrorMessage } from "@hookform/error-message";
import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Box, Container, createTheme, ThemeProvider } from "@mui/system";
import React, {useState} from "react";
import { useForm } from 'react-hook-form';


const GetId = () => {
    const [getId, setGetIdOnly] = useState([])
    const [getData, setGetData] = useState([])

    const {register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = data => {
        console.log(data);
        fetch("https://wpapi.azurewebsites.net/word/" + getId, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setGetData(data)
            })
    }

    /* function createData(id, wordName, wordType){
        return {id, wordName, wordType};
    }

    const rows2 = [
        createData(getData.id, getData.wordName, getData.wordType)
    ] */

    const GetArray = [getData]

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box 
                sx={{
                    display: "inline-flex",
                    flexDirection: "column"
                }}
            >
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">id</TableCell>
                                <TableCell align="right">wordName</TableCell>
                                <TableCell align="right">wordType</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {GetArray.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell align="right">{row.wordName}</TableCell>
                                    <TableCell align="right">{row.wordType}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <br />
                <TextField {...register("getId", {required: true, pattern: /\d/})} variant="outlined" label="id" value={getId} onChange={(e) => setGetIdOnly(e.target.value)}></TextField>
                {errors.getId?.type === "required" && <p>入力して下さい</p>}
                {errors.getId?.type === "pattern" && (
                        <p>入力値は整数です</p>
                )}
                <br />
                <Button variant="contained" type="submit">GetId</Button>
            </Box>
        </form>
    )
}

export default GetId;