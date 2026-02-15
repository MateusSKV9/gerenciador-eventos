import { useCategories } from "../../../../hooks/useCategories";
import { useEvents } from "../../../../hooks/useEvents";
import { Form } from "../../../../shared/components/Form/Form";
import { Input } from "../../../../shared/components/Input/Input";
import { Select } from "../../../../shared/components/Select/Select";
import styles from "./EventForm.module.css";
import { format } from "date-fns";
import { SubmitButton } from "../../../../shared/components/SubmitButton/SubmitButton";

import { useForm } from "react-hook-form";

export function EventForm({ close, eventData, textSubmitButton }) {
	const { createEvent, updateEvent } = useEvents();
	const { categories } = useCategories();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({ defaultValues: eventData || {} });

	const handleOnSubmit = (data) => {
		try {
			if (eventData.id) {
				updateEvent(data);
			} else {
				createEvent({ id: crypto.randomUUID(), creationDate: format(new Date(), "yyyy-MM-dd"), ...data });
			}
			close();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Form handleSubmit={handleSubmit(handleOnSubmit)}>
			<Input
				id="name"
				type="text"
				label="Nome do evento"
				placeholder="Digite o nome do evento"
				error={errors.name?.message}
				{...register("name", { required: "Nome é obrigatório" })}
			/>

			<div className={styles.wrapper}>
				<Input
					id="expirationDate"
					label="Data da evento"
					type="date"
					error={errors.expirationDate?.message}
					{...register("expirationDate", { required: "Data de experição obrigatória" })}
				/>
				<Select id="categoryId" label="Categoria" options={categories} {...register("categoryId")} />
			</div>
			<div className={styles.textarea_group}>
				<label className={styles.label} htmlFor="description">
					Descrição
				</label>
				<div className={styles.container_textarea}>
					<textarea
						id="description"
						className={styles.textarea}
						placeholder="Digite alguma anotação ou observação (opcional)"
						{...register("description", { maxLength: { value: 150, message: "Máximo de 150 caracteres" } })}
					></textarea>
					{errors.description && (
						<span>
							<span className={styles.error}>*</span>
							{errors.description?.message}
						</span>
					)}
				</div>
			</div>
			<SubmitButton text={textSubmitButton} />
		</Form>
	);
}
