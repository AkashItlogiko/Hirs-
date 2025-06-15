import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const EmployeeCreateForm = () => {
  const initialValues = {
    id: "",
    name: "",
    position: "",
    department: "",
    email: "",
    phone_number: "",
    salary: "",
    address: "",
  };

  const validationSchema = Yup.object({
    id: Yup.number().required("ID is required"),
    name: Yup.string().required("Name is required"),
    position: Yup.string().required("Position is required"),
    department: Yup.string().required("Department is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone_number: Yup.string()
      .matches(/^\d{11}$/, "Must be 11 digits")
      .required("Phone number is required"),
    salary: Yup.number().required("Salary is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post("http://your-laravel-backend.com/api/employees", values)
      .then((response) => {
        alert("Employee created successfully!");
        resetForm();
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
        alert("Failed to create employee.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="bg-gray-700 min-h-screen w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Create Employee</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Grid Layout */}
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">ID</label>
                    <Field
                      type="text"
                      name="id"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter ID"
                    />
                    <ErrorMessage
                      name="id"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Position</label>
                    <Field
                      type="text"
                      name="position"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Position"
                    />
                    <ErrorMessage
                      name="position"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
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
                </div>

                {/* Right Column */}
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <Field
                      type="text"
                      name="phone_number"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Phone Number"
                    />
                    <ErrorMessage
                      name="phone_number"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Salary</label>
                    <Field
                      type="text"
                      name="salary"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Salary"
                    />
                    <ErrorMessage
                      name="salary"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Address</label>
                    <Field
                      type="text"
                      name="address"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Address"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
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
                {isSubmitting ? "Submitting..." : "Create Employee"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeCreateForm;
