import { useEffect, useState } from 'react';
import LoadingIcons from 'react-loading-icons';

function ErrorPage() {
	const [countdown, setCountdown] = useState(5);

	useEffect(() => {
		const reloadTimeout = setTimeout(() => {
			window.location.reload();
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
			<h1>500 - Serverseitiger Fehler</h1>
			<h2>Seite wird in {countdown} Sekunde/n neu geladen.</h2>
		</div>
	);
}

export default ErrorPage;
