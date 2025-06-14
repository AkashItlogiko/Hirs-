import React, { useEffect, useState } from "react";
import axios from "axios";

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employee data from Laravel backend
    axios
      .get("http://your-laravel-backend.com/api/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employee data!", error);
      });
  }, []);

  return (
    <main className="p-6 bg-gray-700 min-h-screen flex flex-col items-center">
      <div className="mb-6 text-center w-full">
        <h1 className="text-3xl font-bold text-white">All Employees</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md w-full max-w-7xl">
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-50 rounded-md border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Position</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Salary</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-100">
                    <td className="px-6 py-3 border-b text-gray-600">{employee.id}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.name}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.position}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.department}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.email}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.phone_number}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.salary}</td>
                    <td className="px-6 py-3 border-b text-gray-600">{employee.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-3 text-center text-gray-500" colSpan="8">
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
