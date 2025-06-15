import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Salary = () => {
  const [salaries, setSalaries] = useState([]);
  const navigate = useNavigate();
 

  useEffect(() => {
    // Fetch salary data from Laravel backend
    axios
      .get("http://your-laravel-backend.com/api/salaries")
      .then((response) => {
        setSalaries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching salaries:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-700 w-full">
      <h1 className="text-2xl font-bold text-center text-white mb-6">
        Salary Report
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
         <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-700">Salary List</h2>
          <button
            onClick={() => navigate("/salaryform")} // Navigate to event creation route
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Create
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Id No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Designation</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Net Salary</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Pay Date</th>
              </tr>
            </thead>
            <tbody>
              {salaries.length > 0 ? (
                salaries.map((salary, index) => (
                  <tr key={index} className="odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600">
                    <td className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {salary.id}
                    </td>
                    <td className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {salary.name}
                    </td>
                    <td className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {salary.designation}
                    </td>
                    <td className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {salary.department}
                    </td>
                    <td className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {salary.net_salary}
                    </td>
                    <td className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {salary.pay_date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-400 border-t border-gray-600">
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
