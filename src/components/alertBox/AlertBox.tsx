import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AlertBoxProps = {
  open: boolean;
  title: string;
  description: string;
  mode: "error" | "confirm";
  onClose: () => void;
  onConfirm?: () => void;
};

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
              <AlertDialogAction
                onClick={onConfirm}
                className="bg-[var(--danger-color)] hover:bg-[var(--danger-color-hover)]"
              >
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
