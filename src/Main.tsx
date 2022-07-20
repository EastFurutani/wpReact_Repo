import styled from "@emotion/styled";
import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Box, Container, createTheme, ThemeProvider } from "@mui/system";
import React, {FC, ReactElement, useState} from "react";
import { useForm } from 'react-hook-form';

import GetAll from "./GetAll";
import GetId from "./GetId";
import Post from "./Post";
import Put from "./Put";
import Delete from "./Delete";
import { type } from "@testing-library/user-event/dist/type";

/* type Props = {
  num?: number
} */

//const [select, setSelect] = useState<number>();

/* const ComponentChange = (prop: number): ReactElement => {
    //const num2: number = num;
    if(prop === 0) {
        return <GetAll />
    } else if(props.num === 1) {
        return <GetId />
    } else if(props.num === 2) {
        return <Post />
    } else if(props.num === 3) {
        return <Put />
    } else if(props.num === 4) {
        return <Delete />
    } else {
      return <div>0</div>
    }
} */

const Main = () => {
    const [componentState, setComponentState] = useState<number>();

    const ComponentChange = (num?: number): ReactElement => {
      //const num2: number = num;
      if(num === 0) {
          return <GetAll />
      } else if(num === 1) {
          return <GetId />
      } else if(num === 2) {
          return <Post />
      } else if(num === 3) {
          return <Put />
      } else if(num === 4) {
          return <Delete />
      } else {
        return <div>0</div>
      }
  }

    return (
        <Box>
            <Box
            sx={{
                position: "relative",
                top: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly"
            }}
            >
                <Button variant="contained" onClick={() => setComponentState(0)}>GetAllへ</Button>

                <Button variant="contained" onClick={() => setComponentState(1)}>GetIdへ</Button>

                <Button variant="contained" onClick={() => setComponentState(2)}>Postへ</Button>

                <Button variant="contained" onClick={() => setComponentState(3)}>Putへ</Button>

                <Button variant="contained" onClick={() => setComponentState(4)}>Deleteへ</Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    top: 50
                }}
            >
                {/* <div><ComponentChange prop={componentState}/></div> */}

                {ComponentChange(componentState)}
            </Box>
        </Box>
    )
}

export default Main;