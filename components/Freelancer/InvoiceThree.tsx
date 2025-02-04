import React, { forwardRef } from 'react';
import Image from 'next/image';
import { Logoipsumbg } from '@/assets';
import { InvoiceData } from '@/types/invoiceData';

const InvoiceThree = forwardRef<HTMLDivElement, InvoiceData>(
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
      return items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice * (1 - item.discount / 100),
        0
      );
    };

    const subtotal = calculateSubtotal();
    const vat = subtotal * 0.1;
    const total = subtotal + vat;

    const cdblue = '#020B71';

    return (
      <div
        ref={ref}
        className="w-full max-w-xl mx-auto bg-white border border-gray-300 shadow-lg h-fit font-clash"
      >
        <header className="flex  flex-row justify-between items-center gap-6 mb-8">
          {logo ? (
            <div
              className="flex w-[40%] items-center px-4 py-2 mb-8 mt-8"
              style={{
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                backgroundColor: headingColor || cdblue 
              }}
            >
              <Image
                src={logo}
                alt={`${fromCompany} Logo`}
                width={logoWidth || 80}
                height={80}
                className="max-w-full max-h-full object-contain rounded"
              />
            </div>
          ) : (
            <div
              className="flex w-[40%] h-10 items-center px-4 py-2 mb-8 mt-8"
              style={{
                backgroundColor: headingColor || cdblue,
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",  
              }}
            >
              <Image
                  src={Logoipsumbg}
                  alt="Logo"
                  width={80}
                  height={80}
                  className="max-w-full max-h-full object-contain rounded"
                />
            </div>
          )}
          <div>
            <BubbleSvg headingColor={headingColor} />
          </div>
          <div className="text-center sm:text-right px-4 pt-3">
            <h1 className="text-sm font-clashSemiBold tracking-wide text-dneutral-black mb-2">
              INVOICE
            </h1>
            <div className="font-clashLight">
              <p>No: {invoiceNumber}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-cdneutral-black mb-8 px-4">
          <div>
            <h2 className="text-xs font-clashLight font-medium mb-2">INVOICE TO:</h2>
            <div className="font-clashMedium text-xs">
              <p className="font-clashSemiBold">{toCompany}</p>
              <div className="font-clashLight">
                <p>+123-456-7890</p>
                <p>{toEmail}</p>
                <p>www.morganindustries.com</p>
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-xs font-clashLight font-medium mb-2">INVOICE DATE :</h2>
            <div className="font-clashMedium text-xs">
              <p>{dueDate}</p>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto mb-6 scrollbar-thumb-white scrollbar-thin scrollbar-track-white">
          <table 
            className="w-fit min-w-[550px] mx-auto text-left border-collapse text-xs"
            style={{ borderBottom: `1px solid ${headingColor || cdblue}` }}
          >
            <thead>
              <tr style={{ backgroundColor: headingColor || cdblue }} className="text-white">
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
                  style={{ borderBottom: `1px solid ${headingColor || cdblue}` }}
                  className="text-black"
                >
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4 text-center">{item.quantity}</td>
                  <td className="py-3 px-4 text-center">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-2 px-4 px-4 text-right">{item.discount}%</td>
                  <td className="py-3 px-4 text-center">
                    ${(item.quantity * item.unitPrice * (1 - item.discount / 100)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col p-3 gap-2 font-clashMedium text-xs PX-4">
          <div className="flex justify-end sm:space-x-10">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex  justify-end sm:space-x-10">
            <span>VAT(10%):</span>
            <span>${vat.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between relative">
          <div className="absolute left-[-45px] top-[-60px] flex flex-row justify-start">
            <BubbleSvg headingColor={headingColor} />
          </div>

          <div
            style={{ backgroundColor: headingColor || cdblue }}
            className="flex text-sm h-fit justify-between px-4 py-2 font-clashMedium text-white w-[170px] absolute right-[10px] bottom-[-10px]"
          >
            <p>TOTAL :</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>

        <div
          style={{ backgroundColor: headingColor || cdblue }}
          className="w-full mt-8 sm:p-1 text-cdneutral-white"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 gap-6">
            <div className="w-full sm:w-2/3">
              <h2 className="font-clashSemiBold text-sm mb-2">TERMS AND CONDITION</h2>
              <h4 className="text-sm font-clashLight mb-4 pr-8 text-xs">
                Please send payment within 30 days of receiving this invoice. There will be 10%
                interest charge per month on late invoice
              </h4>
              <h2 className="text-sm font-clashSemiBold">THANK YOU FOR YOUR BUSINESS</h2>
            </div>

            <div className="w-full flex flex-col items-center justify-center sm:w-auto text-center border-t-2 border-cdneutral-darkGray pt-4 sm:pt-0 sm:pl-6">
              <h2 className="text-sm font-clashMedium">Morgan John</h2>
              <p className="text-xs font-clashLight">COMPANY CEO</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default InvoiceThree;

const BubbleSvg =  ({ headingColor }: any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="209px" height="103px" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', fillRule: 'evenodd', clipRule: 'evenodd' }} xmlnsXlink="http://www.w3.org/1999/xlink">
      <g><path style={{opacity: "opacity:0.766"}} fill={`${headingColor || "#00096f"}`} d="M 89.5,-0.5 C 92.1667,-0.5 94.8333,-0.5 97.5,-0.5C 96.6879,0.993095 95.3545,1.65976 93.5,1.5C 91.6455,1.65976 90.3121,0.993095 89.5,-0.5 Z"/></g>
      <g><path style={{opacity: "opacity:0.934"}} fill={`${headingColor || "#010a70"}`} d="M 123.5,-0.5 C 130.5,-0.5 137.5,-0.5 144.5,-0.5C 144.489,1.01739 143.823,2.18405 142.5,3C 135.014,7.23238 128.681,6.06571 123.5,-0.5 Z"/></g>
      <g><path style={{opacity: "opacity:0.928"}} fill={`${headingColor || "#010a70"}`} d="M 180.5,-0.5 C 183.5,-0.5 186.5,-0.5 189.5,-0.5C 196.092,5.08786 196.092,10.9212 189.5,17C 179.45,18.7393 175.283,14.5727 177,4.5C 177.997,2.67694 179.164,1.01027 180.5,-0.5 Z"/></g>
      <g><path style={{opacity: "opacity:0.935"}} fill={`${headingColor || "#010a70"}`} d="M 83.5,21.5 C 94.2099,19.712 98.7099,24.0453 97,34.5C 91.238,41.1479 85.5713,41.1479 80,34.5C 78.6681,29.4145 79.8347,25.0812 83.5,21.5 Z"/></g>
      <g><path style={{opacity: "opacity:0.814"}} fill={`${headingColor || "#010971"}`} d="M 51.5,26.5 C 58.1584,25.3445 60.1584,27.8445 57.5,34C 50.7496,35.4689 48.7496,32.9689 51.5,26.5 Z"/></g>
      <g><path style={{opacity: "opacity:0.938"}} fill={`${headingColor || "#010a71"}`} d="M 164.5,34.5 C 172.882,33.6394 175.549,37.3061 172.5,45.5C 162.419,47.5126 159.752,43.846 164.5,34.5 Z"/></g>
      <g><path style={{opacity: "opacity:0.911"}} fill={`${headingColor || "#010a6f"}`} d="M 127.5,36.5 C 137.855,36.0383 140.855,40.5383 136.5,50C 126.961,53.6601 122.794,50.4934 124,40.5C 124.69,38.6498 125.856,37.3164 127.5,36.5 Z"/></g>
      <g><path style={{opacity: "opacity:0.933"}} fill={`${headingColor || "#010a70"}`} d="M 50.5,63.5 C 57.3393,61.6074 61.006,64.1074 61.5,71C 60.9943,78.0528 57.3277,80.3862 50.5,78C 49.5838,77.6258 48.7504,77.1258 48,76.5C 47.3333,72.8333 47.3333,69.1667 48,65.5C 48.9947,64.9341 49.828,64.2674 50.5,63.5 Z"/></g>
      <g><path style={{opacity: "opacity:0.933"}} fill={`${headingColor || "#010a70"}`} d="M 175.5,70.5 C 185.491,69.3255 189.991,73.6588 189,83.5C 186.103,88.1549 181.937,89.6549 176.5,88C 174.714,87.2155 173.214,86.0488 172,84.5C 170.608,79.0931 171.774,74.4265 175.5,70.5 Z"/></g>
      <g><path style={{opacity: "opacity:0.907"}} fill={`${headingColor || "#010a70"}`} d="M 87.5,74.5 C 97.512,72.4988 100.179,75.9988 95.5,85C 86.776,86.4258 84.1093,82.9258 87.5,74.5 Z"/></g>
      <g><path style={{opacity: "opacity:0.871"}} fill={`${headingColor || "#00096e"}`} d="M 133.5,79.5 C 135.5,79.5 137.5,79.5 139.5,79.5C 139.5,81.8333 139.5,84.1667 139.5,86.5C 137.167,86.5 134.833,86.5 132.5,86.5C 132.298,84.0504 132.631,81.717 133.5,79.5 Z"/></g>
    </svg>
  )
};
