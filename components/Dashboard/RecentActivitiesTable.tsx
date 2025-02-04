import React from "react";
import Image from "next/image";
import NoDataRecord from "../NoData/noDataRecord";

const RecentActivitiesTable = () => {
  const activities = [
    {
      invoice: "INV-001",
      client: "Robert Fox",
      email: "robertfox18@gmail.com",
      startDate: "Sept 10, 2024",
      dueDate: "Sept 15, 2024",
      amount: "N20,000",
      status: "Paid",
      action: ". . .",
    },
    {
      invoice: "INV-001",
      client: "Robert Fox",
      email: "robertfox18@gmail.com",
      startDate: "Sept 11, 2024",
      dueDate: "Sept 16, 2024",
      amount: "N20,000",
      status: "Paid",
      action: ". . .",
    },
    {
      invoice: "INV-001",
      client: "Robert Fox",
      email: "robertfox18@gmail.com",
      startDate: "Sept 12, 2024",
      dueDate: "Sept 17, 2024",
      amount: "N20,000",
      status: "Unpaid",
      action: ". . .",
    },
    {
      invoice: "INV-001",
      client: "Robert Fox",
      email: "robertfox18@gmail.com",
      startDate: "Sept 13, 2024",
      dueDate: "Sept 18, 2024",
      amount: "N20,000",
      status: "Paid",
      action: ". . .",
    },
    {
      invoice: "INV-001",
      client: "Robert Fox",
      email: "robertfox18@gmail.com",
      startDate: "Sept 14, 2024",
      dueDate: "Sept 19, 2024",
      amount: "N20,000",
      status: "Overdue",
      action: ". . .",
    },
  ];

  return (
    <div className="bg-cdneutral-white dark:bg-transparent dark:border p-6 rounded-lg shadow-md my-6 overflow-auto font-clash">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-clashSemiBold md:text-xl text-cdneutral-black dark:text-cdneutral-white">
          Recent Activities
        </h3>
        <select className="border border-[#CCCCCC] rounded-md p-2 text-cdneutral-darkGray bg-transparent outline-none">
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-60-days">Last 60 Days</option>
          <option value="last-90-days">Last 90 Days</option>
          <option value="last-120-days">Last 120 Days</option>
        </select>
      </div>
      {activities.length !== 0 ? (
        <>
          <table className="w-full hidden md:table text-left">
            <thead>
              <tr className="text-cdneutral-black dark:text-cdneutral-white border-b font-clashMedium mb-4">
                <th>Invoice</th>
                <th>Client</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>Invoice Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index} className="text-cdneutral-black dark:text-cdneutral-white font-normal">
                  <td>{activity.invoice}</td>
                  <td>{activity.client}</td>
                  <td>{activity.email}</td>
                  <td>{activity.startDate}</td>
                  <td>{activity.dueDate}</td>
                  <td>{activity.amount}</td>
                  <td
                    className={`font-clashMedium p-2 ${
                      activity.status === "Paid"
                        ? "text-cdsuccess-300"
                        : activity.status === "Unpaid"
                        ? "text-[#FF5555]"
                        : "text-[#FF5555]"
                    }`}
                  >
                    {activity.status}
                  </td>
                  <td className="font-clashMedium p-2">{activity.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ): (
        <NoDataRecord />
      )}

      <div className="md:hidden">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-3  border-gray-200 py-2 text-cdneutral-black dark:text-cdneutral-white"
          >
            <div className="font-medium ">{activity.invoice}</div>

            <div className="flex flex-col">
              <span className="font-medium">{activity.client}</span>
              {activity.client === "Robert Fox" && (
                <span className="font-bold text-cdneutral-darkGray">
                  {activity.amount.replace("N", "")}
                </span>
              )}
            </div>

            <div
              className={`font-clashMedium ${
                activity.status === "Paid"
                  ? "text-cdsuccess-300"
                  : activity.status === "Unpaid"
                  ? "text-[#FF5555]"
                  : "text-[#FF5555]"
              }`}
            >
              {activity.status}
            </div>

            <div className="font-clashMedium">{activity.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivitiesTable;
