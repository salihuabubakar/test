'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSavedInvoices } from '../../(dashboard)/invoice/saved-invoices/localData';
import { getInvoiceById } from '../../(dashboard)/invoice/invoice-config';
import CustomButton from '@/components/shared/CustomButton';

const SharedInvoicePage = () => {
  const params = useParams();
  const invoices = getSavedInvoices();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const transformedInvoices = invoices?.map((invoice: any) => ({
    ...invoice,
    getInvoiceById: getInvoiceById(invoice.id),
  }));

  const sharedInvoice = transformedInvoices?.find((invoice: any) => invoice.id === params.id as string);

  const handlePayNow = () => {
    alert('Payment processing..');
  };

  if (!isClient) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        {sharedInvoice && sharedInvoice?.getInvoiceById?.component && (
          <sharedInvoice.getInvoiceById.component
            invoiceNumber={sharedInvoice.invoiceNumber}
            dueDate={sharedInvoice.dueDate}
            fromCompany={sharedInvoice.fromCompany}
            fromAddress={sharedInvoice.fromAddress}
            fromEmail={sharedInvoice.fromEmail}
            toCompany={sharedInvoice.toCompany}
            toAddress={sharedInvoice.toAddress}
            items={sharedInvoice.items}
            logo={sharedInvoice.logo}
            headingColor={sharedInvoice.headingColor}
            toEmail={sharedInvoice.toEmail}
            logoWidth={sharedInvoice.logoWidth}
          />
        )}
        <div className="text-center mt-8">
          <CustomButton
            onClick={handlePayNow}
            className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 flex items-center mx-auto px-10 py-3"
          >
            Pay Now
          </CustomButton>
        </div>
      </div>
    </div>
  )
};

export default SharedInvoicePage;
