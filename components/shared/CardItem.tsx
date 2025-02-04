import React, { ReactNode } from "react";
import Image from "next/image";

interface CardItemProps {
  title: string;
  amount: string;
  description: string;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
  progressColor: string;
  progress: string;
}

const CardItem: React.FC<CardItemProps> = ({
  title,
  amount,
  description,
  icon,
  bgColor,
  textColor,
  progressColor,
  progress,
}) => {
  return (
    <div className={`p-6 dark:bg-transparent dark:border rounded-2xl ${bgColor} flex flex-col space-y-4`}>
      <div className="flex items-center space-x-2">
        {icon}
        <div className={`text-sm ${textColor} flex flex-col`}>
          <span className="font-clashSemiBold dark:text-white">{title}</span>
          <div className="text-cdneutral-darkGray font-clashLight">
            {description}
          </div>
        </div>
      </div>
      <div className={`text-2xl font-extrabold dark:text-white ${textColor}`}>{amount}</div>
      <div className={`mt-2 text-xs text-cdneutral-darkGray ${textColor}`}>
        Number of invoices: {progress}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${progressColor}`}
          style={{ width: progress.split("/")[0] + "%" }}
        ></div>
      </div>
    </div>
  );
};

export default CardItem;
