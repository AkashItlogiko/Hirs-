import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch attendance data from Laravel backend
    axios
      .get("http://your-laravel-backend.com/api/attendance")
      .then((response) => {
        setAttendanceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-700 w-full">
      <h1 className="text-2xl font-bold text-center text-white mb-6">
        Attendance Report
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
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Employee Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.length > 0 ? (
                attendanceData.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-4 text-gray-600 border-b">
                      {record.date}
                    </td>
                    <td className="px-4 py-4 text-gray-600 border-b">
                      {record.employee_name}
                    </td>
                    <td
                      className={`px-4 py-4 border-b ${
                        record.status === "Present"
                          ? "text-green-600"
                          : record.status === "Absent"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No attendance records found.
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

export default Attendance;
