import "./App.css";
import { Header } from "./shared/layout/Header/Header";
import { Main } from "./shared/layout/Main/Main";
import { Footer } from "./shared/layout/Footer/Footer";
import { Route, Routes } from "react-router";
import { Events } from "./pages/Events/Events";
import { lazy, Suspense } from "react";

const Categories = lazy(() => import("./pages/Categories/Categories"));

function App() {
	return (
		<>
			<Header />

			<Main>
				<Suspense fallback={<p>Carregando...</p>}>
					<Routes>
						<Route path="/" element={<Events />} />
						<Route path="/categories" element={<Categories />} />
					</Routes>
				</Suspense>
			</Main>

			<Footer />
		</>
	);
}

export default App;
