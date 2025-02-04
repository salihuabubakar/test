'use client';

import React, { useState } from 'react';
import CustomButton from '@/components/shared/CustomButton';
import AddMemberModal from '@/components/Settings/modal/add-member-modal';
import TopBar from '@/components/Dashboard/TopBar';
import { settingsIcon } from '@/assets';
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@company.com',
    role: 'Developer',
    status: 'Inactive',
  },
  {
    id: '3',
    name: 'Jessica Williams',
    email: 'j.williams@company.com',
    role: 'Designer',
    status: 'Active',
  },
];

const TeamsTab = () => {
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);
  return (
    <>
      <TopBar title="Team Settings" logo={settingsIcon} />
      <div className="flex">
        <main className="flex-1 h-screen p-2 px-6 dark:text-cdneutral-white dark:bg-[#09090b]">
          <h3 className="text-xl font-clashSemiBold mb-4">Teams</h3>
          {/* Add User */}
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-clashMedium">Team Member</h4>
            <CustomButton
              onClick={() => setOpenAddMemberModal(true)}
              className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 
              text-white font-semibold px-6 py-3 rounded-2xl 
              md:w-[120px] md:py-4 md:pr-6 shadow-md"
            >
              Add User
            </CustomButton>
          </div>
          <div className="rounded-lg overflow-hidden">
            <table className="table-auto w-full hidden md:table">
              <thead className="border-b text-left">
                <tr>
                  <th className="p-4 font-clash text-cdneutral-black dark:text-cdneutral-white">
                    Name
                  </th>
                  <th className="p-4 font-clash text-cdneutral-black dark:text-cdneutral-white">
                    Email Address
                  </th>
                  <th className="p-4 font-clash text-cdneutral-black dark:text-cdneutral-white">
                    Role
                  </th>
                  <th className="p-4 font-clash text-cdneutral-black dark:text-cdneutral-white">
                    Status
                  </th>
                  <th className="p-4 font-clash text-cdneutral-black dark:text-cdneutral-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted-foreground">
                      No team members found
                    </td>
                  </tr>
                ) : (
                  teamMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="p-4">{member.name}</td>
                      <td className="p-4">{member.email}</td>
                      <td className="p-4">{member.role}</td>
                      <td className="p-4">{member.status}</td>
                      <td className="p-4">{/* Add action buttons here */}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* Mobile View */}
            <div className="flex flex-col gap-4 md:hidden">
              {teamMembers.length === 0 ? (
                <div className="rounded-lg p-4 text-muted-foreground">No team members found</div>
              ) : (
                teamMembers.map((member) => (
                  <div key={member.id} className="rounded-lg p-4">
                    <div className="flex justify-between border-b pb-2 mb-2">
                      <span className="font-clash text-dneutral-black">Name</span>
                      <span className="font-clash text-dneutral-black">{member.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 mb-2">
                      <span className="font-clash text-dneutral-black">Email Address</span>
                      <span className="font-clash text-dneutral-black">{member.email}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 mb-2">
                      <span className="font-clash text-dneutral-black">Role</span>
                      <span className="font-clash text-dneutral-black">{member.role}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 mb-2">
                      <span className="font-clash text-dneutral-black">Status</span>
                      <span className="font-clash text-dneutral-black">{member.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-clash text-dneutral-black">Action</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>

        <AddMemberModal isOpen={openAddMemberModal} onClose={() => setOpenAddMemberModal(false)} />
      </div>
    </>
  );
};

export default TeamsTab;
