'use client';

import { useState, useEffect, ForwardedRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Minus, Plus, Link2, X, Search, Download, Printer } from 'lucide-react';
import CustomButton from '@/components/shared/CustomButton';
import { toast } from 'sonner';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInvoiceData: any;
  downloadAsPDF: () => void;
  downloadAsImage: () => void;
  previewRef: ForwardedRef<HTMLDivElement>;
}

const PreviewModal = ({
  isOpen,
  onClose,
  selectedInvoiceData,
  downloadAsPDF,
  downloadAsImage,
  previewRef,
}: PreviewModalProps) => {
  const [scale, setScale] = useState(1);
  const [invoiceUrl, setInvoiceUrl] = useState('');

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  const maxZoom = Math.round(scale * 100) === 200;
  const minZoom = Math.round(scale * 100) === 50;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInvoiceUrl(`${window.location.origin}/shared-invoice/${selectedInvoiceData?.id}`);
    }
  }, [selectedInvoiceData?.id]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(invoiceUrl);
      toast.message('Link copied to clipboard');
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent hideCloseIcon className="max-w-[100vw] h-[100vh] p-0 bg-transparent border-0">
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onClose} className="mr-2 text-white">
              <X className="w-4 h-4" />
            </Button>
            <h2 className="text-xl font-clashLight text-white">
              Invoice to {selectedInvoiceData?.toCompany}
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Button variant="ghost" size="icon" className="text-white" onClick={downloadAsPDF}>
              <Printer className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white" onClick={downloadAsImage}>
              <Download className="w-4 h-4" />
            </Button>
            <CustomButton
              className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 flex items-center rounded-full p-2 justify-between w-fit"
              leftIcon={<Link2 className="w-4 h-4" />}
              type="button"
              onClick={copyLink}
            >
              <p className="font-clashLight text-[16px]">Copy link</p>
            </CustomButton>
          </div>
        </div>

        <div className="flex-1 overflow-auto relative">
          <div
            className="min-h-full p-10"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center top',
              transition: 'transform 0.2s',
            }}
          >
            {selectedInvoiceData && selectedInvoiceData.getInvoiceById.component && (
              <selectedInvoiceData.getInvoiceById.component
                ref={previewRef}
                invoiceNumber={selectedInvoiceData.invoiceNumber}
                dueDate={selectedInvoiceData.dueDate}
                fromCompany={selectedInvoiceData.fromCompany}
                fromAddress={selectedInvoiceData.fromAddress}
                fromEmail={selectedInvoiceData.fromEmail}
                toCompany={selectedInvoiceData.toCompany}
                toAddress={selectedInvoiceData.toAddress}
                items={selectedInvoiceData.items}
                logo={selectedInvoiceData.logo}
                headingColor={selectedInvoiceData.headingColor}
                toEmail={selectedInvoiceData.toEmail}
                logoWidth={selectedInvoiceData.logoWidth}
              />
            )}
          </div>
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#000] rounded-full mt-2 px-4 py-2">
          <Button
            disabled={minZoom}
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            className="h-8 w-8 rounded-full text-white"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="text-center text-white">
            <Search className="w-4 h-4" />
          </span>
          <Button
            disabled={maxZoom}
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            className="h-8 w-8 rounded-full text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
