import styled from "@emotion/styled";
import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Box, Container, createTheme, ThemeProvider } from "@mui/system";
import React, {useState} from "react";
import { useForm } from 'react-hook-form';

type GetProps = {
    id?: number,
    wordName?: string,
    wordType?: string
}

type setWordsProps = {
  words: (number | string)[]
}


const GetAll = (props: GetProps) => {
    const [words, setWords] = useState<setWordsProps[]>([]);

    const {register, handleSubmit, formState: {errors} } = useForm();
    
    const GetEvent = () => {
        fetch("https://wpapi.azurewebsites.net/word")
            .then(response => response.json())
            .then(data => {
              setWords(data)
            })
    }

    function createData(id: number, wordName: string, wordType: string){
        return {id, wordName, wordType};
    }

    const rows: (number | string)[] = [];
    let rowData: (number | string);

    const wordsText = words.map((word) => {
        rowData = createData(word.id, word.wordName, word.wordType);
        rows.push(rowData);
    })

    return(
        <Box 
            sx={{
                display: "inline-flex",
                flexDirection: "column"
            }}
        >
            {wordsText}

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
                        {rows.map((row) => (
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

            <Button variant="contained" onClick={() => GetEvent()}>Get</Button>
        </Box>
    )
}

export default GetAll;