const toUpperCase = (input: string): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

const generateInvoiceId = (input: number, location: string) => {
  return (
    location.slice(0, 3).toUpperCase() + "-" + input.toString().padStart(6, "0")
  );
};

export { toUpperCase, generateInvoiceId };
