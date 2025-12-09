import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const [student, setStudent] = useState({
		name: "",
		email: "",
		learning_style: "",
		joined_since: "",
	});
	return <AppContext.Provider value={{ student, setStudent }}>{children}</AppContext.Provider>;
};
