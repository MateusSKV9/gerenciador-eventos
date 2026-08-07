import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventDataSchema, type EventData, type EventType } from "@/features/events/schemas/eventSchema";
import { useEvents, useCategories } from "@/hooks";
import { Form, Input, Select, SubmitButton } from "@/shared";
import styles from "./EventForm.module.css";

type EventFormProps = {
	close: () => void;
	eventData?: EventType;
	textSubmitButton: string;
};

export function EventForm({ close, eventData, textSubmitButton }: EventFormProps) {
	const { createEvent, updateEvent } = useEvents();
	const { categories } = useCategories();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<EventData>({ resolver: zodResolver(EventDataSchema), defaultValues: eventData || {} });

	const handleOnSubmit = (data: EventData) => {
		try {
			eventData?.id ? updateEvent(eventData.id, { ...data }) : createEvent({ ...data });
			close();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Form onSubmit={handleSubmit(handleOnSubmit)}>
			<Input
				id="name"
				type="text"
				label="Nome do evento"
				placeholder="Digite o nome do evento"
				error={errors.name?.message}
				{...register("name")}
			/>

			<div className={styles.wrapper}>
				<Input
					id="expirationDate"
					label="Data da evento"
					type="date"
					error={errors.expirationDate?.message}
					{...register("expirationDate")}
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
						{...register("description")}
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
