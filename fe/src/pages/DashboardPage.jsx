import React, {useEffect, useState} from "react";
import StatsCard from "../components/StatsCard.jsx";
import Charts from "../components/Charts.jsx";
import Recommendations from "../components/Recommendation.jsx";
import ModuleProgress from "../components/ModuleProgress.jsx";
import axios from "axios";

const DashboardPage = ({data}) => {
    const [student, setStudent] = useState([]);
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("http://localhost:5000/students/2401");
            setStudent(res.data.data);
        };

        getData();
    }, []);

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
        <div className=" flex-1 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard
                    title={`Progress Modul ${data.progress.moduleName || "JavaScript"}`}
                    value={`${data.progress.courseCompletion}%`}
                    subtitle={`+${data.progress.growth || 10}% dari bulan lalu`}
                    progress={data.progress.courseCompletion}
                    color="blue"
                    description={`Total modul selesai: ${data.progress.completedModules || 5}/${
                        data.progress.totalModules || 8
                    }`}
                />

                <StatsCard
                    title="Time Spent Learning"
                    value={formatTime(data.progress.timeSpentToday)}
                    subtitle="Today"
                    progress={(data.progress.timeSpentToday / data.progress.dailyGoal) * 100}
                    color="teal"
                    footer={`Daily Goal: ${formatTime(data.progress.dailyGoal)}`}
                />

                {/* Learning Style Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-4">Learning Style</h3>
                    <div className="text-xl font-bold text-gray-900 mb-2">
                        {learningStyles[data.user.learningStyle].name}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        {learningStyles[data.user.learningStyle].description}
                    </p>
                    <div className="flex space-x-2">
                        {Object.entries(learningStyles).map(([key, style]) => (
                            <span
                                key={key}
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                    key === student.image_path
                                        ? style.color
                                        : "bg-gray-100 text-gray-600 border-gray-200"
                                }`}
                            >
								{style.name.split(" ")[0]}
							</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <Charts
                weeklyActivity={data.weeklyActivity}
                learningDistribution={data.learningDistribution}
            />

            {/* Recommendations Section */}
            <Recommendations recommendations={data.recommendations}/>

            {/* Module Progress Section */}
            <ModuleProgress modules={data.modules}/>
        </div>
    );
};

export default DashboardPage;
