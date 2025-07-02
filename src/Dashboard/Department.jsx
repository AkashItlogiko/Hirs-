import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiDepartment from "../api/Departmentslice"; // <-- make sure this slice exists
import { toast } from "react-toastify";

/**
 * Department
 * -----------------------------------------------------------------------------
 * Reusable list component for departments with:
 *  • server‑side pagination (page + perPage)
 *  • search by department_name
 *  • delete / update actions
 *  • button to navigate to a creation form
 *
 * @param {string} propToken – optional auth token if not stored in localStorage
 */
const Department = ({ token: propToken }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const token = propToken || localStorage.getItem("token");

  const { data: apiDepartments, isFetching } = apiDepartment.useListQuery({
    params: {
      page: currentPage,
      per_page: perPage,
      search: searchTerm,
    },
    token,
  });
  const [deleteDepartment] = apiDepartment.useDeleteDepartmentMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment({ id, token }).unwrap();
        toast.success("Department deleted successfully!");
      } catch (error) {
        console.error("Error deleting department", error);
        toast.error("Failed to delete department.");
      }
    }
  };

  const totalPages = apiDepartments?.data?.last_page || 1;

  return (
    <main className="bg-gray-700 min-h-screen w-full p-4">
      <div className="mb-6 text-center">
        <h1 className="text-3xl py-4 font-bold text-white">Departments</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-700">Department List</h2>
          <button
            onClick={() => navigate("/departmentform")}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Create
          </button>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Search by department name"
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiDepartments?.data?.data?.map((department) => (
                <tr key={department.id} className="hover:bg-gray-100">
                  <td className="px-6 py-3 border-b text-gray-600">{department.id}</td>
                  <td className="px-6 py-3 border-b text-gray-600">{department.department_name}</td>
                  <td className="px-6 py-3 border-b text-gray-600 space-x-2">
                    <button
                      onClick={() => navigate(`/departmentupdateform/${department.id}`)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(department.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {apiDepartments?.data?.data?.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-3 border-b text-center text-gray-600">
                    {isFetching ? "Loading..." : "No departments found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center p-4">
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>{size} per page</option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md shadow ${currentPage === 1 ? "bg-blue-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md shadow ${currentPage === totalPages ? "bg-blue-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Department;
