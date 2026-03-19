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
import { useTranslation } from "react-i18next";

const CredentialForm = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: loginMuate,
    isPending: isLoggingIn,
    error: loginError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      form.reset();
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  //Form
  const formSchema = z.object({
    email: z.email(t("form.login.error.email_required")),
    password: z.string().min(1, t("form.login.error.password_required")),
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
      label: t("form.login.email_label"),
      placeholder: t("form.login.email_placeholder"),
    },
    {
      name: "password" as keyof LoginForm,
      label: t("form.login.password_label"),
      placeholder: t("form.login.password_placeholder"),
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
