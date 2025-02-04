import React, { forwardRef } from 'react';
import Image from 'next/image';
import { Logoipsum } from '@/assets';
import { InvoiceData } from '@/types/invoiceData';
import { Satisfy } from 'next/font/google';

const satisfy = Satisfy({ subsets: ['latin'], weight: '400' });

const InvoiceOne = forwardRef<HTMLDivElement, InvoiceData>(
  (
    {
      invoiceNumber,
      dueDate,
      fromCompany,
      fromEmail,
      fromAddress,
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
      return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    };

    const subtotal = calculateSubtotal();
    const vat = subtotal * 0.1;
    const total = subtotal + vat;

    const cdsuccess300 = '#399320';

    return (
      <div
        ref={ref}
        className="w-full max-w-xl mx-auto bg-white border border-gray-300 shadow-lg font-clash h-fit"
      >
        <div className="flex justify-end">
          <svg
            width="200"
            height="32"
            viewBox="0 0 304 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M304 0H0L46 45.5H304V0Z" fill={`${headingColor || cdsuccess300}`} />
          </svg>
        </div>

        <header className="flex flex-row justify-between items-start gap-4 mb-8 px-4">
          <div>
            <h1 className="text-sm font-clashSemiBold tracking-wide text-dneutral-black">
              INVOICE
            </h1>
            <p className="text-xs text-cdneutral-black">No: {invoiceNumber}</p>
            <p
              style={{ borderBottom: `3px solid ${headingColor || cdsuccess300}` }}
              className="text-xs text-cdneutral-black font-clashMedium"
            >
              DUE: {dueDate}
            </p>
          </div>
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

        <div className="flex flex-row justify-between gap-6 text-cdneutral-black mb-8 px-4">
          <div>
            <h2 className="text-xs font-clashLight font-medium mb-2">INVOICE TO:</h2>
            <div className="font-clashMedium space-y-1 text-xs">
              <p>{toCompany}</p>
              <p className="whitespace-pre-line">{toAddress}</p>
            </div>
          </div>
          <div>
            <h2 className="text-xs font-clashLight font-medium mb-2">COMPANY:</h2>
            <div className="font-clashMedium space-y-1 text-xs">
              <p>{fromCompany}</p>
              <p className="whitespace-pre-line">{fromAddress}</p>
              <p>{fromEmail}</p>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto scrollbar-thumb-white scrollbar-thin scrollbar-track-white">
          <table className="w-fit min-w-[550px] mx-auto text-left border-collapse border-b-2 text-xs">
            <thead>
              <tr style={{ backgroundColor: headingColor || cdsuccess300 }} className="text-white">
                <th className="p-3 text-xs">Item Description</th>
                <th className="p-3 text-xs text-center">Quantity</th>
                <th className="p-3 text-xs text-center">Unit Price</th>
                <th className="p-3 text-xs text-center">Amount</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {items.map((item, index) => (
                <tr key={index} className="">
                  <td className="py-2 px-4">{item.description}</td>
                  <td className="py-2 px-4 text-center">{item.quantity}</td>
                  <td className="py-2 px-4 text-center">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-2 px-4 text-center">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col p-3 gap-2 font-clashMedium text-xs px-4">
          <div className="space-x-4  flex justify-end">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="space-x-4 flex justify-end">
            <span>VAT(10%):</span>
            <span>${vat.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 px-4">
          <div
            style={{ backgroundColor: headingColor || cdsuccess300 }}
            className="flex text-sm justify-between  px-4 py-2 font-clashMedium text-white w-full sm:w-auto sm:min-w-[300px]"
          >
            <p>TOTAL :</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>

        <p
          className={`text-cdneutral-black font-bold mt-6 sm:mt-10 font-cash text-left text-sm sm:text-base p-4 ${satisfy.className}`}
        >
          Thank you for your Patronage
        </p>

        <div className="flex justify-start mt-2">
          <svg
            width="200"
            height="32"
            viewBox="0 0 304 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 46H304L258 0.5H0V46Z" fill={`${headingColor || cdsuccess300}`} />
          </svg>
        </div>
      </div>
    );
  }
);

export default InvoiceOne;
