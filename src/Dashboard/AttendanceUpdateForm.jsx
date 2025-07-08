import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiAttendance from "../api/Attendanceslice";

const AttendanceUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [updateAttendance] = apiAttendance.useUpdateAttendanceMutation();
  const { data: attendance, isLoading } = apiAttendance.useShowAttendanceQuery({ id, token });

  const initialValues = {
    date: attendance?.data?.date || "",
    status: attendance?.data?.status || "",
  };

  const validationSchema = Yup.object({
    date: Yup.date().required("Date is required"),
    status: Yup.string()
      .oneOf(["present", "absent", "on_leave"], "Status must be Present, Absent or On Leave")
      .required("Status is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await updateAttendance({ id, data: values, token });
      if (result?.data) {
        toast.success("Attendance updated successfully!");
        navigate("/attendance");
      } else {
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast.error("Failed to update attendance.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading attendance data...</div>;
  }

  return (
    <div className="bg-gray-700 min-h-screen w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Update Attendance</h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <Field
                  type="date"
                  name="date"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
                <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Status</label>
                <Field
                  as="select"
                  name="status"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                >
                  <option value="">*Select Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="on_leave">On Leave</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 text-white rounded-md shadow ${
                  isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Update Attendance"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AttendanceUpdateForm;
