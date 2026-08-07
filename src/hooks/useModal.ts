import { useState } from "react";

export function useModal() {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const showModal = () => setIsCreateModalOpen(true);
	const closeModal = () => setIsCreateModalOpen(false);

	return { isCreateModalOpen, showModal, closeModal };
}
