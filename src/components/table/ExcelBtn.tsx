import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exportItems, importItems } from "@/api/inventories";
import { toast } from "sonner";

const ExcelBtn = () => {
  const { can } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: importItemsMutate, isPending: isImporting } = useMutation({
    mutationFn: importItems,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const { mutate: exportItemMutate, isPending: isExporting } = useMutation({
    mutationFn: exportItems,
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "items";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Items exported successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importItemsMutate(file);
      e.target.value = "";
    }
  };

  return (
    <div className="flex gap-3">
      {can("export", "Item") && (
        <Button
          className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)]"
          onClick={() => exportItemMutate()}
        >
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      )}
      {can("import", "Item") && (
        <>
          <Label
            htmlFor="importFile"
            className="bg-[var(--success-color)] hover:bg-[var(--success-color-hover)] text-white  cursor-pointer py-1 px-4 rounded-md text-base font-medium flex justify-center"
          >
            {isImporting ? "Importing..." : "Import"}
          </Label>
          <Input
            type="file"
            id="importFile"
            className="hidden"
            onChange={handleFileChange}
            disabled={isImporting}
            accept=".xlsx,.xls,.csv"
          />
        </>
      )}
    </div>
  );
};

export default ExcelBtn;
