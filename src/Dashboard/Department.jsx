import React, { useState } from "react";

const Department = () => {
  const [departmentName, setDepartmentName] = useState("");

  const handleInputChange = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!departmentName.trim()) {
      alert("Please enter a department name.");
      return;
    }
    console.log("Department Name:", departmentName);
    setDepartmentName(""); // Clear the input field after submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Add Department
        </h2>
        <div className="mb-4">
          <label
            htmlFor="department"
            className="block text-gray-700 font-medium mb-2"
          >
            Department Name
          </label>
          <input
            type="text"
            id="department"
            placeholder="Enter department name"
            value={departmentName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Department;
