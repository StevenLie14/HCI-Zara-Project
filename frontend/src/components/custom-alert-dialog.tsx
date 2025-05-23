import {Button} from "@/components/ui/button.tsx";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import type {ReactNode} from "react";

interface IProps {
  triggerLabel?: string
  title?: string
  description?: string
  cancelLabel?: string
  confirmLabel?: string
  onConfirm?: () => void
  useTrigger?: boolean
  open?: boolean
  children?: ReactNode
  setOpen?: (open: boolean) => void,
  loading?: boolean
}

const CustomAlertDialog = (
  {
    triggerLabel = "Show Dialog",
    title = "Are you absolutely sure?",
    description = "This action cannot be undone.",
    cancelLabel = "Cancel",
    confirmLabel = "Continue",
    onConfirm = () => {},
    useTrigger = false,
    open = false,
    setOpen,
    loading,
    children
  } : IProps ) => {
  return (
    <>
      {useTrigger ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">{triggerLabel}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                {children}
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={loading}>{cancelLabel}</AlertDialogCancel>
                <AlertDialogAction disabled={loading} onClick={onConfirm}>{confirmLabel}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                {children}
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>{confirmLabel}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
    </>
  )
}

export default CustomAlertDialog
