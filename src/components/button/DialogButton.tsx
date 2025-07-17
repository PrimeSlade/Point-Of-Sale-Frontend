import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { DialogButtonProps } from "@/types/ButtonType";

const DialogButton = ({ name, icon, form }: DialogButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[var(--primary-color)] rounded-md hover:bg-[var(--primary-color-hover)]">
          {icon} {name}
        </Button>
      </DialogTrigger>
      {form && form}
    </Dialog>
  );
};

export default DialogButton;
