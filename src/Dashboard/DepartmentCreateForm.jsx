import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiDepartment from "../api/Departmentslice";

const DepartmentCreateForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [createDepartment] = apiDepartment.useCreateMutation();

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(255, "Must be 255 characters or less")
      .required("Department name is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await createDepartment({ data: values, token }).unwrap();
      if (result) {
        toast.success("Department created successfully!");
        resetForm();
        navigate("/department");
      } else {
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Error creating department:", error);
      toast.error("Failed to create department.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Create Department</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Department Name</label>
                <Field
                  type="text"
                  name="department_name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter department name"
                />
                <ErrorMessage
                  name="department_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 text-white rounded-md shadow ${
                  isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Create Department"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DepartmentCreateForm;
