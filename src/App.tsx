import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import PCLayout from "./pc";
import store from "./common/store";
import "./common/styles.scss";

export default function App() {
	return (
		<BrowserRouter>
			<ReduxProvider store={store}>
				<PCLayout />
			</ReduxProvider>
		</BrowserRouter>
	);
}
