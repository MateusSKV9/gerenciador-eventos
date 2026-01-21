import { createPortal } from "react-dom";
import styles from "./CreateModal.module.css";
import { useSearchParams } from "react-router";
import { CategoryForm } from "../../../features/categories/components/CategoryForm/CategoryForm";
import { Children, useEffect } from "react";

export function CreateModal({ close, children }) {
	const [searchParamns, setSearchParamns] = useSearchParams();
	const id = searchParamns.get("event")?.toLowerCase();

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	const handleClose = () => {
		close();
		setSearchParamns({});
	};

	return createPortal(
		<div onClick={handleClose} className={styles.overlay}>
			<div onClick={(e) => e.stopPropagation()} className={styles.modal}>
				<header className={styles.header}>
					<h2> {id ? "Editando Evento" : "Criando Evento"}</h2>

					<button className={styles.close_button} onClick={handleClose} type="button">
						<svg className={styles.close_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
							<path
								fill="currentColor"
								d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"
							/>
						</svg>
					</button>
				</header>

				<div className={styles.body}>{children}</div>
			</div>
		</div>,
		document.getElementById("modal-root")
	);
}
