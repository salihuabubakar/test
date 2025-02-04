import React, { forwardRef } from 'react';
import Image from 'next/image';
import { world, tel, email, sign } from '@/assets';
import { InvoiceData } from '@/types/invoiceData';

const BusinessTwo = forwardRef<HTMLDivElement, InvoiceData>(
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
      return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    };

    const subtotal = calculateSubtotal();
    const vat = subtotal * 0.1;
    const total = subtotal + vat;

    const cdblack = '#000';

    return (
      <div
        ref={ref}
        className="w-full max-w-xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg font-clash flex flex-row h-fit"
      >
        <div
          style={{ backgroundColor: headingColor || cdblack }}
          className="text-white flex flex-col justify-center gap-4 items-center p-2"
        >
          <div className="text-xs font-clashLight">
            <h3>ISSUED TO:</h3>
            <h3>{toCompany}</h3>
          </div>
          <div className="text-xs font-clashLight">
            <h3>INVOICE NO:</h3>
            <p>{invoiceNumber}</p>
          </div>
          <div className="text-xs font-clashLight">
            <h3>DATE ISSUED</h3>
            <p>10/10/2024</p>
          </div>
          <div className="text-xs font-clashLight">
            <h3>DATE DUE</h3>
            <p>{dueDate}</p>
          </div>
        </div>
        <div className="flex-grow p-4 overflow-x-auto ">
          <div>
            <div className="py-8">
              <div className="flex justify-center text-center sm:self-auto">
                {logo ? (
                  <div className="self-end sm:self-auto">
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
                    <h2 className="text-2xl font-clashMedium text-center">Logoipsum</h2>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full mb-6 overflow-x-auto scrollbar-thumb-white scrollbar-thin scrollbar-track-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr
                    style={{
                      borderTop: `2px solid ${headingColor || cdblack}`,
                      borderBottom: `2px solid ${headingColor || cdblack}`,
                    }}
                    className="text-black"
                  >
                    <th className="p-3 text-xs">Item Description</th>
                    <th className="p-3 text-xs text-center">Quantity</th>
                    <th className="p-3 text-xs text-center">Unit Price</th>
                    <th className="p-3 text-xs text-center">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
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
            <div>
              <div className="flex flex-col p-3 sm:p-5 gap-2 text-xs">
                <div className="flex justify-between sm:justify-end sm:space-x-32 font-clashMedium">
                  <span className="text-sm">Subtotal:</span>
                  <span className="text-sm">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between sm:justify-end sm:space-x-32 font-clashMedium">
                  <span className="text-sm">VAT(10%):</span>
                  <span className="text-sm">${vat.toFixed(2)}</span>
                </div>
              </div>
              <div
                className="flex justify-between font-clashMedium border-t-2 border-b-2 border-black p-2 text-sm"
                style={{
                  borderTop: `2px solid ${headingColor || cdblack}`,
                  borderBottom: `2px solid ${headingColor || cdblack}`,
                }}
              >
                <p>GRAND TOTAL:</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between py-8 sm:py-16">
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
            <div className="font-clashMedium flex flex-col items-center">
              <h2 className="text-sm mb-2">THANK YOU</h2>
              <Image src={sign} alt="signature" width={100} height={50} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default BusinessTwo;
