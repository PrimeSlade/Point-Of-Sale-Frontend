import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { AlertBoxProps } from "@/types/AlertBoxType";

const AlertBox = ({
  open,
  title,
  description,
  mode,
  onConfirm,
  onClose,
}: AlertBoxProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[var(--danger-color)]">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="font-bold text-[var(--text-primary)]">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {mode === "error" ? (
            <AlertDialogAction
              onClick={onClose}
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)]"
            >
              OK
            </AlertDialogAction>
          ) : (
            <>
              <AlertDialogCancel
                onClick={onClose}
                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)]"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm}>
                Continue
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertBox;
