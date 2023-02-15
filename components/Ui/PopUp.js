import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    width:500,
   // height:200,
    padding: "0px",

    top: 200
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  closeButton: {
    position: "absolute",
    right: useTheme().spacing(1),
    top: useTheme().spacing(1),
    color: useTheme().palette.grey[500],
  },
}));

export default function Popup(props) {
  const {
    title,
    children,
    openPopup,
    setOpenPopup,
    maxWidth = "md",
    minWidth = "md",
  } = props;
  const classes = useStyles();
  return (
    <Dialog
      open={openPopup}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      minWidth={minWidth}
      classes={{ paper: classes.dialogWrapper }}
      PaperProps={{ sx: { position: "fixed"}}}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography variant="h4" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <Close />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}