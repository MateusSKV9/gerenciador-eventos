import { NavLink } from "react-router";
import styles from "./Header.module.css";

const isActive = ({ isActive }) => (isActive ? styles.active : "");

export function Header() {
	return (
		<header className={styles.header}>
			<h2>Gerenciador de Tarefas</h2>

			<nav className={styles.nav}>
				<ul className={styles.list}>
					<li className={styles.item}>
						<NavLink className={isActive} to="/">
							Início
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={isActive} to="/categories">
							Categorias
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}
