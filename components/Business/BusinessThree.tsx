import React, { forwardRef } from 'react';
import Image from 'next/image';
import { sign } from '@/assets';
import { InvoiceData } from '@/types/invoiceData';

const BusinessThree = forwardRef<HTMLDivElement, InvoiceData>(
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
    },
    ref
  ) => {
    const calculateSubtotal = () => {
      return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    };

    const subtotal = calculateSubtotal();
    const vat = subtotal * 0.1;
    const total = subtotal + vat;

    return (
      <div
        ref={ref}
        className="w-full max-w-xl mx-auto bg-[#f4f4f4] border border-gray-300 shadow-lg h-fit font-clash"
      >
        <header className="flex flex-row justify-between items-center gap-6 mb-8 py-4">
          <div
            style={{ backgroundColor: headingColor || '#F7DD4A' }}
            className="p-4 w-full sm:w-auto"
          >
            <h1 className="text-sm font-clashSemiBold tracking-wide text-dneutral-black">
              {fromCompany}
            </h1>
            <p className="whitespace-pre-line">{fromAddress}</p>
            <p className="text-xs">123-456-7890</p>
          </div>
          <div className="text-sm font-clashSemiBold px-4">
            <h2>INVOICE</h2>
          </div>
        </header>
        <div className="flex flex-row justify-between text-cdneutral-black gap-6 mb-8 px-4">
          <div>
            <h2 className="text-xs font-clashLight font-medium mb-2">BILL TO:</h2>
            <div className="font-clashMedium text-xs">
              <p>{toCompany}</p>
              <p className="whitespace-pre-line">{toAddress}</p>
            </div>
          </div>
          <div className="font-clash flex gap-4 text-sm">
            <div>
              <p className="text-xs font-clashLight font-medium mb-2">Invoice Number:</p>
              <p className="font-clashMedium space-y-1 text-xs">DATE:</p>
              <p className="font-clashMedium space-y-1 text-xs">DUE DATE:</p>
            </div>
            <div className="text-right ">
              <p className="text-xs font-clashLight font-medium mb-2">{invoiceNumber}</p>
              <p className="font-clashMedium space-y-1 text-xs">11-10-2024</p>
              <p className="font-clashMedium space-y-1 text-xs">{dueDate}</p>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto mb-8 scrollbar-thumb-white scrollbar-thin scrollbar-track-white">
          <table className="w-fit min-w-[550px] mx-auto text-left border-collapse text-xs">
            <thead>
              <tr
                style={{
                  borderTop: `2px solid ${headingColor || '#000'}`,
                }}
                className="text-black"
              >
                <th className="p-3 text-xs">Item Description</th>
                <th className="p-3 text-xs text-center">Price</th>
                <th className="p-3 text-xs text-center">Quantity</th>
                <th className="p-3 text-xs text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderTop: index === 0 ? `2px solid ${headingColor || '#000'}` : '',
                    borderBottom:
                      index == items.length - 1 ? `2px solid ${headingColor || '#000'}` : '',
                  }}
                >
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

        <div className="flex justify-end mb-6 px-4 font-clashMedium text-xs">
          <div
            className="flex flex-row justify-end gap-4 sm:gap-20p-2"
            style={{
              borderBottom: `2px solid ${headingColor || '#000'}`,
            }}
          >
            <div className="space-y-2 text-sm">
              <p>SUBTOTAL:</p>
              <p>VAT(10%):</p>
              <p>Discount</p>
            </div>
            <div className="text-right space-y-2">
              <p>${subtotal.toFixed(2)}</p>
              <p>${vat.toFixed(2)}</p>
              <p className="text-center">-</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-8">
          <div className="flex text-sm justify-end pr-4 font-clashMedium text-cdneutral-black gap-5">
            <div
              className="flex gap-5"
              style={{
                borderBottom: `2px solid ${headingColor || '#000'}`,
              }}
            >
              <p>GRAND TOTAL:</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8 px-4">
          <div>
            <h3 className="font-clashMedium mb-2">Terms and Conditions</h3>
            <p className="text-xs max-w-[390px]">
              Please send payment before due date. There will be 10% interest charge per month on
              late invoice
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={sign} alt="signature" width={100} height={50} />
            <h3 className="font-clashSemiBold text-xs">Paul Smith</h3>
            <p className="font-clashMedium text-xs">Manager</p>
          </div>
        </div>
        <div
          style={{ backgroundColor: headingColor || '#F7DD4A' }}
          className="w-full p-[20px] mt-3"
        ></div>
      </div>
    );
  }
);

export default BusinessThree;
