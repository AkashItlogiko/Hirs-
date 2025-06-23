import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useCreateEmployeeMutation } from "../api/Apislice"; // Import RTK mutation hook

import apiEmployee from "../api/Employeeslice";

const EmployeeCreateForm = () => {
  // const [createEmployee] = useCreateEmployeeMutation(); // Use RTK mutation hook

  const token = localStorage.getItem("token");  

  const [storeEmployee, { error }] = apiEmployee.useStoreEmployeeMutation();  

  console.log('error', error);

  const initialValues = {
    id_card_number: "", // Ensure all fields have initial values
    employee_name: "",
    designation: "",
    department: "",
    email: "",
    phone_number: "",
    address: "",
  };
  
  const validationSchema = Yup.object({
    id_card_number: Yup.number().max(255).required("ID is required"),
    employee_name: Yup.string().max(255).required("Name is required"),
    designation: Yup.string().required("Position is required"),
    department: Yup.string().required("Department is required"),
    email: Yup.string().email("Invalid email format").required("Email is required").max(255),
    phone_number: Yup.string().required("Phone number is required").max(14),
    address: Yup.string().required("Address is required").max(255),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await storeEmployee({ data: { ...values }, token });
      // console.log("Employee created:", result);
      // alert("Employee created successfully!");
      resetForm();
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Failed to create+1 (497) 836-5786 employee.");
    } finally {
      setSubmitting(false);
    }
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
              
              <div className="grid grid-cols-2 gap-4">
                
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Id No</label>
                    <Field
                      type="text"
                      name="id_card_number"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter ID"
                    />
                    <ErrorMessage
                      name="id_card_number"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Employee Name</label>
                    <Field
                      type="text"
                      name="employee_name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Name"
                    />
                    <ErrorMessage
                      name="employee_name"
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
