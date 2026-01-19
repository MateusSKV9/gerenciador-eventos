import { useState } from "react";
import { useCategories } from "../../../../hooks/useCategories";
import { useEvents } from "../../../../hooks/useEvents";
import { Form } from "../../../../shared/components/Form/Form";
import { Input } from "../../../../shared/components/Input/Input";
import { Select } from "../../../../shared/components/Select/Select";
import styles from "./EventForm.module.css";
import { format } from "date-fns";

export function EventForm({ close, textSubmitButton }) {
	const { createEvent } = useEvents();
	const { categories } = useCategories();

	const [event, setEvent] = useState({});

	const handleSubmit = (e) => {
		try {
			e.preventDefault();
			createEvent({ id: crypto.randomUUID(), creationDate: format(new Date(), "yyyy-MM-dd"), ...event });
			close();
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (e) => {
		setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<Form handleSubmit={handleSubmit}>
			<Input
				handleChange={handleChange}
				value={event.name ? event.name : ""}
				id="name"
				label="Nome do evento"
				name="name"
				placeholder="Digite o nome do evento"
				type="text"
			/>

			<div className={styles.wrapper}>
				<Input
					handleChange={handleChange}
					value={event.expirationDate ? event.expirationDate : ""}
					id="expirationDate"
					label="Data da evento"
					name="expirationDate"
					type="date"
				/>
				<Select handleChange={handleChange} label="Categoria" id="categoryId" name="categoryId" options={categories} />
			</div>

			<input className={styles.submitButton} type="submit" value={textSubmitButton} />
		</Form>
	);
}
