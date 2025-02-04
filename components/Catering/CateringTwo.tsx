import React, { forwardRef } from 'react';
import Image from 'next/image';
import { world, tel, email, sign } from '@/assets';

import { Logoipsum, subway, phone, mail } from '@/assets';
import { InvoiceData } from '@/types/invoiceData';

const CateringTwo = forwardRef<HTMLDivElement, InvoiceData>(
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
      toEmail
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
        className="w-full max-w-xl mx-auto bg-[#ffff] text-black border border-gray-300 shadow-lg font-clash h-fit"
      >
        <header className="flex flex-col gap-4 p-4 w-full">
          <div className="text-5xl flex items-center justify-start font-clashSemiBold">
            <h2 style={{ color: `${headingColor || '#FF3A36'}`}}>INVOICE</h2>
          </div>
          <div className='flex w-full justify-between'>
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
            </div>
            <div className='flex  flex-col w-full justify-start text-end'>
              <h2 className="text-xs font-clashSemiBold  mb-2">Invoice TO:</h2>
              <div className="font-clashSemiBold space-y-1 text-xs">
                <p>{fromCompany}</p>
                <p className="whitespace-pre-line">{fromAddress}</p>
                <p>{fromEmail}</p>
                <h2 className="text-xs font-medium">Due Date: {dueDate}</h2>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full overflow-x-auto scrollbar-thumb-white scrollbar-thin scrollbar-track-white">
          <table className="w-fit min-w-[550px] mx-auto text-left text-xs">
            <thead style={{ backgroundColor: `${headingColor || '#FF3A36'}`}}>
              <tr className="text-cdneutral-white [&>th:first-child]:rounded-tl-md [&>th:last-child]:rounded-tr-md">
                <th className="p-3 text-xs">Item Description</th>
                <th className="p-3 text-xs text-center">Quantity</th>
                <th className="p-3 text-xs text-center">Unit Price</th>
                <th className="p-3 text-xs text-center">Discount</th>
                <th className="p-3 text-xs text-center">Amount</th>
              </tr>
            </thead>
            <tbody className="text-xs text-cdneutral-white">
              {items.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: headingColor || '#FF3A36',
                  }}
                  className={`${
                    index === items.length - 1 ? '[&>td:first-child]:rounded-bl-md [&>td:last-child]:rounded-br-md' : ''
                  }`}
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

        <div
          className="flex flex-row justify-between gap-4 sm:gap-20p-2 p-4 rounded-md"
        >
          <div className="space-y-2 text-sm">
            <p>SUBTOTAL:</p>
            <p>VAT(10%):</p>
            
          </div>
          <div className="text-right space-y-2 text-sm">
            <p>${subtotal.toFixed(2)}</p>
            <p>${vat.toFixed(2)}</p>
          </div>
        </div>
        <div
          className=' mx-[15px] flex justify-between py-1'
          style={{
            borderTop: `2px solid ${headingColor || '#FF3A36'}`,
            borderBottom: `2px solid ${headingColor || '#FF3A36'}`
          }}
        >
          <p className='font-clashSemiBold'>
            TOTAL:
          </p>
            <p className='font-clashSemiBold'>${total.toFixed(2)}</p>
        </div>

        <div className="flex justify-between px-4 py-8 font-clashMedium text-xs">
          <p>*Payment Terms: Full payment due within 15 days of the event date</p>
          <div className="text-cdneutral-black">
            <div className="space-y-2 font-clashMedium mb-4 sm:mb-0">
              <div className="flex items-center gap-2">
                <Image src={world} alt="website" width={15} height={15} />
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
          </div>
        </div>
      </div>
    );
  }
);

export default CateringTwo;
