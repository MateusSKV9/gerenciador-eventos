import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { EventProvider } from "./providers/EventProvider.jsx";
import { CategoryProvider } from "./providers/CategoryProvider.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<EventProvider>
				<CategoryProvider>
					<App />
				</CategoryProvider>
			</EventProvider>
		</BrowserRouter>
	</StrictMode>
);
