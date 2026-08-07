import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { CategoryProvider, EventProvider } from "@/providers";
import App from "@/App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
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
