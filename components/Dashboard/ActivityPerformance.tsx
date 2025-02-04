import React from "react";
import Image from "next/image";
import active from "@/assets/images/active.svg";

const ActivityPerformance = () => {
  const activities = [
    {
      label: "Today's invoice issued",
      amount: "N20,000.00",
      invoices: "20 invoices",
      icon: <Image src={active} alt="active icon" />,
    },
    {
      label: "This week's invoice issued",
      amount: "N0.00",
      invoices: "0 invoices",
      icon: <Image src={active} alt="active icon" />,
    },
    {
      label: "This month's invoice issued",
      amount: "N20,000.00",
      invoices: "20 invoices",
      icon: <Image src={active} alt="active icon" />,
    },
    {
      label: "This year's invoice issued",
      amount: "N1,200,000.00",
      invoices: "100 invoices",
      icon: <Image src={active} alt="active icon" />,
    },
  ];

  return (
    <div className="bg-cdneutral-white dark:bg-transparent dark:border  p-6 rounded-2xl shadow-sm font-clash">
      <h3 className="font-clashSemiBold text-cdneutral-black dark:text-cdneutral-white mb-2">
        Activity Performance
      </h3>
      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <li key={index} className="flex justify-between items-center">
            <div className=" flex items-center gap-2 text-cdneutral-black dark:text-cdneutral-white font-medium">
              {activity.icon}
              <div className="flex flex-col py-4 font-clash">
                {activity.label}
                <div className="font-clashMedium">{activity.invoices}</div>
              </div>
            </div>
            <div className="text-cdsuccess-300 font-bold">
              {activity.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityPerformance;
