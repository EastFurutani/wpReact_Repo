import styled from "@emotion/styled";
import { ErrorMessage } from "@hookform/error-message";
import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Box, Container, createTheme, ThemeProvider } from "@mui/system";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, {useState} from "react";
import { useForm } from 'react-hook-form';


const Post = () => {
    const [postText, setPostText] = useState([])
    const [postText2, setPostText2] = useState([])

    // const {register, handleSubmit, formState: {errors}, formState} = useForm();
    const {register, handleSubmit, formState} = useForm({
        mode: "onChange"
    });
    const onSubmit = data=> console.log(data);

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

    console.log(formState.isValid)

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box 
                sx={{
                    display: "inline-flex",
                    flexDirection: "column"
                }}
            >
                        
                    <TextField {...register("postWN", {required: true, maxLength: 20})} variant="outlined" label="wordName" value={postText} onChange={(e) => setPostText(e.target.value)}></TextField>
                    <br />
                    {formState.errors.postWN?.type === "required" && <p>This field is required</p>}
                    {formState.errors.postWN?.type === "maxLength" && (
                        <p>20文字以下です</p>
                    )}
                    <br />
                    <TextField {...register("postWT", {required: true, maxLength: 15})} variant="outlined" label="wordType" value={postText2} onChange={(e) => setPostText2(e.target.value)}></TextField>
                    {formState.errors.postWT?.type === "required" && <p>This field is required</p>}
                    {formState.errors.postWT?.type === "maxLength" && (
                        <p>15文字以下です</p>
                    )}
                    <br />
                    <Button variant="contained" type="submit">validation確認</Button>
                    <Button variant="contained" disabled={!formState.isValid} onClick={() => PostEvent()}>Post</Button>
            </Box>
        </form>
    )
}

export default Post;