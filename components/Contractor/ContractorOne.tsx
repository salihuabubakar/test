import React, { forwardRef } from 'react';
import Image from 'next/image';
import { world, tel, email, sign } from '@/assets';
import { InvoiceData } from '@/types/invoiceData';

const ContractorOne = forwardRef<HTMLDivElement, InvoiceData>(
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
        <header className="relative overflow-hidden mb-10">
          <div
            className="absolute w-[300px] h-[280px] rounded-full -z-9 -top-40 -left-20"
            style={{ backgroundColor: headingColor || '#2EE59D' }}
          />
          <div className="p-6 relative">
            <h1 className="text-4xl font-bold text-black mb-1">
              INVOICE
            </h1>
            <p className="text-lg text-neutral-700">
              {fromCompany || 'Logpipsum Contractor'}
            </p>
          </div>
        </header>

        <div className="flex flex-row justify-between text-cdneutral-black gap-6 mb-8 px-4">
          <div>
            <h2 className="text-xs font-clashLight font-medium mb-2">ISSUED TO:</h2>
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
                  borderTop: `2px solid ${headingColor || '#2EE59D'}`,
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
                  className="border-[#2EE59D]/30 border-b"
                  style={{
                    borderTop: index === 0 ? `2px solid ${headingColor || '#2EE59D'}` : '',
                    borderBottom:
                      index == items.length - 1 ? `2px solid ${headingColor || '#2EE59D'}` : '',
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
              className="flex flex-row justify-end gap-4 sm:gap-20 p-2"
              style={{
                borderTop: `2px solid ${headingColor || '#2EE59D'}`,
                borderBottom: `2px solid ${headingColor || '#2EE59D'}`,
              }}
            >
              <div className="space-y-2 text-sm">
                <p>SUBTOTAL:</p>
                <p>VAT(10%):</p>
              </div>
              <div className="text-right space-y-2">
                <p>${subtotal.toFixed(2)}</p>
                <p>${vat.toFixed(2)}</p>
              </div>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mb-8 px-4">
          <div className="space-y-2 font-clashMedium mb-4 sm:mb-0">
            <div className="flex items-center gap-2">
              <Image src={world} alt="website" width={20} height={20} />
              <p className="text-xs">logoipsum.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Image src={tel} alt="phone" width={20} height={20} />
              <p className="text-xs">123-456-7890</p>
            </div>
            <div className="flex items-center gap-2">
              <Image src={email} alt="email" width={20} height={20} />
              <p className="text-xs">{toEmail}</p>
            </div>
          </div>
          <div className="flex text-sm justify-end pr-4 font-clashMedium text-cdneutral-black gap-5">
            <div
              className="flex gap-5 p-2"
            >
              <p>GRAND TOTAL:</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <p>Thank you for your patronage</p>
        </div>
        <div
          style={{ backgroundColor: headingColor || '#2EE59D' }}
          className="w-full p-[20px] mt-3"
        />
      </div>
    );
  }
);

export default ContractorOne;
