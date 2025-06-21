import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiSalary from "../api/Salaryslice"; // Import Salary API slice

const Salary = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  // Fetch salary data using RTK Query
  const { data: salaries } = apiSalary.useListQuery({
    params: {
      page: 1,
      per_page: 10,
      search: searchTerm,
    },
    token,
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this salary record?")) {
      try {
        await apiSalary.endpoints.deleteSalary.initiate(id).unwrap();
        alert("Salary record deleted successfully!");
      } catch (error) {
        console.error("Error deleting salary record:", error);
      }
    }
  };

  return (
    <main className="bg-gray-700 min-h-screen w-full">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white">Salary Report</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-700">Salary List</h2>
          <button
            onClick={() => navigate("/salaryform")}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Create
          </button>
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Search by employee name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-50 rounded-md border-collapse">
            <thead className="bg-gray-200 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Id No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Employee Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Designation</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Net Salary</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pay Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salaries && salaries?.data?.data?.map((salary) => (
                <tr key={salary.id} className="hover:bg-gray-100">
                  <td className="px-6 py-3 border-b text-gray-600">{salary.id}</td>
                  <td className="px-6 py-3 border-b text-gray-600">{salary.employee_name}</td>
                  <td className="px-6 py-3 border-b text-gray-600">{salary.designation}</td>
                  <td className="px-6 py-3 border-b text-gray-600">{salary.department}</td>
                  <td className="px-6 py-3 border-b text-gray-600">{salary.net_salary}</td>
                  <td className="px-6 py-3 border-b text-gray-600">{salary.pay_date}</td>
                  <td className="px-6 py-3 border-b flex space-x-2">
                    <button
                      onClick={() => navigate(`/salaryform/${salary.id}`)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(salary.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {salaries?.data?.data?.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-3 border-b text-center text-gray-600">
                    No salary records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Salary;
