import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from "../api/Apislice";

const AllEmployees = () => {
  const navigate = useNavigate();

  // Fetch employee data using RTK Query
  const { data: employees = [], isError } = useGetEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id).unwrap();
      } catch (error) {
        console.error("There was an error deleting the employee!", error);
      }
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-gray-700 min-h-screen w-full">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white">Employees</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-700">Employee List</h2>
          <button
            onClick={() => navigate("/employeeform")}
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
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Id No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Employee Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Designation</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-100">
                    <td className="px-6 py-3 border-b text-gray-600">{employee.id}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.name}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.position}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.department}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.email}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.phone_number}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.address}</td>
                    <td className="px-6 py-3 border-b text-gray-600 flex space-x-2">
                      <button
                        onClick={() => navigate(`/employeeform/${employee.id}`)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-3 text-center text-gray-500">
                    No employees found.
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

export default AllEmployees;
