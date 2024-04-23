'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Bounce, toast } from 'react-toastify';

const BackendUrl = "https://recruitments-portal-backend.vercel.app";

interface GDData {
  domain: string;
  teamName: string;
  date: string;
  time: string;
  meetLink: string;
  teamMembers: string[];
  supervisors: string[];
}

const GroupDiscussionPage: React.FC = () => {
  const [eventsGDList, setEventsGDList] = useState<GDData[]>([]);
  const [pnmGDList, setPnmGDList] = useState<GDData[]>([]);
  const [domain, setDomain] = useState<'events' | 'pnm'>('events');
  const [showCreateGD, setShowCreateGD] = useState<boolean>(false);
  const [newGDData, setNewGDData] = useState<GDData>({
    domain: domain,
    teamName: '',
    date: '24 April 2026',
    time: '10PM - 11PM',
    meetLink: 'To be Updated!',
    teamMembers: [],
    supervisors: [],
  });

  useEffect(() => {
    fetchGDList("events");
    fetchGDList("pnm");
  }, []);

  const fetchGDList = async (domain: 'events' | 'pnm') => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminaccessToken"))
        ?.split("=")[1];
      const response = await axios.get<GDData[]>(`${BackendUrl}/admin/get-gd/${domain}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (domain === 'events') {
        setEventsGDList(response.data);
      } else if (domain === 'pnm') {
        setPnmGDList(response.data);
      }
    } catch (error) {
      console.error('Error fetching GD list:', error);
    }
  };

  const handleDomainChange = (selectedDomain: 'events' | 'pnm') => {
    setDomain(selectedDomain);
    setNewGDData({ ...newGDData, domain: selectedDomain });
  };

  const handleCreateGD = async () => {
    try {
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('adminaccessToken'))
        ?.split('=')[1];

      const response = await axios.put(`${BackendUrl}/admin/create-gd`, newGDData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("GD Created Succesfully", {
        position: 'bottom-center',
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: 'dark',
             transition: Bounce,
           });
      setShowCreateGD(false);
      fetchGDList(domain);
    } catch (error) {
      console.error('Error creating GD:', error);
       toast.error("A team with GD already Exist", {
   position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
      
    }
  };

  const currentGDList = domain === 'events' ? eventsGDList : pnmGDList;

  return (
    <div className="flex justify-center items-center h-screen">
      <Link
        href="/admin/dashboard"
        className="absolute left-2 top-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </Link>
      <div className="flex">
        <div className="bg-white p-8 rounded-md mr-4">
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleDomainChange('events')}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${domain === 'events' ? 'bg-blue-700' : ''
                }`}
            >
              Events
            </button>
            <button
              onClick={() => setShowCreateGD(true)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create GD
            </button>
          </div>
          <h2 className="text-xl font-bold mb-4">Group Discussions</h2>
          <ul className="list-disc list-inside">
            {eventsGDList.map((gd, index) => (
              <li key={index} className="mb-2">
                {gd.teamName}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-8 rounded-md">
          <div className="flex justify-between mb-4">
            <button
              onClick={() => handleDomainChange('pnm')}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${domain === 'pnm' ? 'bg-blue-700' : ''
                }`}
            >
              PNM
            </button>
            <button
              onClick={() => setShowCreateGD(true)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create GD
            </button>
          </div>
          <h2 className="text-xl font-bold mb-4">Group Discussions</h2>
          <ul className="list-disc list-inside">
            {pnmGDList.map((gd, index) => (
              <li key={index} className="mb-2">
                {gd.teamName}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`fixed inset-0 flex items-center justify-center ${showCreateGD ? 'visible' : 'invisible'}`}>
        <div className="bg-white p-8 rounded-md">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Create New GD for {domain}</h2>
            <button
              onClick={() => setShowCreateGD(false)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              X
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="teamName" className="block font-semibold mb-1">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              value={newGDData.teamName}
              onChange={(e) =>
                setNewGDData({ ...newGDData, teamName: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block font-semibold mb-1">
              Date
            </label>
            <input
              type="text"
              id="date"
              value={newGDData.date}
              onChange={(e) =>
                setNewGDData({ ...newGDData, date: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block font-semibold mb-1">
              Time
            </label>
            <input
              type="text"
              id="time"
              value={newGDData.time}
              onChange={(e) =>
                setNewGDData({ ...newGDData, time: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="meetLink" className="block font-semibold mb-1">
              Meet Link
            </label>
            <input
              type="text"
              id="meetLink"
              value={newGDData.meetLink}
              onChange={(e) =>
                setNewGDData({ ...newGDData, meetLink: e.target.value })
              }
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="teamMembers" className="block font-semibold mb-1">
              Team Members (Copy Paste from Excel)
            </label>
            <input
              type="text"
              id="teamMembers"
              value={newGDData.teamMembers.join(', ')}
              onChange={(e) =>
                setNewGDData({
                  ...newGDData,
                  teamMembers: e.target.value.split(',').map((email) => email.trim()),
                })
              }
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="supervisors" className="block font-semibold mb-1">
              Supervisors (Copy Paste from Excel)
            </label>
            <input
              type="text"
              id="supervisors"
              value={newGDData.supervisors.join(' ')}
              onChange={(e) =>
                setNewGDData({
                  ...newGDData,
                  supervisors: e.target.value.split(' ').map((email) => email.trim()),
                })
              }
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <button
            onClick={handleCreateGD}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Create GD
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDiscussionPage;