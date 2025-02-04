import React, { forwardRef } from 'react';
import Image from 'next/image';

import { Logoipsum, invoice, invoicetop, invoicebuttom } from '@/assets';
import { InvoiceData } from '@/types/invoiceData';

const CommercialOne = forwardRef<HTMLDivElement, InvoiceData>(
  (
    {
      invoiceNumber,
      dueDate,
      fromCompany,
      fromEmail,
      fromAddress,
      toCompany,
      toAddress,
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

    const cdneutral = '#F5F3EF';

    console.log({
      invoiceNumber,
      dueDate,
      fromCompany,
      fromEmail,
      fromAddress,
      toCompany,
      toAddress,
      items,
      logo,
      headingColor,
      logoWidth,
    });

    return (
      <div
        ref={ref}
        className="w-full max-w-xl mx-auto bg-white border border-gray-300 shadow-lg font-clash h-fit"
      >
        <div 
          className=' text-[#F5E6FE]'
          style={{ backgroundColor: headingColor || '#F5E6FE' }}
        >.
        </div>
        <header className="flex flex-row items-start gap-4 px-4">
          <div className="w-full mt-5">
            <div className="flex flex-row items-start w-full w-auto justify-between mb-5">
              {logo ? (
                <div className="self-start sm:self-auto mt-2">
                  <Image
                    src={logo}
                    alt={`${fromCompany} Logo`}
                    width={logoWidth || 80}
                    height={80}
                    className="max-w-full max-h-full object-contain rounded"
                  />
                </div>
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
              <div className='text-right'>
                <h2 className="text-xs font-clashLight font-medium mb-2">BILL TO:</h2>
                <div className="font-clashMedium space-y-1 text-xs">
                  <p>{fromCompany}</p>
                  <p className="whitespace-pre-line">{fromAddress}</p>
                  <p>{fromEmail}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between gap-4 text-cdneutral-black mb-8">
              <div>
                <h2 className="text-xs font-clashLight font-medium mb-2 font-clashSemiBold">INVOICE NO: {invoiceNumber}</h2>
                <h2 className="text-xs font-clashLight font-medium mb-2 font-clashSemiBold">{dueDate}</h2>
              </div>
              <div className="text-3xl flex justify-end items-end font-clashSemiBold">
                <h2>INVOICE</h2>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full overflow-x-auto scrollbar-thumb-white scrollbar-thin scrollbar-track-white">
          <table className="w-fit min-w-[550px] mx-auto text-left border-collapse text-xs">
            <thead style={{ backgroundColor: '#67069F' }}>
              <tr className="text-cdneutral-white">
                <th className="p-3 text-xs">Item Description</th>
                <th className="p-3 text-xs text-center">Quantity</th>
                <th className="p-3 text-xs text-center">Unit Price</th>
                <th className="p-3 text-xs text-center">Discount</th>
                <th className="p-3 text-xs text-center">Amount</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {items.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 !== 0 ? headingColor || '#F5E6FE' : 'transparent',
                  }}
                >
                  <td className="py-2 px-4">{item.description}</td>
                  <td className="py-2 px-4 text-center">{item.quantity}</td>
                  <td className="py-2 px-4 text-center">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-2 px-4 text-right">{item.discount}%</td>
                  <td className="py-2 px-4 text-right">
                    ${(item.quantity * item.unitPrice * (1 - item.discount / 100)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col p-3 sm:p-5 gap-2 font-clashMedium text-xs">
          <div className="space-x-4 sm:space-x-10 flex justify-end">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="space-x-4 sm:space-x-10 flex justify-end">
            <span>VAT(10%):</span>
            <span>${vat.toFixed(2)}</span>
          </div>
        </div>

        <div className="">
          <div
            style={{ backgroundColor: '#67069F' }}
            className={`flex text-sm justify-between px-4 py-2 font-clashSemiBold text-cdneutral-white m-4`}
          >
            <p>TOTAL :</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>

        <div className="font-clashMedium space-y-1 text-xs text-right p-4">
          <p>{toCompany}</p>
          <p className="whitespace-pre-line">{toAddress}</p>
        </div>

        <div 
          className=' text-[#F5E6FE]'
          style={{ backgroundColor: headingColor || '#F5E6FE' }}
        >.
        </div>
      </div>
    );
  }
);

export default CommercialOne;
