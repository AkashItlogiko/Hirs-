import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiEmployee from "../api/Employeeslice";
import apiDepartment from "../api/Departmentslice";

const EmployeeCreateForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [storeEmployee, { error }] = apiEmployee.useStoreEmployeeMutation();

  const { data: departments, isLoading: isDepartmentsLoading }= apiDepartment.useListQuery({
    params: { page: 1, perPage: 100 },
    token,
  }); 

  // Initial values
  const initialValues = {
    id_card_number: "",
    nid_number: "",        
    employee_name: "",
    designation: "",
    department_id: "",
    email: "",
    phone_number: "",
    profile_photo: "",
    joining_date: "",
    present_address: "",
    permanent_address: "",
  };

  // Validation
  const validationSchema = Yup.object({
    id_card_number: Yup.string().max(255).required("ID is required"),
    nid_number: Yup.string().max(20).required("NID No is required"), // ✅ NID validation
    employee_name: Yup.string().max(255).required("Name is required"),
    designation: Yup.string().required("Position is required"),
    department_id: Yup.string().required("Department is required"),
    email: Yup.string().email("Invalid email format").required("Email is required").max(255),
    phone_number: Yup.string().required("Phone number is required").max(14),
    profile_photo: Yup.mixed().required("Profile photo is required"),
    joining_date: Yup.date().required("Joining date is required"),
    present_address: Yup.string().required("Present address is required"),
    permanent_address: Yup.string().required("Permanent address is required"),
  });
 
        const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
        const formData = new FormData();
        console.log(formData);

        Object.entries(values).forEach(([key, value]) =>                       
          formData.append(key, value),
        );   
    
      const result = await storeEmployee({ data: formData, token });
      if (result?.data) {
        toast.success("Employee created successfully!");
        resetForm();
        navigate("/employees");
      } else {
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("Failed to create employee.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-700 min-h-10vh w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Create Employee</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {/* ID Card Number */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">ID Card No</label>
                    <Field
                      type="text"
                      name="id_card_number"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter ID Card No"
                    />
                    <ErrorMessage name="id_card_number" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>

                  
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">NID No</label>
                    <Field
                      type="text"
                      name="nid_number"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter NID Number"
                    />
                    <ErrorMessage name="nid_number" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>

                  {/* Name */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Employee Name</label>
                    <Field
                      type="text"
                      name="employee_name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Name"
                    />
                    <ErrorMessage name="employee_name" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>

                  {/* Designation */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Designation</label>
                    <Field
                      type="text"
                      name="designation"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Designation"
                    />
                    <ErrorMessage name="designation" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>

                  {/* Department */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Department</label>
                    {isDepartmentsLoading ? (
                      <p>Loading ...</p>
                    ) : (
                      <Field as="select" name="department_id" className="w-full px-4 py-2 border rounded-md focus:outline-none">
                        <option value="">Select Department</option>
                        {departments?.data?.data?.map((dept) => (
                          <option key={dept?.id} value={dept?.id}>{dept.name}</option>
                        ))}
                      </Field>
                    )}
                    <ErrorMessage name="department_id" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>

                  {/* Joining Date */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Joining Date</label>
                    <Field type="date" name="joining_date" className="w-full px-4 py-2 border rounded-md focus:outline-none"/>
                    <ErrorMessage name="joining_date" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>
                </div>

                <div>
                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>

                  {/* Phone */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <Field
                      type="text"
                      name="phone_number"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Phone Number"
                    />
                    <ErrorMessage name="phone_number" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>

                  {/* Profile Photo */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Profile Photo</label>
                    <input
                      type="file"
                      name="profile_photo"
                      onChange={(event) => setFieldValue("profile_photo", event.currentTarget.files[0])}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    />
                    <ErrorMessage name="profile_photo" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>

                  {/* Present Address */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Present Address</label>
                    <Field
                      type="text"
                      name="present_address"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Present Address"
                    />
                    <ErrorMessage name="present_address" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>

                  {/* Permanent Address */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Permanent Address</label>
                    <Field
                      type="text"
                      name="permanent_address"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      placeholder="Enter Permanent Address"
                    />
                    <ErrorMessage name="permanent_address" component="div" className="text-red-500 text-sm mt-1"/>
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
