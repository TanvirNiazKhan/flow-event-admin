import React from "react";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white flex flex-col">
        <div className="px-6 py-4 text-2xl font-bold">Dashboard</div>
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="events"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Event Approval
              </Link>
            </li>
            <li>
              <Link
                to="contacts"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Contacts
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
