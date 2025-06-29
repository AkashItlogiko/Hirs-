import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiAttendance from '../api/Attendanceslice';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const AttendanceReport = () => {
  const { id: userIdCardNo } = useParams();
  const navigate = useNavigate();

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredYear, setFilteredYear] = useState('');
  const [filteredMonth, setFilteredMonth] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); 

  const token = localStorage.getItem('token');

  const handleSubmit = (values) => {
    setYear(values.year);
    setMonth(values.month);
    setFilteredYear(values.year);
    setFilteredMonth(values.month);
    setShouldFetch(true);
    setCurrentPage(1); 
  };

  const { data: attendance, isFetching } = apiAttendance.useEmployeeAttendanceQuery(
    shouldFetch
      ? {
          token: token,
          params: {
            id_card_no: userIdCardNo,
            month,
            year,
          },
        }
      : null,
    { skip: !shouldFetch }
  );

  useEffect(() => {
    if (attendance && shouldFetch) {
      setAttendanceData(attendance?.data || []);
      setShouldFetch(false);
    }
  }, [attendance, shouldFetch]);

  const generateDates = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const dates = [];
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    }
    return dates;
  };

  const filteredAttendance = attendanceData.filter((item) => {
    if (!item.date) return false;
    const [itemYear, itemMonth] = item.date.split('T')[0].split('-');
    return itemYear === String(filteredYear) && itemMonth === String(filteredMonth).padStart(2, '0');
  });

  const mergedAttendance = generateDates(filteredYear, filteredMonth).map((date) => {
    const record = filteredAttendance.find((item) => item.date.startsWith(date));
    return { date, status: record ? record.status : 'No Record' };
  });

  const validate = (values) => {
    const errors = {};
    if (!values.year) {
      errors.year = 'Required';
    } else if (!/^\d{4}$/.test(values.year)) {
      errors.year = 'Year must be 4 digits';
    }

    if (!values.month) {
      errors.month = 'Required';
    } else if (isNaN(values.month) || values.month < 1 || values.month > 12) {
      errors.month = 'Month must be between 1 and 12';
    }

    return errors;
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = mergedAttendance.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(mergedAttendance.length / recordsPerPage);

  return (
    <main className="min-h-screen bg-gray-100 w-full flex flex-col">
      <header className="bg-gray-800 text-white py-5 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Attendance Report</h1>
          <button
            onClick={() => navigate('/attendance')}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md shadow"
          >
            Back to Attendance List
          </button>
        </div>
      </header>

      <section className="flex-grow max-w-7xl mx-auto p-6 w-full">
        <Formik initialValues={{ month: '', year: '' }} onSubmit={handleSubmit} validate={validate}>
          {() => (
            <Form className="flex flex-wrap items-center gap-6 mb-10 justify-center bg-white p-6 rounded-lg shadow-md">
              <label className="flex flex-col text-gray-700 font-medium w-40">
                Year:
                <Field
                  type="number"
                  name="year"
                  placeholder="Enter Year"
                  min="1900"
                  max="2100"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="year" component="div" className="text-red-600 text-sm mt-1" />
              </label>

              <label className="flex flex-col text-gray-700 font-medium w-40">
                Month:
                <Field
                  as="select"
                  name="month"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="">Select Month</option>
                  {[...Array(12)].map((_, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      {idx + 1}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="month" component="div" className="text-red-600 text-sm mt-1" />
              </label>

              <button
                type="submit"
                className="mt-6 px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              >
                Filter
              </button>
            </Form>
          )}
        </Formik>

        {filteredYear && filteredMonth && (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 px-6 pt-6">
              Summary for {filteredMonth}/{filteredYear}
            </h3>
            <table className="w-full table-auto border-collapse border border-gray-300 shadow-sm rounded-b-lg">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border border-gray-300 px-6 py-3 text-left">Date</th>
                  <th className="border border-gray-300 px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {isFetching ? (
                  <tr>
                    <td colSpan="2" className="text-center py-8 text-blue-600 font-semibold">
                      Loading...
                    </td>
                  </tr>
                ) : currentRecords.length > 0 ? (
                  currentRecords.map((record, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-300 px-6 py-3">{record.date}</td>
                      <td
                        className={`border border-gray-300 px-6 py-3 ${
                          record.status === 'present'
                            ? 'text-green-600 font-semibold'
                            : record.status === 'Absent'
                            ? 'text-red-600 font-semibold'
                            : 'text-gray-600'
                        }`}
                      >
                        {record.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-8 text-gray-500 italic">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center p-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md shadow ${
                  currentPage === 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md shadow ${
                  currentPage === totalPages
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default AttendanceReport;
