import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomDialog({
  open = false,
  handleClose = () => {},
  title = "",
  content = "",
  actions = [],
}) {
  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <BootstrapDialogTitle onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers={!!title}>{content}</DialogContent>
        {actions.length > 1 && (
          <DialogActions>
            {actions.map((action) => (
              <Button onClick={action.onClick} key={action.text}>
                {action.text}
              </Button>
            ))}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
