import React, { useEffect, useState } from "react";
import axios from "axios";

const Absence = () => {
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    // Fetch absence data from Laravel backend
    axios
      .get("http://your-laravel-backend.com/api/absences")
      .then((response) => {
        setAbsences(response.data);
      })
      .catch((error) => {
        console.error("Error fetching absences:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-700 w-full">
      <h1 className="text-2xl font-bold text-center text-white mb-6">
        Absence Report
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Id
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Designation
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {absences.length > 0 ? (
                absences.map((absence, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-4 text-gray-600 border-b">
                      {absence.id}
                    </td>
                    <td className="px-4 py-4 text-gray-600 border-b">
                      {absence.name}
                    </td>
                    <td className="px-4 py-4 text-gray-600 border-b">
                      {absence.designation}
                    </td>
                    <td className="px-4 py-4 text-gray-600 border-b">
                      {absence.department}
                    </td>
                    <td className="px-4 py-4 text-gray-600 border-b">
                      {absence.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No absence records found.
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

export default Absence;
