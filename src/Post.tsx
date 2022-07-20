import styled from "@emotion/styled";
import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Box, Container, createTheme, ThemeProvider } from "@mui/system";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { stringify } from "querystring";
import React, {useState} from "react";
import { useForm } from 'react-hook-form';

const Post = () => {
    const [postText, setPostText] = useState(String)
    const [postText2, setPostText2] = useState(String)

    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = () => {
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
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box 
                sx={{
                    display: "inline-flex",
                    flexDirection: "column"
                }}
            >
                        
                <TextField {...register("postWN", {required: true, maxLength: 20})} variant="outlined" label="wordName" value={postText} onChange={(e) => setPostText(e.target.value)}></TextField>
                {/* <TextField ref={register} name="postWN" variant="outlined" label="wordName" value={postText} onChange={(e) => setPostText(e.target.value)}></TextField> */}
                <br />
                {errors.postWN?.required && <p>入力して下さい</p>}
                {errors.postWN?.maxLength && (
                    <p>20文字以下です</p>
                )}
                <br />
                <TextField {...register("postWT", {required: true, maxLength: 15})} variant="outlined" label="wordType" value={postText2} onChange={(e) => setPostText2(e.target.value)}></TextField>
                {/* <TextField ref={register} name="postWT" variant="outlined" label="wordType" value={postText2} onChange={(e) => setPostText2(e.target.value)}></TextField> */}
                {errors.postWT?.required && <p>入力して下さい</p>}
                {errors.postWT?.maxLength && (
                    <p>15文字以下です</p>
                )}
                <br />
                <Button type="submit" variant="contained">Post</Button>
            </Box>
        </form>
    )
}

export default Post;