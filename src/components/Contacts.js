import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactCollection = collection(db, "contactForms");
      const contactSnapshot = await getDocs(contactCollection);
      const contactList = contactSnapshot.docs.map((doc) => doc.data());
      setContacts(contactList);
    };

    fetchContacts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Contacts</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="w-1/3 py-2 px-4 bg-gray-200 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="w-1/3 py-2 px-4 bg-gray-200 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Subject
            </th>
            <th className="w-1/3 py-2 px-4 bg-gray-200 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Message
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-200">{contact.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">{contact.subject}</td>
              <td className="py-2 px-4 border-b border-gray-200">{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Contacts;
