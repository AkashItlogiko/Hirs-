import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiSalary from "../api/Salaryslice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SalaryUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [updateSalary] = apiSalary.useUpdateSalaryMutation();
  const { data: salary, isLoading: salaryLoading } = apiSalary.useShowSalaryQuery({ id, token });

  const initialValues = {
    net_salary: salary?.data?.net_salary || "",
    pay_date: salary?.data?.pay_date || "",
  };

  const validationSchema = Yup.object({
    net_salary: Yup.number()
      .typeError("Net Salary must be a number")
      .required("Net Salary is required")
      .min(0, "Net Salary must be a positive number"),
    pay_date: Yup.date().required("Pay Date is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await updateSalary({ id, data: values, token });
      if (result?.data) {
        toast.success("Salary updated successfully!");
        navigate("/salary");
      } else {
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Error saving salary details:", error);
      toast.error("Failed to update salary details.");
    } finally {
      setSubmitting(false);
    }
  };

  if (salaryLoading) {
    return <div>Loading salary data...</div>;
  }

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Update Salary Info
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Net Salary</label>
                <Field
                  type="text"
                  name="net_salary"
                  placeholder="Enter Net Salary"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="net_salary" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Pay Date</label>
                <Field
                  type="date"
                  name="pay_date"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="pay_date" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 text-white rounded-md shadow ${
                  isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Update Salary"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SalaryUpdateForm;
