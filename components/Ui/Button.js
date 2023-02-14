import React from "react";
import { Button as MuiButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
const useStyles = makeStyles((theme) => ({
  root: { margin: useTheme().spacing(0.5),

     textTransform: "none" },
}));

export default function Button(props) {
  const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();
  return (
    <MuiButton
    
      variant={variant || "contained"}
      size={size || "large"}
 
      onClick={onClick}
      {...other}
      classes={{ root: classes.root }}
    >
      {text}
    </MuiButton>
  );
}
