import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import Controls from "./controls/Controls";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: useTheme().spacing(2),
    top: 100,
  
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    "&:hover": {
    
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();
  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}  PaperProps={{ sx: { position: "fixed"}}}>
      <DialogContent className={classes.dialogContent}>
        <Typography    style={{ color:"#1367C8"}} variant="h6">{confirmDialog.title}</Typography>
        <Typography    style={{ color:"#1367C8"}} variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text="No"
          color=""
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.Button
          text="Yes"
          color=""
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
