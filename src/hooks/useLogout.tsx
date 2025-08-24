import { useQueryClient } from "@tanstack/react-query";
import { clearCookie } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const data = await clearCookie();

      if (data.success) {
        queryClient.removeQueries({ queryKey: ["user"] });
        navigate("/");
      }
    } catch (error: any) {
      const message = `Logout failed (${error.message})` || "Logout failed";
      toast.error(message);
    }
  };

  return { logout };
};

export default useLogout;
