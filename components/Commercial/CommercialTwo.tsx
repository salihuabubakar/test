import React, { forwardRef } from 'react';
import Image from 'next/image';

import { Logoipsum, subway, phone, mail } from '@/assets';
import { InvoiceData } from '@/types/invoiceData';

const CommercialTwo = forwardRef<HTMLDivElement, InvoiceData>(
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
        className="w-full max-w-xl mx-auto bg-[#236272] text-white border border-gray-300 shadow-lg font-clash h-fit"
      >
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
              <div className="text-3xl flex items-center justify-center font-clashSemiBold px-4">
                <h2>INVOICE</h2>
              </div>
            </div>
            <div style={{ backgroundColor: `${headingColor || '#0D3F4D'}` }} className="flex flex-row justify-between mb-8 p-3 rounded-md">
              <div>
                <h2 className="text-xs font-clashLight font-medium font-clashSemiLight">INVOICE NO: {invoiceNumber}</h2>
              </div>
            </div>
            <div className='flex w-full justify-between items-center'>
              <div className='text-start mb-4'>
                <h2 className="text-xs font-clashLight  mb-2">BILL TO:</h2>
                <div className="font-clashLight space-y-1 text-xs">
                  <p>{fromCompany}</p>
                  <p className="whitespace-pre-line">{fromAddress}</p>
                  <p>{fromEmail}</p>
                </div>
              </div>
              <div>
                <h2 className="text-xs font-clashLight font-medium font-clashSemiLight">Due Date: {dueDate}</h2>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full overflow-x-auto scrollbar-thumb-white scrollbar-thin scrollbar-track-white">
          <table className="w-fit min-w-[550px] mx-auto text-left text-xs">
            <thead style={{ backgroundColor: '#019DC8' }}>
              <tr className="text-cdneutral-white [&>th:first-child]:rounded-l-md [&>th:last-child]:rounded-r-md">
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
                    backgroundColor: headingColor || '#0D3F4D',
                  }}
                  className={`${index === 0 ? '[&>td:first-child]:rounded-tl-md [&>td:last-child]:rounded-tr-md' : ''} ${index === items.length - 1 ? '[&>td:first-child]:rounded-bl-md [&>td:last-child]:rounded-br-md' : ''}`}
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

        <div className="flex justify-end mb-6 gap-6 px-4 font-clashMedium text-xs mt-8">
          <div className="sm:w-1/2">
            <h4 className="mb-2 text-sm">Terms and Condition</h4>
            <p className="text-xs font-clashLight">
              We prioritize customer satisfaction. Our team of passionate skiers and snowboarders is
              dedicated to delivering exceptional service and ensuring your safety and enjoyment on
              the slopes
            </p>
          </div>
          <div
            className="flex flex-row justify-between gap-4 sm:gap-20p-2 p-3 rounded-md sm:w-1/2"
            style={{
              backgroundColor: `${headingColor || '#0D3F4D'}`,
            }}
          >
            <div className="space-y-2 text-sm">
              <p>SUBTOTAL:</p>
              <p>VAT(10%):</p>
              <p>GRAND TOTAL:</p>
            </div>
            <div className="text-right space-y-2 text-sm">
              <p>${subtotal.toFixed(2)}</p>
              <p>${vat.toFixed(2)}</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div
          style={{ backgroundColor: headingColor || '#019DC8' }}
          className="flex justify-between items-center text-cdneutral-white m-4 p-3 rounded-md text-xs font-clashLight gap-1"
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
    );
  }
);

export default CommercialTwo;
