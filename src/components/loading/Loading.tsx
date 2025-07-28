type LoadingProps = {
  className?: string;
};

const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="w-10 h-10 border-4 border-t-transparent border-[var(--primary-color)] rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
