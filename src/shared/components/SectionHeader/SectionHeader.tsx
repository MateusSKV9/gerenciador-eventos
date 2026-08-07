import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
	title: string;
	children: ReactNode;
};

export function SectionHeader({ title, children }: SectionHeaderProps) {
	return (
		<header className={styles.header}>
			<h1>{title}</h1>

			<div className={styles.container_buttons}>{children}</div>
		</header>
	);
}
