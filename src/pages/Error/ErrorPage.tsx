import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";

function ErrorPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const reloadTimeout = setTimeout(() => {
      window.history.back();
    }, countdown * 1000);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearTimeout(reloadTimeout);
      clearInterval(countdownInterval);
    };
  }, [countdown]);

  return (
    <div>
      <div className="flex justify-center">
        <LoadingIcons.TailSpin fill="black" />
      </div>
      <h1 className="text-white">500 - Serverseitiger Fehler</h1>
      <h2 className="text-white">
        Seite wird in {countdown} Sekunde/n neu geladen.
      </h2>
    </div>
  );
}

export default ErrorPage;
