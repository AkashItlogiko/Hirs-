import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; 
import { useNavigate, useParams } from "react-router-dom"; 
import apiEmployee from "../api/Employeeslice";


const EmployeeUpdateForm = () => {
  const {id}  = useParams();
  const navigate = useNavigate();  
  const token = localStorage.getItem("token");
  const [updateEmployee, { error }] = apiEmployee.useUpdateEmployeeMutation();
  const { data: employee, isLoading: employeeLoading } = apiEmployee.useShowEmployeeQuery({id,token});  

  console.log("Employee data:", employee);

  const initialValues = {
    id_card_number: employee?.data?.id_card_number,
    employee_name: employee?.data?.employee_name,
    designation: employee?.data?.designation,
    department: employee?.data?.department,
    email: employee?.data?.email,
    phone_number: employee?.data?.phone_number,
    address: employee?.data?.address,
  };

  const validationSchema = Yup.object({
    id_card_number: Yup.string().max(255).required("ID is required"),
    employee_name: Yup.string().max(255).required("Name is required"),
    designation: Yup.string().required("Position is required"),
    department: Yup.string().required("Department is required"),
    email: Yup.string().email("Invalid email format").required("Email is required").max(255),
    phone_number: Yup.string().required("Phone number is required").max(14),
    address: Yup.string().required("Address is required").max(255),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await updateEmployee({id, data: { ...values }, token });
      if (result?.data) {
        toast.success("Employee updated successfully!");  
        resetForm();
        navigate("/employees"); 
      } else {
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee.");  
    } finally {
      setSubmitting(false);
    }
  };

  if (employeeLoading) {
    return <div>Loading employee data...</div>;
  }

  return (
    <div className="bg-gray-700 min-h-screen w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Update Employee</h2>
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
                {isSubmitting ? "Submitting..." : "Update Employee"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeUpdateForm;
