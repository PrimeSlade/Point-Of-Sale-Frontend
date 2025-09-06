import { getMe } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

//The old one
const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    // staleTime: 0, // always consider fresh? set 0 to refetch often
    //refetchOnWindowFocus: true, // auto refresh when tab is focused
    // retry: false, // up to you—disable retries if auth can fail
  });
};

export default useUser;
