import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { format } from "date-fns";

function Events() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleUpdateStatus = async (eventId, currentStatus) => {
    const eventDoc = doc(db, "events", eventId);
    const newStatus = currentStatus === "pending" ? "accepted" : "pending";

    await updateDoc(eventDoc, { event_status: newStatus });

    if (filter === "pending" && newStatus === "accepted") {
      // Remove event from the list if it was in "Pending Events" and changed to "Accepted"
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } else {
      // Update the event status in the list
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, event_status: newStatus } : event
        )
      );
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      let eventCollection = collection(db, "events");

      if (filter !== "all") {
        eventCollection = query(eventCollection, where("event_status", "==", filter));
      }

      const eventSnapshot = await getDocs(eventCollection);
      const eventList = eventSnapshot.docs.map((doc) => {
        const data = doc.data();
        // Convert Firestore Timestamps to JavaScript Date objects
        const formattedEvent = {
          id: doc.id,
          ...data,
          event_date: data.event_date ? data.event_date.toDate() : null,
          deadline: data.deadline ? data.deadline.toDate() : null,
        };
        return formattedEvent;
      });
      setEvents(eventList);
    };

    fetchEvents();
  }, [filter,handleUpdateStatus]);

  const handleDeleteEvent = async (eventId) => {
    const eventDoc = doc(db, "events", eventId);
    await deleteDoc(eventDoc);
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-4xl font-semibold mb-8 text-center">Events</h2>
      
      <div className="mb-4">
        <select
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:border-gray-400"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Events</option>
          <option value="pending">Pending Events</option>
          <option value="accepted">Accepted Events</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src={event.event_img} alt={event.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex-grow">
              <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-2">{event.short_description}</p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Location:</span> {event.event_location}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Hosted by:</span> {event.hosted_by}
              </p>
              {event.event_date && (
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Date:</span> {format(event.event_date, "MMMM dd, yyyy h:mm a")}
                </p>
              )}
              {event.deadline && (
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Deadline:</span> {format(event.deadline, "MMMM dd, yyyy h:mm a")}
                </p>
              )}
              <p className="text-gray-600 mb-4">{event.details}</p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Contact:</span> {event.contact}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Status:</span> {event.event_status}
              </p>
            </div>
            <div className="p-4 mt-auto flex justify-end">
              {event.event_status === "pending" && (
                <button
                  onClick={() => handleUpdateStatus(event.id, event.event_status)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Accept
                </button>
              )}
              {event.event_status === "accepted" && (
                <button
                  onClick={() => handleUpdateStatus(event.id, event.event_status)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Make Pending
                </button>
              )}
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
