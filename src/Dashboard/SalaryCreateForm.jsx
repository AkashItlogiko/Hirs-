import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useCreateSalaryMutation } from "../api/Apislice"; // Adjust the import path as needed
import apiSalary from "../api/Salaryslice";
const SalaryCreateForm = () => {
  // const [createSalary, { isLoading }] = useCreateSalaryMutation();
  const token = localStorage.getItem("token");
  const[storeSalary, {error }] = apiSalary.useStoreSalaryMutation();
  console.log('error', error);

  const initialValues = {
    id_card_no: "",
    employee_name: "",
    designation: "",
    department: "",
    pay_date: "",
    net_salary: "",
  };

  const validationSchema = Yup.object({
    id_card_no: Yup.string().required("ID No is required"),
    employee_name: Yup.string().max(255).required("Name is required"),
    designation: Yup.string().max(255).required("Designation is required"),
    department: Yup.string().max(255).required("Department is required"),
    net_salary: Yup.number().required("Net Salary is required").min(0, "Net Salary must be a positive number"),
    pay_date: Yup.date().required("Pay Date is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await storeSalary({ data: { ...values }, token });
      // await createSalary(values).unwrap();
      // alert("Salary details saved successfully!");
      resetForm();
    } catch (error) {
      console.error("Error saving salary details:", error);
      alert("Failed to save salary details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Create Salary Details
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Id No
                    </label>
                    <Field
                      type="text"
                      name="id_card_no"
                      placeholder="Enter ID No"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="id_card_no"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Employee Name
                    </label>
                    <Field
                      type="text"
                      name="employee_name"
                      placeholder="Enter Name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="employee_name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Designation
                    </label>
                    <Field
                      type="text"
                      name="designation"
                      placeholder="Enter Designation"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="designation"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Department
                    </label>
                    <Field
                      type="text"
                      name="department"
                      placeholder="Enter Department"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="department"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Net Salary
                    </label>
                    <Field
                      type="text"
                      name="net_salary"
                      placeholder="Enter Net Salary"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="net_salary"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Pay Date
                    </label>
                    <Field
                      type="date"
                      name="pay_date"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="pay_date"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 text-white rounded-md shadow ${
                    isSubmitting ? "bg-gray-500"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Submitting..."
                    : "Save Salary Details"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SalaryCreateForm;
