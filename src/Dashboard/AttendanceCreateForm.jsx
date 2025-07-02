import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiAttendance from "../api/Attendanceslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiDepartment from "../api/Departmentslice";
import apiEmployee from "../api/Employeeslice";

const AttendanceCreateForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showEmployees, setShowEmployees] = useState(false);
  const [attendanceData, setAttendanceData] = useState({}); // track radio values

  const [storeAttendance] = apiAttendance.useStoreAttendanceMutation();

  const { data: departments, isLoading: isDepartmentsLoading } = apiDepartment.useListQuery({
    params: { page: 1, perPage: 100 },
    token,
  });

  const { data: apiEmployees } = apiEmployee.useListQuery(
    {
      params: {
        page: 1,
        per_page: 100,
        department_id: selectedDepartment,
      },
      token,
    },
    { skip: !showEmployees } 
  );

  const initialValues = {
    department_id: "",
    date: "",
  };

  const validationSchema = Yup.object({
    department_id: Yup.string().required("Department is required"),
    date: Yup.date().required("Date is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const formattedData = Object.entries(attendanceData).map(([employee_id, status]) => ({
      employee_id,
      date: values.date,
      status,
    }));

    try {
      const result = await storeAttendance({ data: formattedData, token });
      if (result?.data) {
        toast.success("Attendance submitted!");
        navigate("/attendance");
      } else {
        throw new Error("Unexpected error");
      }
    } catch (err) {
      toast.error("Failed to submit attendance.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Create Attendance</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Department</label>
                  {isDepartmentsLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <Field
                      as="select"
                      name="department_id"
                      className="w-full px-4 py-2 border rounded-md"
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue("department_id", value);
                        setSelectedDepartment(value);
                        setShowEmployees(false);
                      }}
                    >
                      <option value="">Select Department</option>
                      {departments?.data?.data?.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </Field>
                  )}
                  <ErrorMessage
                    name="department_id"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Date</label>
                  <Field
                    type="date"
                    name="date"
                    className="w-full px-4 py-2 border rounded-md"
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue("date", value);
                      setSelectedDate(value);
                      setShowEmployees(false);
                    }}
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {values.department_id && values.date && !showEmployees && (
                <button
                  type="button"
                  onClick={() => setShowEmployees(true)}
                  className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Show Users
                </button>
              )}

              {showEmployees && apiEmployees?.data?.data?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Employees</h3>
                  {apiEmployees.data.data.map((emp) => (
                    <div
                      key={emp.id}
                      className="flex items-center justify-between border-b py-2"
                    >
                      <span>{emp.employee_name}</span>
                      <div className="flex gap-4">
                        {["present", "absent", "on_leave"].map((status) => (
                          <label key={status} className="flex items-center gap-1">
                            <input
                              type="radio"
                              name={`attendance[${emp.id}]`}
                              value={status}
                              checked={attendanceData[emp.id] === status}
                              onChange={() =>
                                setAttendanceData((prev) => ({
                                  ...prev,
                                  [emp.id]: status,
                                }))
                              }
                            />
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showEmployees && apiEmployees?.data?.data?.length > 0 && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-6 w-full px-4 py-2 text-white rounded-md shadow ${
                    isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Take Attendance"}
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AttendanceCreateForm;
