import "./App.css";
import { Header } from "./shared/layout/Header/Header";
import { Main } from "./shared/layout/Main/Main";
import { Footer } from "./shared/layout/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router";
import { Events } from "./pages/Events/Events";
import { Categories } from "./pages/Categories/Categories";

function App() {
	return (
		<>
			<Header />

			<Main>
				<Routes>
					<Route path="/" element={<Events />} />
					<Route path="/categories" element={<Categories />} />
				</Routes>
			</Main>

			<Footer />
		</>
	);
}

export default App;
