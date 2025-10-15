import CredentialForm from "@/components/forms/wrapper/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-[#007b9e] via-[#33b8cc] to-white p-4 sm:p-6 md:p-8">
      <CredentialForm />
    </div>
  );
};

export default Login;
