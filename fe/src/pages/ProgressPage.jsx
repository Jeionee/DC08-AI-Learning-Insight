import React from "react";

export default function ProgressPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Progress</h1>

      <p>Ini halaman progress.</p>

      <div className="mt-4 p-4 border rounded bg-white">
        <h2 className="text-xl font-semibold mb-2">Progress Mingguan</h2>
        <p>( grafik atau data)</p>
      </div>

      <div className="mt-4 p-4 border rounded bg-white">
        <h2 className="text-xl font-semibold mb-2">Detail Belajar</h2>
        <p>( konten lain)</p>
      </div>
    </div>
  );
}
