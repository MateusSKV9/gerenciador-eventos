import styles from "./Main.module.css";

export function Main({ children }) {
	return <main className={styles.main}>{children}</main>;
}
