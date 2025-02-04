import React from "react";
import CardItem from "../shared/CardItem";
import totalincome from "@/assets/images/total-income.svg";
import paid from "@/assets/images/paid.svg";
import pending from "@/assets/images/pending.svg";
import overdue from "@/assets/images/overdue.svg";
import Image from "next/image";

const Cards = () => {
  const cardData = [
    {
      title: "TOTAL INCOME",
      amount: "N256,000.00",
      description: "Income as of Today",
      icon: <Image src={totalincome} alt="total income icon" />,
      bgColor: "bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100",
      textColor: "text-white",
      progressColor: "bg-cdsuccess-200",
      progress: "100/100",
    },
    {
      title: "PAID",
      amount: "N200,000.00",
      description: "Income as of Today",
      icon: <Image src={paid} alt="paid icon" />,
      bgColor: "bg-cdneutral-white",
      textColor: "text-cdneutral-black",
      progressColor: "bg-cdsuccess-300",
      progress: "50/100",
    },
    {
      title: "PENDING",
      amount: "N36,000.00",
      description: "Income as of Today",
      icon: <Image src={pending} alt="pending icon" />,
      bgColor: "bg-cdneutral-white",
      textColor: "text-cdneutral-black",
      progressColor: "bg-[#FF5555]",
      progress: "30/100",
    },
    {
      title: "OVERDUE",
      amount: "N20,000.00",
      description: "Income as of Today",
      icon: <Image src={overdue} alt="overdue icon" />,
      bgColor: "bg-cdneutral-white",
      textColor: "text-cdneutral-black",
      progressColor: "bg-red-500",
      progress: "20/100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 font-clashMedium">
      {cardData.map((card, index) => (
        <CardItem
          key={index}
          title={card.title}
          amount={card.amount}
          description={card.description}
          icon={card.icon}
          bgColor={card.bgColor}
          textColor={card.textColor}
          progressColor={card.progressColor}
          progress={card.progress}
        />
      ))}
    </div>
  );
};

export default Cards;
