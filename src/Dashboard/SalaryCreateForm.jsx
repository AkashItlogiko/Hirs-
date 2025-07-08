import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiSalary from "../api/Salaryslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiDepartment from "../api/Departmentslice";
import apiEmployee from "../api/Employeeslice";

const SalaryCreateForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [storeSalary] = apiSalary.useStoreSalaryMutation();
  const [selectedDepartment, setSelectedDepartment] = useState("");

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
    { skip: !selectedDepartment }
  );

  const initialValues = {
    employee_id: "",
    department_id: "",
    pay_date: "",
    net_salary: "",
  };

  const validationSchema = Yup.object({
    employee_id: Yup.string().required("Employee is required"),
    department_id: Yup.string().required("Department is required"),
    net_salary: Yup.string()
      .required("Net Salary is required")
      .matches(/^\d+$/, "Net Salary must be a positive number"),
    pay_date: Yup.date().required("Pay Date is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await storeSalary({ data: { ...values }, token });
      if (result?.data) {
        toast.success("Salary details saved successfully!");
        resetForm();
        navigate("/salary");
      } else {
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Error saving salary details:", error);
      toast.error("Failed to save salary details.");
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
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  {/* Department Dropdown */}
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

                  {/* Employee Dropdown */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Employee Name</label>
                    <Field
                      as="select"
                      name="employee_id"
                      className="w-full px-4 py-2 border rounded-md"
                    >
                      <option value="">Select Employee</option>
                      {apiEmployees?.data?.data?.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.employee_name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="employee_id"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  {/* Net Salary */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Net Salary</label>
                    <Field
                      type="text"
                      name="net_salary"
                      placeholder="Enter Net Salary"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="net_salary"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Pay Date */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Pay Date</label>
                    <Field
                      type="date"
                      name="pay_date"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="pay_date"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 text-white rounded-md shadow ${
                    isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Save Salary Details"}
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
