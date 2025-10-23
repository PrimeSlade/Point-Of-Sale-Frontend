import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loading from "@/components/loading/Loading";

/**
 * Dynamic index route that redirects to the first accessible page
 * based on user's role and permissions
 */

type Page = {
  title: string;
  url: string;
  subject: string | string[];
};

type DynamicIndexProps = {
  url: string;
  pages: Page[];
};

const DynamicIndex = ({ url, pages }: DynamicIndexProps) => {
  const { can, isLoading } = useAuth();

  if (isLoading) {
    return <Loading className="flex justify-center h-screen items-center" />;
  }

  const firstAccessiblePage = pages.find((page) => can("read", page.subject));

  const defaultUrl = firstAccessiblePage ? `/${url}/${firstAccessiblePage.url}` : "/";

  return <Navigate to={defaultUrl} replace />;
};

export default DynamicIndex;
