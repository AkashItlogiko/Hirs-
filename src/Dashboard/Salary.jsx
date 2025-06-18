import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetSalariesQuery, useDeleteSalaryMutation } from "../api/Apislice";

const Salary = () => {
  const navigate = useNavigate();

  // Fetch salary data using RTK Query
  const { data: salaryData = [] } = useGetSalariesQuery();
  const [deleteSalary] = useDeleteSalaryMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this salary record?")) {
      try {
        await deleteSalary(id).unwrap();
        alert("Salary record deleted successfully!");
      } catch (error) {
        console.error("Error deleting salary record:", error);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/salaryform/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-700 w-full">
      <h1 className="text-2xl font-bold text-center text-white mb-6">Salary Report</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-700">Salary List</h2>
          <button
            onClick={() => navigate("/salaryform")}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Create
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Id No</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Designation</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Net Salary</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Pay Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salaryData.length > 0 ? (
                salaryData.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-100">
                    <td className="px-4 py-4 text-gray-600 border-b">{record.id}</td>
                    <td className="px-4 py-4 text-gray-600 border-b">{record.name}</td>
                    <td className="px-4 py-4 text-gray-600 border-b">{record.designation}</td>
                    <td className="px-4 py-4 text-gray-600 border-b">{record.department}</td>
                    <td className="px-4 py-4 text-gray-600 border-b">{record.net_salary}</td>
                    <td className="px-4 py-4 text-gray-600 border-b">{record.pay_date}</td>
                    <td className="px-4 py-4 text-gray-600 border-b">
                      <button
                        onClick={() => handleUpdate(record.id)}
                        className="px-3 py-1 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-3 text-center text-gray-500">
                    No salary records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Salary;
