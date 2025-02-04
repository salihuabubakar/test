import React, { forwardRef } from 'react';
import Image from 'next/image';

import { Logoipsum, subway, phone, mail } from '@/assets';
import { InvoiceData } from '@/types/invoiceData';
import { Satisfy } from 'next/font/google';

const satisfy = Satisfy({ subsets: ['latin'], weight: '400' });

const CateringOne = forwardRef<HTMLDivElement, InvoiceData>(
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
        className="w-full max-w-xl mx-auto bg-white text-black border border-gray-200 shadow-lg font-sans h-fit relative"
      >
        <div className='flex justify-between'>
          <div className='flex'>
            <div>
              {/* Dots Pattern Top Left */}
              <div className="absolute top-4 left-4">
                <div className="grid grid-cols-5 gap-1">
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-[#F6DCB4] rounded-full" />
                  ))}
                </div>
              </div>
              {/* Invoice */}
              <svg style={{ marginTop: "80px"}} width="54" height="179" viewBox="0 0 64 279" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M62 249.344V278.688H53.2812V269.031H9.59375V278.688H0.828125L0.828125 249.344H9.59375V259.328H53.2812V249.344H62ZM62 204.683V214.386H35.0469C31.6406 214.386 29.2813 215.027 27.9688 216.308C26.6563 217.589 26 219.449 26 221.886C26 225.48 27.4531 228.417 30.3594 230.699C33.2656 232.949 37.2813 234.074 42.4063 234.074H62L62 243.777H18.3125V234.074H29.2813C25.5 233.105 22.5625 231.308 20.4688 228.683C18.3438 226.058 17.2813 222.824 17.2813 218.98C17.2813 214.511 18.7344 211.011 21.6406 208.48C24.5469 205.949 29.0156 204.683 35.0469 204.683H62ZM18.3125 162.46L62 178.585V190.022L18.3125 206.147V195.788L51.3594 184.257L18.3125 172.819L18.3125 162.46ZM40.2031 121.409C43.6094 121.409 46.7031 121.956 49.4844 123.049C52.2656 124.112 54.6719 125.659 56.7031 127.69C58.7031 129.69 60.2656 132.096 61.3906 134.909C62.5156 137.721 63.0781 140.862 63.0781 144.331C63.0781 147.737 62.5156 150.846 61.3906 153.659C60.2656 156.471 58.7031 158.893 56.7031 160.924C54.6719 162.924 52.2656 164.471 49.4844 165.565C46.7031 166.628 43.6094 167.159 40.2031 167.159C36.8906 167.159 33.8281 166.628 31.0156 165.565C28.1719 164.471 25.7344 162.924 23.7031 160.924C21.6406 158.893 20.0625 156.471 18.9688 153.659C17.8438 150.846 17.2813 147.737 17.2813 144.331C17.2813 140.862 17.8438 137.721 18.9688 134.909C20.0625 132.096 21.6406 129.69 23.7031 127.69C25.7344 125.659 28.1719 124.112 31.0156 123.049C33.8281 121.956 36.8906 121.409 40.2031 121.409ZM40.2031 131.065C38.2344 131.065 36.375 131.378 34.625 132.003C32.8438 132.596 31.3281 133.471 30.0781 134.628C28.8281 135.784 27.8438 137.19 27.125 138.846C26.375 140.471 26 142.299 26 144.331C26 146.393 26.375 148.237 27.125 149.862C27.8438 151.487 28.8281 152.862 30.0781 153.987C31.3281 155.112 32.8438 155.987 34.625 156.612C36.375 157.206 38.2344 157.503 40.2031 157.503C42.2656 157.503 44.1406 157.206 45.8281 156.612C47.5156 155.987 49 155.112 50.2813 153.987C51.5625 152.862 52.5625 151.487 53.2813 149.862C53.9688 148.237 54.3125 146.393 54.3125 144.331C54.3125 142.299 53.9688 140.471 53.2813 138.846C52.5625 137.19 51.5625 135.784 50.2813 134.628C49 133.471 47.5156 132.596 45.8281 132.003C44.1406 131.378 42.2656 131.065 40.2031 131.065ZM12.6406 98.545V110.357H0.828125L0.828125 98.545H12.6406ZM62 89.6387V118.982H53.2813V109.326H27.0781V118.982H18.3125V99.6231H53.2813V89.6387H62ZM55.7656 44.3219C58.5781 47.1344 60.5 50.1031 61.5313 53.2281C62.5625 56.3219 63.0781 59.6812 63.0781 63.3062C63.0781 66.9625 62.5313 70.2906 61.4375 73.2906C60.3438 76.2594 58.8125 78.7906 56.8438 80.8844C54.8438 82.9469 52.4375 84.5406 49.625 85.6656C46.8125 86.7594 43.6719 87.3062 40.2031 87.3062C36.8906 87.3062 33.8281 86.7594 31.0156 85.6656C28.1719 84.5406 25.75 83.0406 23.75 81.1656C21.7188 79.2594 20.1406 77.025 19.0156 74.4625C17.8594 71.9 17.2813 69.1812 17.2813 66.3062C17.2813 63.3062 17.9063 60.6969 19.1563 58.4781C20.4063 56.2594 22.2344 54.65 24.6406 53.65H18.3125V44.9781H38.6563L38.6563 53.65C34.8125 53.65 31.75 54.7125 29.4688 56.8375C27.1563 58.9312 26 61.6656 26 65.0406C26 66.3844 26.2813 67.8062 26.8438 69.3062C27.375 70.775 28.2188 72.1344 29.375 73.3844C30.5313 74.6031 32 75.6187 33.7813 76.4312C35.5625 77.2437 37.7031 77.65 40.2031 77.65C42.6406 77.65 44.75 77.2594 46.5313 76.4781C48.2813 75.6969 49.7344 74.6812 50.8906 73.4312C52.0156 72.15 52.875 70.65 53.4688 68.9312C54.0313 67.1812 54.3125 65.3844 54.3125 63.5406C54.3125 60.3844 53.8281 57.65 52.8594 55.3375C51.8594 52.9937 50.5469 50.9781 48.9219 49.2906L55.7656 44.3219ZM43.8594 37.5363C46.8594 37.0675 49.3594 35.6456 51.3594 33.2706C53.3281 30.8644 54.3125 27.6456 54.3125 23.6144C54.3125 20.4581 53.8281 17.7238 52.8594 15.4113C51.8594 13.0675 50.5469 11.0519 48.9219 9.36438L55.7656 4.39563C58.5781 7.20813 60.5 10.1925 61.5313 13.3488C62.5625 16.4738 63.0781 19.8956 63.0781 23.6144C63.0781 26.9894 62.5156 30.13 61.3906 33.0363C60.2656 35.9425 58.7031 38.4581 56.7031 40.5831C54.6719 42.7081 52.2656 44.38 49.4844 45.5988C46.7031 46.7863 43.6094 47.38 40.2031 47.38C36.8906 47.38 33.8438 46.8331 31.0625 45.7394C28.25 44.6144 25.8281 43.0519 23.7969 41.0519C21.7344 39.0206 20.1406 36.5988 19.0156 33.7863C17.8594 30.9738 17.2813 27.8644 17.2813 24.4581C17.2813 20.9269 17.8906 17.7238 19.1094 14.8488C20.2969 11.9738 22.0313 9.52063 24.3125 7.48938C26.5938 5.42688 29.3906 3.8175 32.7031 2.66125C35.9844 1.505 39.7031 0.92688 43.8594 0.92688V37.5363ZM35.3281 11.8956C32.5156 12.3956 30.2656 13.8488 28.5781 16.255C26.8594 18.6613 26 21.3956 26 24.4581C26 27.5206 26.8594 30.2706 28.5781 32.7081C30.2656 35.1456 32.5156 36.6144 35.3281 37.1144L35.3281 11.8956Z" 
                fill={`${headingColor || '#205493'}`}
              />
              </svg>
            </div>
            {/* Stroke line */}
            <div className='ml-5'>
              <svg width="16" height="176" viewBox="0 0 16 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99999 160C3.58171 160 -7.15038e-06 163.582 -7.34351e-06 168C-7.53664e-06 172.418 3.58171 176 7.99999 176C12.4183 176 16 172.418 16 168C16 163.582 12.4183 160 7.99999 160ZM6.5 -6.55671e-08L6.49999 168L9.49999 168L9.5 6.55671e-08L6.5 -6.55671e-08Z" 
                  fill={`${headingColor || '#205493'}`}
                />
              </svg>
            </div>
          </div>
          <div>
            <div
              className="flex w-[30%] justify-end ml-auto items-center px-4 py-2 mt-6"
              style={{
                clipPath: "polygon(9% 0, 100% 0, 100% 100%, 0 100%)",
                backgroundColor: headingColor || '#2B4C8C' 
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
            <header className="p-8 pb-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="mt-8 space-y-1 text-sm">
                    <p className="font-semibold">INVOICE TO:</p>
                    <p className="font-medium">{toCompany}</p>
                    <p className="">{toAddress}</p>
                    <p className="">{toEmail}</p>
                  </div>
                </div>
                <div 
                  className="flex flex-col items-end"
                  style={{ borderBottom: `2px solid ${headingColor || '#2B4C8C'}`}}
                >
                  <p className="mt-4 text-sm">{dueDate}</p>
                </div>
              </div>
            </header>

            <div className="px-8 py-6">
              <table className="w-full text-sm">
                <thead 
                  style={{
                    borderTop: `2px solid ${headingColor || '#2B4C8C'}`,
                    borderBottom: `2px solid ${headingColor || '#2B4C8C'}`
                  }}
                >
                  <tr className="text-left">
                    <th className="p-3 text-xs">Item Description</th>
                    <th className="p-3 text-xs text-center">Quantity</th>
                    <th className="p-3 text-xs text-center">Unit Price</th>
                    <th className="p-3 text-xs text-center">Discount</th>
                    <th className="p-3 text-xs text-center">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="">
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
          </div>
        </div>

        <div className="px-8 py-4">
          <div className="flex justify-end space-y-2">
            <div className="w-48 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>VAT (10%):</span>
                <span>${vat.toFixed(2)}</span>
              </div>
              <div 
                style={{
                  borderTop: `2px solid ${headingColor || '#2B4C8C'}`,
                  borderBottom: `2px solid ${headingColor || '#2B4C8C'}`
                }} 
                className="flex justify-between font-bold text-lg pt-2">
                <span>TOTAL:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-600 px-8">
          <p>*Payment Terms: Full payment due within 15 days of the event date</p>
        </div>

        <div style={{ backgroundColor: `${headingColor || '#205493'}`}} className="text-white mt-8 p-6">
          {/* Dots Pattern Bottom Right */}
          <div className="absolute bottom-[-10px] left-[-15px]">
            <div className="grid grid-cols-5 gap-1">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white rounded-full" />
              ))}
            </div>
          </div>
          <p className={`${satisfy.className} text-center italic text-lg`}>
            Thank you for choosing {fromCompany} catering!
          </p>
          {/* Dots Pattern Bottom Right */}
          <div className="absolute bottom-7 right-4">
            <div className="grid grid-cols-5 gap-1">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default CateringOne;
