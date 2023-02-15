import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import Controls from "./Controls";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: useTheme().spacing(2),
    position: "absolute",
    top: useTheme().spacing(5),
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },

}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text="No"
          color="inherit"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.Button
          text="Yes"
          color=""secondary
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
