import { useEffect } from "react";
import LoadingIcons from "react-loading-icons";

function ErrorPage() {
  useEffect(() => {
    const reloadTimeout = setTimeout(() => {
      window.location.reload();
    }, 5000);

    return () => clearTimeout(reloadTimeout);
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <LoadingIcons.TailSpin fill="black" />
      </div>
      <h1>500 - Serverseitiger Fehler</h1>
      <h2>Seite wird in 5 Sekunden neu geladen.</h2>
    </div>
  );
}

export default ErrorPage;
