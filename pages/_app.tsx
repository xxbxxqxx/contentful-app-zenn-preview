import { useEffect } from 'react';
import { GlobalStyles } from '@contentful/f36-components';
import { SDKProvider } from '@contentful/react-apps-toolkit';
import type { AppProps } from 'next/app';
import 'zenn-content-css';

function App({ Component, pageProps }: AppProps) {

	useEffect(() => {
		import("zenn-embed-elements");
		}, []);

	return (
		<SDKProvider>
			<GlobalStyles />
			<Component {...pageProps} />
		</SDKProvider>
	);
}

export default App;
