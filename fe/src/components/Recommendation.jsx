import React from 'react';

const Recommendations = ({ recommendations }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personalized Recommendations</h2>
        <a href="#" className="text-slate-900 hover:text-slate-600 font-semibold text-sm">
          View All →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="h-24 bg-slate-700 flex items-center justify-center text-white font-bold text-lg">
              {course.icon}
            </div>
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">{course.title}</h3>
                <span className="text-xs font-medium text-slate-800 bg-blue-50 px-2 py-1 rounded">
                  {course.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 min-h-16">{course.description}</p>
              {course.progress > 0 ? (
                <>
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress} %`,
                      background: course.progress >= 70
                       ? "linear-gradient(to right, #4cc9f0, #4361ee, #3a0ca3)" // cocok dengan slate
          : course.progress >= 50
          ? "linear-gradient(to right, #fbbf24, #f59e0b)" // amber halus, tetap elegan
          : "linear-gradient(to right, #f87171, #b91c1c)" // merah gelap modern

                     }}
                    ></div>
                  </div>
                  <button className="mt-auto w-full bg-slate-700 hover:bg-slate-500 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                    Continue Learning
                  </button>
                </>
              ) : (
                <button className="mt-auto w-full border border-slate-900 text-slate-900 hover:bg-blue-50 py-2 px-4 rounded-lg font-semibold transition-colors">
                  Start Course
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;