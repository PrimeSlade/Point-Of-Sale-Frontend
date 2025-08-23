import { fetchUser } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  return useQuery({
    queryFn: fetchUser,
    queryKey: ["user"],
  });
};

export default useUser;
