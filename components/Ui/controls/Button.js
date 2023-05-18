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
      //  style={{ color: 'white', backgroundColor: '#203040' }}
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      className="bg-blue-800"
      onClick={onClick}
      {...other}
      classes={{ root: classes.root }}
    >
      {text}
    </MuiButton>
  );
}
