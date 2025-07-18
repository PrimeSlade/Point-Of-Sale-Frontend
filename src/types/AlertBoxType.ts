type AlertBoxProps = {
  open: boolean;
  title: string;
  description: string;
  mode: "error" | "confirm";
  onClose: () => void;
  onConfirm?: () => void;
};

export type { AlertBoxProps };
