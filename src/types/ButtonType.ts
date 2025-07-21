import type React from "react";

type DialogButtonProps = {
  name: string;
  icon?: React.ReactNode;
  openFrom: () => void;
};

export type { DialogButtonProps };
