import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const navigate = useNavigate();

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
         <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-700">Attendance List</h2>
            <button
            onClick={() => navigate("/attendanceform")} // 3. Navigate to /create route
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Create
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Id No
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Employee Name
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
                  <td className="px-6 py-3 text-center text-gray-500" colSpan="8">
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
