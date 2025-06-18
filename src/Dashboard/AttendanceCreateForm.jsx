import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateEmployeeMutation } from "../api/Apislice"; // Adjust the import path based on your project structure

const AttendanceCreateForm = () => {
  const [createAttendance, { isLoading, isError }] = useCreateEmployeeMutation(); // Use RTK Query hook

  const initialValues = {
    idNo: "",
    employeeName: "",
    designation: "",
    department: "",
    date: "",
    status: "",
  };

  const validationSchema = Yup.object({
    idNo: Yup.string().required("ID No is required"),
    employeeName: Yup.string().required("Employee Name is required"),
    designation: Yup.string().required("Designation is required"),
    department: Yup.string().required("Department is required"),
    date: Yup.date().required("Date is required"),
    status: Yup.string().required("Status is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await createAttendance(values).unwrap(); // RTK Query mutation
      alert("Attendance created successfully!");
      resetForm();
    } catch (error) {
      console.error("Error creating attendance:", error);
      alert("Failed to create attendance.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Create Attendance</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">ID No</label>
                    <Field
                      type="text"
                      name="idNo"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter ID No"
                    />
                    <ErrorMessage
                      name="idNo"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Employee Name</label>
                    <Field
                      type="text"
                      name="employeeName"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Employee Name"
                    />
                    <ErrorMessage
                      name="employeeName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Designation</label>
                    <Field
                      type="text"
                      name="designation"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Designation"
                    />
                    <ErrorMessage
                      name="designation"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Department</label>
                    <Field
                      type="text"
                      name="department"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Department"
                    />
                    <ErrorMessage
                      name="department"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Date</label>
                    <Field
                      type="date"
                      name="date"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Status</label>
                    <Field
                      as="select"
                      name="status"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    >
                      <option value="">Select Status</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {isError && <div className="text-red-500 text-sm mb-2">Failed to create attendance.</div>}

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`w-full px-4 py-2 text-white rounded-md shadow ${
                  isSubmitting || isLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting || isLoading ? "Submitting..." : "Create Attendance"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AttendanceCreateForm;
