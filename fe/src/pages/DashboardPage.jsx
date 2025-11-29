import React, { useEffect, useState } from "react";
/* components */
import { Charts } from "../components/common/Charts";

/* library */
import axios from "axios";

const DashboardPage = () => {
	const learningStyles = {
		consistent: {
			name: "Consistent Learner",
			description: "You learn best with regular, structured study sessions",
			color: "bg-green-100 text-green-800 border-green-200",
			badgeColor: "bg-green-500",
		},
		fast: {
			name: "Fast Learner",
			description: "You quickly grasp new concepts and prefer accelerated learning",
			color: "bg-amber-100 text-amber-800 border-amber-200",
			badgeColor: "bg-amber-500",
		},
		reflective: {
			name: "Reflective Learner",
			description: "You prefer to think deeply and reflect on what you've learned",
			color: "bg-purple-100 text-purple-800 border-purple-200",
			badgeColor: "bg-purple-500",
		},
	};

	return (
		<div className="">
			<Charts />
		</div>
	);
};

export default DashboardPage;
