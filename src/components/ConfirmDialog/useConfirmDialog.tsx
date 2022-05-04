import React, { useCallback, useState } from 'react'
import ConfirmDialog, { ConfirmDialogProps } from './ConfirmDialog'

type UseConfirmDialog = (props: {
  onConfirm?: () => void
  onCancel?: () => void
  title?: string
  description?: string
  buttons?: ConfirmDialogProps['buttons'],
  DialogProps?: ConfirmDialogProps['DialogProps']

}) => {
  confirmDialog: ReturnType<typeof ConfirmDialog>,
  openConfirmDialog: () => void,
  closeConfirmDialog: () => void
}

const useConfirmDialog: UseConfirmDialog = ({
  title = 'Подтвердите действие',
  description,
  onConfirm,
  onCancel,
  buttons,
  DialogProps,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const openConfirmDialog = useCallback(() => setIsOpen(true), [])
  const closeConfirmDialog = useCallback(() => setIsOpen(false), [])

  const handleConfirmDialog = useCallback(() => {
    closeConfirmDialog()
    onConfirm?.()
  }, [onConfirm])

  const handleCancelDialog = useCallback(() => {
    closeConfirmDialog()
    onCancel?.()
  }, [onCancel])


  return {
    confirmDialog: (
      <ConfirmDialog
        title={title}
        description={description}
        isOpen={isOpen} 
        onConfirm={handleConfirmDialog} 
        onCancel={handleCancelDialog}
        DialogProps={DialogProps}
        buttons={buttons}
      />
    ),
    openConfirmDialog,
    closeConfirmDialog,
  }
}

export default useConfirmDialog