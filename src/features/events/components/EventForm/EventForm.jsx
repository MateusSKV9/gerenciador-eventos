import { useState } from "react";
import { useCategories } from "../../../../hooks/useCategories";
import { useEvents } from "../../../../hooks/useEvents";
import { Form } from "../../../../shared/components/Form/Form";
import { Input } from "../../../../shared/components/Input/Input";
import { Select } from "../../../../shared/components/Select/Select";
import styles from "./EventForm.module.css";

export function EventForm({ textSubmitButton }) {
	const { createEvent } = useEvents();
	const { categories } = useCategories();

	const [event, setEvent] = useState({});

	const handleSubmit = () => {
		createEvent({ id: crypto.randomUUID(), creationDate: new Date(), ...event });
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
