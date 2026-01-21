import { createContext, useContext } from "react";

export const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);
