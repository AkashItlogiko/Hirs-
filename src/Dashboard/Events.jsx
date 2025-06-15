import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://your-laravel-backend.com/api/events") // Replace with your API endpoint
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-700 w-full">
      <h1 className="text-2xl font-bold text-center text-white mb-6">
        Upcoming Events
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-700">Events List</h2>
          <button
            onClick={() => navigate("/eventsform")} // Navigate to event creation route
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Create
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Event Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-4 text-gray-600 border-b">
                      {event.name}
                    </td>
                    <td className="px-4 py-4 text-gray-600 border-b">
                      {new Date(event.date_time).toLocaleDateString()}
                    </td>
                    <td
                      className={`px-4 py-4 border-b ${
                        new Date(event.date_time) > new Date()
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      {new Date(event.date_time) > new Date()
                        ? "Upcoming"
                        : "Ended"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-3 text-center text-gray-500"
                  >
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Events;
