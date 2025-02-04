"use client";

import HeaderLabel from "@/components/shared/HeaderLabel";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Autoplay } from "swiper/modules";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
interface Testimonial {
  name: string;
  title: string;
  image: string;
  feedback: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Frank Adams",
    title: "CEO of Tech Solutions Inc.",
    image: "https://i.pravatar.cc/150?img=1", // Replace with actual image URL
    feedback:
      "CASHDIME is reliable and offers robust features that meet all our accounting needs.",
  },
  {
    name: "Emily Johnson",
    title: "Freelance Designer",
    image: "https://i.pravatar.cc/150?img=2", // Replace with actual image URL
    feedback:
      "With CASHDIME, tracking expenses and generating reports has never been easier.",
  },
  {
    name: "Linda Rodriguez",
    title: "Senior Accountant",
    image: "https://i.pravatar.cc/150?img=3", // Replace with actual image URL
    feedback:
      "Managing my finances used to be a hassle, but CASHDIME has made it much easier.",
  },
];

const Testimonials = () => {
  let settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
    className: "ratings-wrapper",
    // ref: sliderRef,
  };
  return (
    <section className="section-side-gap py-">
      <div className={"flex items-center justify-center "}>
        <HeaderLabel
          text={"Testimonials"}
          className={"w-[178px] text-[14px] font-clash"}
        />
      </div>

      <div className={"text-center px-4 md:px-0  text-[28px] py-5 space-y-3"}>
        <h1 className="md:text-[48px] text-[28px] font-clashSemiBold">
          What our customers are saying
        </h1>
        <p
          className={
            "md:text-[24px] text-[16px] text-cdneutral-black font-clash"
          }
        >
          Know what our customers have been saying about our services
        </p>
      </div>

      <div className="py-10 relative overflow-hidden">
        <Slider {...settings}>
          {testimonials?.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-5 shadow-xl relative w-[397px] rounded-2xl"
            >
              <div>
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>

              <div className="py-5 space-y-3">
                <h3 className="font-clashSemiBold text-[24px]">
                  {testimonial.name}
                </h3>
                <p className="text-cdneutral-darkGray text-[20px] font-clashMedium">
                  {testimonial.title}
                </p>
                <p className="text-[16px] text-cdneutral-black font-clash">
                  {testimonial.feedback}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
