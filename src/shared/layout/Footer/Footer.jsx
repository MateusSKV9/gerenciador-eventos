import styles from "./Footer.module.css";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				Site desenvolvido por{" "}
				<a
					className={styles.link}
					href="https://www.linkedin.com/in/mateus-santos-1a7361246/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Mateus Santos
				</a>
			</p>
			<span className={styles.rights}>© 2026 Mateus Santos</span>
		</footer>
	);
}
