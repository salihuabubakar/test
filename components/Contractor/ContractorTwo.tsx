import React, { forwardRef } from 'react';
import Image from 'next/image';
import { Logoipsum } from '@/assets';
import { InvoiceData } from '@/types/invoiceData';
import { Satisfy } from 'next/font/google';

const satisfy = Satisfy({ subsets: ['latin'], weight: '400' });

const ContractorTwo = forwardRef<HTMLDivElement, InvoiceData>(
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

    return (
      <div
        ref={ref}
        className="w-full max-w-xl mx-auto bg-black border text-cdneutral-white border-gray-300 shadow-lg font-clash h-fit"
      >
        <div
          className="flex w-[50%] items-center px-4 py-2 mb-8 mt-8"
          style={{
            clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)",
            backgroundColor: headingColor || '#E30C49' 
          }}
        >
          {logo ? (
            <Image
              src={logo}
              alt={`${fromCompany} Logo`}
              width={logoWidth || 80}
              height={80}
              className="max-w-full max-h-full object-contain rounded"
            />
          ) : (
            <div className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center">
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
        <div
          className="text-lg font-bold px-4 py-2 w-[30%] text-center ml-auto flex justify-end mb-4"
          style={{
            clipPath: "polygon(9% 0, 100% 0, 100% 100%, 0 100%)",
            backgroundColor: headingColor || '#E30C49'
          }}
        >
          <p className='text-2xl'>INVOICE</p>
        </div>

        <div className="flex flex-row justify-between gap-6 text-cdneutral-white mb-8 px-4">
          <div>
            <h2 className="text-xs font-clashLight font-medium mb-2">INVOICE TO:</h2>
            <div className="font-clashLight space-y-1 text-xs">
              <p className='font-clashMedium' style={{color: headingColor || '#E30C49'}}>{toCompany}</p>
              <p className="whitespace-pre-line">{toAddress}</p>
            </div>
          </div>
          <div>
            <h2 className="text-xs font-clashLight font-medium mb-2"></h2>
            <div className="font-clashLight space-y-1 text-xs">
              <p className='font-clashMedium' style={{color: headingColor || '#E30C49'}}>Invoice No:</p>
              <p className="text-end">{invoiceNumber}</p>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto scrollbar-thumb-white scrollbar-thin scrollbar-track-white">
          <table className="w-fit min-w-[545px] mx-auto text-left border-collapse text-xs text-cdneutral-black">
            <thead>
              <tr style={{ backgroundColor: headingColor || '#E30C49' }} className="text-white">
                <th className="p-3 text-xs">Item Description</th>
                <th className="p-3 text-xs text-center">Quantity</th>
                <th className="p-3 text-xs text-center">Unit Price</th>
                <th className="p-3 text-xs text-center">Amount</th>
              </tr>
            </thead>
            <tbody 
              className="text-xs">
              {items.map((item, index) => (
                <tr 
                  key={index} 
                  style={{
                    backgroundColor: index % 2 !== 0 ? headingColor || '#C6C6C6' : '#FEE7ED',
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

        <div className="flex flex-col p-3 relative top-[-12px] left-[1px] w-fit ml-auto font-clashMedium text-xs px-4 text-cdneutral-black">
          <div 
            className="space-x-4  flex justify-between p-1 px-4"
            style={{
              backgroundColor: headingColor || '#C6C6C6',
            }}
          >
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div 
            className="space-x-4 flex justify-between p-1 px-4"
            style={{
              backgroundColor: headingColor || '#C6C6C6',
            }}
          >
            <span>VAT(10%):</span>
            <span>${vat.toFixed(2)}</span>
          </div>
          <div 
            className="space-x-4 flex justify-between p-1 px-4"
            style={{
              backgroundColor: '#FEE7ED',
            }}
          >
            <span>TOTAL:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="text-cdneutral-white px-8">
          <h4 className="mb-2 text-sm font-clashMedium">Notes</h4>
          <p className="text-xs font-clashLight">
            We prioritize customer satisfaction. Our team of passionate skiers and snowboarders is
            dedicated to delivering exceptional service and ensuring your safety and enjoyment on
            the slopes
          </p>
        </div>

        <div className="flex justify-end mt-2">
          <svg width="478" height="24" viewBox="0 0 478 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39 0L0.5 24H478.5V0H39Z" fill={`${headingColor || '#E30C49'}`}/>
          </svg>

        </div>
      </div>
    );
  }
);

export default ContractorTwo;
