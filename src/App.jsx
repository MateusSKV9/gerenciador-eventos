import "./App.css";
import { Route, Routes } from "react-router";
import { Events } from "./pages/Events/Events";
import { lazy, Suspense } from "react";
import { Footer, Header, Main } from "./shared";

const Categories = lazy(() => import("./pages/Categories/Categories"));

export default function App() {
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
