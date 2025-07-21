import type { Dispatch, SetStateAction } from "react";

type CreateItemProps = {
  id?: number;
  name?: string;
  category?: string;
  exp?: Date;
  mode: "create" | "edit";
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

export type { CreateItemProps };
