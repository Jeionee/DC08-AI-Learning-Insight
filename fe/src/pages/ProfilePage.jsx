import React, { useEffect, useState } from "react";
import { getStudent } from "../api/studentApi";
import dateFormatter from "../utils/dateFormatter";

export default function ProfilePage({ user }) {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    learning_style: "",
    avatar: null,
    joined_since: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStudent();
        setStudent(data);

        setFormData({
          name: data.name,
          email: data.email,
          learning_style: data.learning_style,
          avatar: data.photo_profile,
          joined_since: data.joined_since,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    }

    fetchData();
  }, []);

  if (!student) {
    return <p className="p-6 text-gray-600">Loading...</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Data disimpan:", formData);
    setIsEditing(false);
  };

  // ===== MODE EDIT =====
  if (isEditing) {
    return (
      <div className="p-8 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
        <form className="space-y-4" onSubmit={handleSave}>
          {/* Avatar */}
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-4xl font-bold overflow-hidden">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                student.name.charAt(0)
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-1"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 mt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 bg-gray-300 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>

      {/* PROFILE + LEARNING STYLE & INFORMASI DETAIL (1 CARD RAPI) */}
      <div className="bg-white rounded-2xl shadow-md border p-8 flex flex-col lg:flex-row gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0 w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-slate-700 text-white flex items-center justify-center text-4xl font-bold overflow-hidden">
          {student.photo_profile ? (
            <img
              src={student.photo_profile}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            student.name.charAt(0)
          )}
        </div>

        {/* Info Utama */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Nama */}
            <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-gray-600 mt-1">Student at LeanSmart Academy</p>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Bergabung Sejak{" "}
                {student.joined_since && dateFormatter(student.joined_since)}
              </span>
              <span className="bg-green-100 text-green-800 px-5 py-1 rounded-full text-sm font-medium">
                Learning Style: {student.learning_style || "Belum ditentukan"}
              </span>
            </div>
          </div>

          {/* Informasi Detail */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Informasi Detail
            </h3>
            <ul className="text-gray-700 ">
              <li>
                <strong className="text-gray-900">Email:</strong>{" "}
                {student.email}
              </li>
              {/* Bisa tambah field lain di sini */}
            </ul>
          </div>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="mt-8">
        <button
          className="px-6 py-3 bg-slate-700 hover:bg-slate-800 transition rounded-xl text-white font-semibold shadow"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
