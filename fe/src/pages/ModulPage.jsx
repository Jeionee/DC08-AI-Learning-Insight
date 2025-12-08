import React from "react";

export default function ModulePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Module Page</h1>
      <p className="text-gray-600">
        Ini adalah tampilan modul sementara (kasaran).
      </p>
      <div className="mt-4 space-y-2">
        <div className="p-4 bg-white rounded-xl shadow">Module 1</div>
        <div className="p-4 bg-white rounded-xl shadow">Module 2</div>
        <div className="p-4 bg-white rounded-xl shadow">Module 3</div>
      </div>
    </div>
  );
}
