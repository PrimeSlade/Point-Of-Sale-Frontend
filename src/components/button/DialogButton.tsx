import { Button } from "@/components/ui/button";

type DialogButtonProps = {
  name: string;
  icon?: React.ReactNode;
  openFrom: () => void;
};

const DialogButton = ({ name, icon, openFrom }: DialogButtonProps) => {
  return (
    <Button
      className="bg-[var(--primary-color)] rounded-md hover:bg-[var(--primary-color-hover)]"
      onClick={openFrom}
    >
      {icon} {name}
    </Button>
  );
};

export default DialogButton;
