'use client';
import React, { useState, useEffect, useRef } from 'react';
import TopBar from '@/components/Dashboard/TopBar';
import { invoiceIcon } from '@/assets';
import Image from 'next/image';
import newIcon from '@/assets/images/newIcon.svg';
import { Button } from '@/components/ui/button';
import PreviewModal from './preview-modal';
import { getSavedInvoices } from './localData';
import { getInvoiceById } from '../invoice-config';
import { Download, ArrowLeftCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useRouter } from 'next/navigation';
import NoDataRecord from '@/components/NoData/noDataRecord';

const SavedInvoicesPage = () => {
  const router = useRouter();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const invoices = getSavedInvoices();
  const [selectedInvoiceData, setSelectedInvoiceData] = useState<any>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const transformedInvoices = invoices.map((invoice: any) => ({
    ...invoice,
    icon: newIcon,
    getInvoiceById: getInvoiceById(invoice.id),
  }));

  const handleViewChange = (invoice: any) => {
    setSelectedInvoiceData(invoice);
    setIsPreviewOpen(true);
  };

  const previewRef = useRef<HTMLDivElement>(null);

  const scale = 2; // Increase scale for better quality

  const downloadAsPDF = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      scale: scale,
      backgroundColor: 'white',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = canvas.width / scale;
    const pdfHeight = canvas.height / scale;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice.pdf');
  };

  const downloadAsImage = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      scale: scale,
      backgroundColor: 'white',
    });
    const link = document.createElement('a');
    link.download = 'invoice.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <>
      <TopBar title="Saved Invoice" logo={invoiceIcon} />
      <div className="h-screen flex flex-col px-6 pt-3 dark:text-cdneutral-white text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b]">
        <div className="flex-grow space-y-4">
          <ArrowLeftCircle onClick={() => router.push('/invoice')} className="w-8 h-8 cursor-pointer dark:text-cdneutral-white" />
          {transformedInvoices.length > 0 ? (
            transformedInvoices.map((invoice: any) => (
              <div
                key={invoice.id}
                className={`flex items-center justify-between p-2 rounded-lg shadow-sm bg-cdneutral-white  dark:bg-[#09090b] border border-gray-200`}
              >
                <div className="flex items-center space-x-4">
                  <Image src={invoice.icon} alt="Notification Icon" width={40} height={40} />
                  <div>
                    <p className="font-medium text-cdneutral-black dark:text-cdneutral-white">
                      Invoice sent to {invoice.toCompany}
                    </p>
                    <p className="text-sm text-cdneutral-darkGray">
                      {invoice.date || '24-09-2024'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-6">
                  <Button
                    onClick={() => handleViewChange(invoice)}
                    className="text-cdneutral-black border border-cdsuccess-300 text-sm"
                    variant="outline"
                    size="sm"
                  >
                    View
                  </Button>

                  {/* Desktop */}
                  <Button
                    onClick={downloadAsImage}
                    variant="ghost"
                    className="bg-cdsuccess-300 hidden md:block text-cdneutral-white font-clashMedium text-xs  py-2 px-3 rounded-lg"
                  >
                    Download
                  </Button>

                  {/* Mobile */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white bg-cdsuccess-300 md:hidden"
                  >
                    <Download onClick={downloadAsImage} className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <NoDataRecord />
          )}
        </div>

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          selectedInvoiceData={selectedInvoiceData}
          downloadAsPDF={downloadAsPDF}
          downloadAsImage={downloadAsImage}
          previewRef={previewRef}
        />
      </div>
    </>
  );
};

export default SavedInvoicesPage;
