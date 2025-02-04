'use client';

import { LinksProps } from '../invoice-config';
import { useInvoiceStore } from '@/zustand/invoiceDataSlice';

interface InvoicePreviewProps {
  invoice: LinksProps;
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const { getInvoice } = useInvoiceStore();
  const invoiceData = getInvoice(invoice.templateId);

  return (
    <div className="space-y-4">
      {/* <div className="flex max-w-xl mx-auto justify-end space-x-2">
        <Button onClick={downloadAsPDF} variant="outline" size="sm">
          <Printer className="w-4 h-4 mr-2" />
          Print PDF
        </Button>
        <Button onClick={downloadAsImage} size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download Image
        </Button>
      </div> */}

      <invoice.component
        // ref={previewRef}
        invoiceNumber={invoiceData.invoiceNumber}
        dueDate={invoiceData.dueDate}
        fromCompany={invoiceData.fromCompany}
        fromAddress={invoiceData.fromAddress}
        fromEmail={invoiceData.fromEmail}
        toCompany={invoiceData.toCompany}
        toAddress={invoiceData.toAddress}
        items={invoiceData.items}
        logo={invoiceData.logo}
        headingColor={invoiceData.headingColor}
        toEmail={invoiceData.toEmail}
        logoWidth={invoiceData.logoWidth}
      />
    </div>
  );
}
