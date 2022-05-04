import React from 'react'
import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material'

type ConfirmDialogButton = {
  ButtonProps?: ButtonProps
  text?: string
}

export interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
  buttons?: {
    confirm?: ConfirmDialogButton
    cancel?: ConfirmDialogButton
  }
  DialogProps?: DialogProps
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  isOpen,
  buttons,
  DialogProps
}) => (
  <Dialog
    open={isOpen}
    onClose={onCancel}
    {...DialogProps}
  >
    <DialogTitle>{title}</DialogTitle>
    {description && (
      <DialogContent dividers>
        {description}
      </DialogContent>
    )}
    <DialogActions>
      <Button onClick={onCancel} {...buttons?.cancel?.ButtonProps}>
        {buttons?.cancel?.text || 'Отменить'}
      </Button>
      <Button onClick={onConfirm} {...buttons?.confirm?.ButtonProps}>
        {buttons?.confirm?.text || 'ОК'}
      </Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmDialog