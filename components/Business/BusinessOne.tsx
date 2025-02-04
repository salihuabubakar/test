import React, { forwardRef } from 'react';
import Image from 'next/image';
import { Logoipsum, subway, phone, mail } from '@/assets';
import { InvoiceData } from '@/types/invoiceData';

const BusinessOne = forwardRef<HTMLDivElement, InvoiceData>(
  (
    {
      invoiceNumber,
      dueDate,
      fromCompany,
      fromEmail,
      toCompany,
      toAddress,
      toEmail,
      items,
      logo,
      headingColor,
      logoWidth,
    },
    ref
  ) => {
    const calculateSubtotal = () => {
      return items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice * (1 - item.discount / 100),
        0
      );
    };

    const subtotal = calculateSubtotal();
    const vat = subtotal * 0.1;
    const total = subtotal + vat;

    const cdtomato = '#932020';
    return (
      <div
        ref={ref}
        className="w-full max-w-xl mx-auto bg-white border border-gray-300 shadow-lg font-clash h-fit"
      >
        <header className="flex justify-center items-center mb-8">
          <div className="self-end sm:self-auto mt-2">
            {logo ? (
              <Image
                src={logo}
                alt={`${fromCompany} Logo`}
                width={logoWidth || 80}
                height={80}
                className="max-w-full max-h-full object-contain rounded"
              />
            ) : (
              <div className="w-20 h-20 bg-transparent rounded-lg flex items-center justify-center">
                <Image
                  src={Logoipsum}
                  alt="Logo"
                  width={80}
                  height={80}
                  className="max-w-full max-h-full object-contain rounded"
                />
              </div>
            )}
          </div>
        </header>
        <div className="flex flex-row justify-between text-cdneutral-black gap-6 mb-8 px-4">
          <div>
            <h2 className="text-xs font-clashLight font-medium mb-2">INVOICE TO:</h2>
            <div className="font-clashMedium space-y-1 text-xs">
              <p>{toCompany}</p>
              <p className="whitespace-pre-line">{toAddress}</p>
            </div>
          </div>
          <div className="text-left sm:text-right relative">
            <div className="relative z-10">
              <h2 className="text-xs font-clashLight font-medium mb-2">
                INVOICE NO: {invoiceNumber}
              </h2>
              <div className="font-clash flex flex-col sm:flex-row gap-2 sm:items-end font-clashMedium space-y-1 text-xs">
                <div>
                  <p>DATE:</p>
                  <p>DUE DATE:</p>
                </div>
                <div>
                  <p>11-10-2024</p>
                  <p>{dueDate}</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-[-30px] right-[-16px] z-0">
              <svg
                width="200"
                height="219"
                viewBox="0 0 270 319"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M365 131C365 223.34 288.218 299 192.5 299C96.7823 299 20 223.34 20 131C20 38.6595 96.7823 -37 192.5 -37C288.218 -37 365 38.6595 365 131Z"
                  stroke="url(#paint0_linear_3047_5178)"
                  stroke-width="40"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_3047_5178"
                    x1="-3.77378"
                    y1="50.2084"
                    x2="288.338"
                    y2="304.109"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.204425" stop-color="white" stop-opacity="0" />
                    <stop offset="1" stop-color={`${headingColor || cdtomato}`} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto mb-8 scrollbar-thumb-white scrollbar-thin scrollbar-track-white">
          <table className="w-fit min-w-[550px] mx-auto text-left border-collapse text-xs">
            <thead>
              <tr style={{ backgroundColor: headingColor || cdtomato }} className="text-white [&>th:first-child]:rounded-l-full [&>th:last-child]:rounded-r-full">
                <th className="p-3 text-xs">Item Description</th>
                <th className="p-3 text-xs text-center">Quantity</th>
                <th className="p-3 text-xs text-center">Unit Price</th>
                <th className="p-3 text-xs text-center">Discount</th>
                <th className="p-3 text-xs text-center">Amount</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {items.map((item, index) => (
                <tr key={index} className="text-black">
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4 text-center">{item.quantity}</td>
                  <td className="py-3 px-4 text-center">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-2 px-4 text-center">{item.discount}%</td>
                  <td className="py-3 px-4 text-center">
                    ${(item.quantity * item.unitPrice * (1 - item.discount / 100)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between font-clashSemiBold gap-6 mb-8 px-4">
          <div className="sm:w-1/2">
            <h4 className="mb-2 text-sm">NOTES:</h4>
            <p className="text-xs font-clashLight">
              We prioritize customer satisfaction. Our team of passionate skiers and snowboarders is
              dedicated to delivering exceptional service and ensuring your safety and enjoyment on
              the slopes
            </p>
          </div>
          <div className="flex justify-between sm:w-1/2 text-xs">
            <div className="space-y-4">
              <p>SUBTOTAL:</p>
              <p>VAT(10%):</p>
              <p>GRAND TOTAL:</p>
            </div>
            <div className="text-right space-y-4">
              <p>${subtotal.toFixed(2)}</p>
              <p>${vat.toFixed(2)}</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div
          style={{ backgroundColor: headingColor || cdtomato }}
          className="w-full py-4 px-2 sm:px-4 text-xs"
        >
          <div
            style={{ backgroundColor: headingColor || '#4A0202' }}
            className="flex justify-between items-center p-2 text-[#FAFAFA] rounded-full text-xs font-clashLight gap-1"
          >
            <div className="flex items-center gap-2">
              <Image src={subway} alt="subway world" width={15} height={15} />
              <p>www.logoipsum.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Image src={phone} alt="phone icon" width={15} height={15} />
              <p>123-456-7890</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Image src={mail} alt="mail icon" width={15} height={15} />
              <p>{toEmail}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default BusinessOne;
