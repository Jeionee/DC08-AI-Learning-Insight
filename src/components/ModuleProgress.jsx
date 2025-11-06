import React from 'react';

const ModuleProgress = ({ modules }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Module Progress & Assessment</h2>
      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">{module.title}</h3>
              <span className="text-blue-600 font-semibold">{module.progress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
            <div className="flex space-x-6">
              {module.assessments.map((assessment, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">{assessment.name}:</span>
                  <span className={`font-semibold text-sm ${
                    assessment.score === null 
                      ? 'text-gray-400' 
                      : assessment.score >= 80 
                        ? 'text-green-600' 
                        : assessment.score >= 70 
                          ? 'text-amber-600' 
                          : 'text-red-600'
                  }`}>
                    {assessment.score === null ? 'Pending' : `${assessment.score}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleProgress;