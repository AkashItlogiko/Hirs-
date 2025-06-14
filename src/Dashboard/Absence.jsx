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
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Id</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Designation</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {absences.length > 0 ? (
                absences.map((absence, index) => (
                  <tr key={index} className="odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600">
                    <td className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {absence.id}
                    </td>
                    <td className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {absence.name}
                    </td>
                    <td className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {absence.designation}
                    </td>
                    <td className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {absence.department}
                    </td>
                    <td className="px-6 py-4 text-gray-300 border-t border-gray-600">
                      {absence.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400 border-t border-gray-600">
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
