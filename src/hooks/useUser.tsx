import { fetchUser } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchUser,
    // staleTime: 0, // always consider fresh? set 0 to refetch often
    //refetchOnWindowFocus: true, // auto refresh when tab is focused
    // retry: false, // up to you—disable retries if auth can fail
  });
};

export default useUser;
