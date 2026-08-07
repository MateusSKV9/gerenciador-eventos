import { Link, NavLink, type NavLinkRenderProps } from "react-router";
import styles from "./Header.module.css";

const isActive = ({ isActive }: NavLinkRenderProps) => (isActive ? styles.active : "");

export function Header() {
	return (
		<header className={styles.header}>
			<Link className={styles.logo} to="/">
				<span className={styles.logo_text}>🗓️ Gerenciador de Eventos</span>
			</Link>

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
