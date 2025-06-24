import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiAttendance from "../api/Attendanceslice";  
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AttendanceCreateForm = () => {
  const navigate=useNavigate();
  const token = localStorage.getItem("token");  
  const [storeAttendance,{error}]=apiAttendance.useStoreAttendanceMutation(); 
   

  const initialValues = {
    id_card_no: "",
    employee_name: "",
    department: "",
    designation: "",
    date: "",
    status: "",
  };

  const validationSchema = Yup.object({
    id_card_no: Yup.string().max(255).required("ID No is required"),
    employee_name: Yup.string().max(255).required("Employee Name is required"),
    designation: Yup.string().max(255).required("Designation is required"),
    department: Yup.string().max(255).required("Department is required"),
    date: Yup.date().required("Date is required"),
    status: Yup.string().oneOf(["present", "absent"],"Status must be 'Present' or 'Absent").required("Status is required"),
  });

  const handleSubmit = async(values, { setSubmitting, resetForm }) => {
    try {
      const result =await storeAttendance({ data: { ...values }, token });
      if(result?.data){
        toast.success("Attendance created successfully!");
         resetForm();
         navigate("/attendance");
      }else{
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Error creating attendance:", error);
      toast.error("Failed to create attendance.");
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
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">ID No</label>
                    <Field
                      type="text"
                      name="id_card_no"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter ID No"
                    />
                    <ErrorMessage name="id_card_no" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Employee Name</label>
                    <Field
                      type="text"
                      name="employee_name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Employee Name"
                    />
                    <ErrorMessage name="employee_name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Designation</label>
                    <Field
                      type="text"
                      name="designation"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Designation"
                    />
                    <ErrorMessage name="designation" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Department</label>
                    <Field
                      type="text"
                      name="department"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Department"
                    />
                    <ErrorMessage name="department" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
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
                      <option value="">Select Status</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </Field>
                    <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
              </div>
               
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 text-white rounded-md shadow ${
                  isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Create Attendance"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AttendanceCreateForm;
