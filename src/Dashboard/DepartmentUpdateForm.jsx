import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import apiDepartment from "../api/Departmentslice";

const DepartmentUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [updateDepartment] = apiDepartment.useUpdateMutation();
  const { data: departmentData, error, isLoading, refetch } =
    apiDepartment.useShowQuery({ id, token });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load department data.");
    }
  }, [error]);

  const initialValues = {
    name: departmentData?.data?.name || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(255, "Must be 255 characters or less")
      .required("Department name is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await updateDepartment({ id, data: values, token });
       

      if (result?.error) {
        const message =
          result.error?.data?.message || "Failed to update department.";
        throw new Error(message);
      }

      if (result?.data) {
        toast.success("Department updated successfully");
        navigate("/department");
      } else {
        throw new Error("No response data from server.");
      }
    } catch (error) {
      console.error("Error updating department:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="bg-gray-700 min-h-screen w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Update Department
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
                <label className="block text-gray-700 font-medium mb-2">
                  Department Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter department name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 text-white rounded-md shadow ${
                  isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isSubmitting ? "Updating..." : "Update Department"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DepartmentUpdateForm;
