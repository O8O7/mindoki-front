import { forwardRef } from "react";
import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import MarkdownCheatSheet from "./MarkdownCheatSheet";
import { Box } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MarkdownDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: { xs: "block", lg: "none" },
      }}
    >
      <Button onClick={handleClickOpen}>Markdownの書き方チートシート▶︎</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
        >
          <div id="alert-dialog-slide-description">
            <MarkdownCheatSheet />
          </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MarkdownDialog;
