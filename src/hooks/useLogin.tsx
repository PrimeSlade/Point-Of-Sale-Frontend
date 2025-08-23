// import type { LoginForm } from "@/types/AuthType";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login } from "@/api/auth";
// import { toast } from "sonner";

// const useLogin = () => {
//   const loginUser = async (data: LoginForm) => {
//     const queryClient = useQueryClient();

//     const {
//       mutate: loginMuate,
//       isPending: isLoggingIn,
//       error: loginError,
//     } = useMutation({
//       mutationFn: login,
//       onSuccess: (data) => {
//         toast.success(data?.message);
//         queryClient.invalidateQueries({ queryKey: ["user"] });
//       },
//       onError: (error: any) => {
//         toast.error(error.message);
//       },
//     });
//   };

//   return { loginUser };
// };

// export default useLogin;
