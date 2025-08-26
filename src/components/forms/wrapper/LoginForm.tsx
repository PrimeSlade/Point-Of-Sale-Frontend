import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { login } from "@/api/auth";
import { toast } from "sonner";
import AuthForm from "../form/AuthForm";
import type { Types } from "../form/ReusableFrom";
import type { LoginForm } from "@/types/AuthType";
import { useNavigate } from "react-router-dom";

const CredentialForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: loginMuate,
    isPending: isLoggingIn,
    error: loginError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      form.reset();
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  //Form
  const formSchema = z.object({
    email: z.email("Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loginMuate({ ...values });
  };

  const LoginField = [
    {
      name: "email" as keyof LoginForm,
      label: "Email",
      placeholder: "Enter your email",
    },
    {
      name: "password" as keyof LoginForm,
      label: "Password",
      placeholder: "Enter your password",
      type: "password" as Types,
    },
  ];

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      isPending={isLoggingIn}
      fields={LoginField}
    />
  );
};

export default CredentialForm;
