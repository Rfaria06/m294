import { useEffect } from "react";
import LoadingIcons from "react-loading-icons";

function ErrorPage() {
  useEffect(() => {
    const reloadTimeout = setTimeout(() => {
      window.location.reload();
    }, 1);

    return () => clearTimeout(reloadTimeout);
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <LoadingIcons.TailSpin fill="black" />
      </div>
      <h1>Wird geladen...</h1>
    </div>
  );
}

export default ErrorPage;
