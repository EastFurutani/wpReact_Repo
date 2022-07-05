import styled from "@emotion/styled";
import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Box, Container, createTheme, ThemeProvider } from "@mui/system";
import React, {useState} from "react";

const Main = () => {
    const [words, setWords] = useState([])

    const [getId, setGetIdOnly] = useState([])
    const [getData, setGetData] = useState([])

    const [postText, setPostText] = useState([])
    const [postText2, setPostText2] = useState([])

    const [putId, setPutId] = useState([])
    const [putText, setPutText] = useState([])
    const [putText2, setPutText2] = useState([])

    const [deleteId, setDeleteId] = useState([])

    const GetEvent = () => {
        fetch("https://wpapi.azurewebsites.net/word")
            .then(response => response.json())
            .then(data => {
                setWords(data)
            })
    }

    const GetIdOnlyEvent = () => {
        fetch("https://wpapi.azurewebsites.net/word/" + getId, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setGetData(data)
            })
    }

    const PostEvent = () => {
        let postData = {
            wordName: postText,
            wordType: postText2
        }

        fetch("https://wpapi.azurewebsites.net/word", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
    }

    const PutEvent = () => {
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

    const DeleteEvent = () => {
        fetch("https://wpapi.azurewebsites.net/word/" + deleteId, {
            method: "DELETE"
        })
    }
    
    /* const wordsText = words.map((word) =>{
        return <div>
                    <p>{word.id}</p>
                    <p>{word.wordName}</p>
                    <p>{word.wordType}</p>
                </div>
    }) */

    function createData(id, wordName, wordType){
        return {id, wordName, wordType};
    }

    const rows = [];
    let rowData;

    const rows2 = [
        createData(getData.id, getData.wordName, getData.wordType)
    ]

    const wordsText = words.map((word) =>{
        rowData = createData(word.id, word.wordName, word.wordType);
        rows.push(rowData);
    })
    
    return (
        <Box
            sx={{
                position: "relative",
                top: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly"
            }}
        >
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
            
            <br />
            <br />

            <Box 
                sx={{
                    display: "inline-flex",
                    flexDirection: "column"
                }}
            >
                {/* {getData.id}
                <br />
                {getData.wordName}
                <br />
                {getData.wordType} */}

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
                            {rows2.map((row) => (
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
                <TextField variant="outlined" label="id" value={getId} onChange={(e) => setGetIdOnly(e.target.value)}></TextField>
                {/* <input value={getId} onChange={(e) => setGetIdOnly(e.target.value)}></input> */}
                <br />
                <Button variant="contained" onClick={() => GetIdOnlyEvent()}>GetId</Button>
                {/* <input type="submit" value="GetId" onClick={() => GetIdOnlyEvent()}></input> */}
            </Box>


            <br />
            <br />
            
            <Box 
                sx={{
                    display: "inline-flex",
                    flexDirection: "column"
                }}
            >                
                <TextField variant="outlined" label="wordName" value={postText} onChange={(e) => setPostText(e.target.value)}></TextField>
                <br />
                <TextField variant="outlined" label="wordType" value={postText2} onChange={(e) => setPostText2(e.target.value)}></TextField>
                <br />
                <Button variant="contained" onClick={() => PostEvent()}>Post</Button>
            </Box>

            <br />
            <br />

            <Box 
                sx={{
                    display: "inline-flex",
                    flexDirection: "column"
                }}
            >
                <TextField variant="outlined" label="id" value={putId} onChange={(e) => setPutId(e.target.value)}></TextField>
                <br />
                <TextField variant="outlined" label="WordName" value={putText} onChange={(e) => setPutText(e.target.value)}></TextField>
                <br />
                <TextField variant="outlined" label="WordType" value={putText2} onChange={(e) => setPutText2(e.target.value)}></TextField>
                <br />
                <Button variant="contained" onClick={() => PutEvent()}>Put</Button>
            </Box>

            <br />
            <br />

            <Box 
                sx={{
                    display: "inline-flex",
                    flexDirection: "column"
                }}
            >
                <TextField variant="outlined" label="id" value={deleteId} onChange={(e) => setDeleteId(e.target.value)}></TextField>
                <br />
                <Button variant="contained" onClick={() => DeleteEvent()}>Delete</Button>
            </Box>
        </Box>   
    )
}

export default Main;