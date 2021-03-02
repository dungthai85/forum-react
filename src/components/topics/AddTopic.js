import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '96%',
      },
    },
  }));
  
  export default function AddPost() {
    const classes = useStyles();
  
    const handleTitle = (event) => {
  
    };
  
    const handleDesc = (event) => {
  
    };
    
    return (
      <form >
        <div className={classes.root}>
            <h3 style={{paddingLeft: '2%', color: 'darkgray'}}>Add new post</h3>
          <TextField
            label="Title"
            rowsMax={1}
            onChange={handleTitle}
            variant="outlined"
          />
          <br></br>
          <TextField
            label="Description"
            multiline
            onChange={handleDesc}
            rows={5}
            variant="outlined"
          />
          <br></br>
          <p style={{paddingLeft: '2%'}} ><Button component={Link} variant="outlined" to="Home">Submit</Button></p>
        </div>
      </form>
    );
  }