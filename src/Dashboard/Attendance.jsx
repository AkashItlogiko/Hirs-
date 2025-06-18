import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAttendanceQuery, useDeleteAttendanceMutation } from "../api/Apislice";

const Attendance = () => {
  const navigate = useNavigate();

  // Fetch attendance data using RTK Query
  const { data: attendanceData = [] } = useGetAttendanceQuery();
  const [deleteAttendance] = useDeleteAttendanceMutation();

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteAttendance(id).unwrap();
        alert("Attendance record deleted successfully!");
      } catch (error) {
        console.error("Error deleting attendance record:", error);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/attendanceform/${id}`);
  };

  const filteredAttendance = attendanceData.filter((record) =>
    record.employee_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-700 w-full">
      <h1 className="text-2xl font-bold text-center text-white mb-6">Attendance Report</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-700">Attendance List</h2>
          <button
            onClick={() => navigate("/attendanceform")}
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
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Id No</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Employee Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Designation</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-100">
                    <td className="px-4 py-4 text-gray-600 border-b">{record.id}</td>
                    <td className="px-4 py-4 text-gray-600 border-b">{record.employee_name}</td>
                    <td className="px-4 py-4 text-gray-600 border-b">{record.designation}</td>
                    <td className="px-4 py-4 text-gray-600 border-b">{record.department}</td>
                    <td className="px-4 py-4 text-gray-600 border-b">{record.date}</td>
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
