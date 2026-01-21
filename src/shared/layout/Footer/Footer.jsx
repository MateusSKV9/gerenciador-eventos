import styles from "./Footer.module.css";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				Site desenvolvido por{" "}
				<a className={styles.link} href="">
					Mateus Santos
				</a>
			</p>
		</footer>
	);
}
