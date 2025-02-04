'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Share2, Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import CustomButton from '@/components/shared/CustomButton';
import { Checkbox } from '@/components/ui/checkbox';
import { useInvoiceStore } from '@/zustand/invoiceDataSlice';

interface InvoiceActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: string;
}

const InvoiceActionsModal = ({ isOpen, onClose, invoiceId }: InvoiceActionsModalProps) => {
  const { getInvoice } = useInvoiceStore();
  const invoiceData = getInvoice(invoiceId);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState('');
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInvoiceUrl(`${window.location.origin}/invoice/${invoiceId}`);
    }
  }, [invoiceId]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(invoiceUrl);
      setIsCopied(true);
      toast.message('Invoice link copied to clipboard');
      setTimeout(() => setIsCopied(false), 1000); // Reset after 2 seconds
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      toast.error('Failed to copy link. Please try again.');
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Invoice',
          text: 'Check out this invoice',
          url: invoiceUrl,
        });
        toast.message('Invoice shared successfully');
      } catch (err) {
        console.error('Error sharing:', err);
        if (err instanceof DOMException && err.name === 'AbortError') {
          // User cancelled the share operation, no need to show an error
          return;
        }
        toast.error('Failed to share. Copying link instead.');
        await copyLink();
      }
    } else {
      toast.error('Share not supported on this device. Copying link instead.');
      await copyLink();
    }
  };

  const saveInvoice = async () => {
    setIsSaving(true);
    try {
      const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');

      // Check if invoice already exists
      if (savedInvoices.some((invoice: any) => invoice.id === invoiceId)) {
        toast.error('Invoice already saved');
        return;
      }

      // Add the new invoice data along with its ID
      const newInvoice = { id: invoiceId, ...invoiceData };
      savedInvoices.push(newInvoice);
      localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
      toast.message('Invoice saved successfully');
      onClose();
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast.error('Failed to save invoice. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Send Invoice

  const openSendInvoiceModal = () => {
    setIsActionsModalOpen(true);
  };

  const [emails, setEmails] = useState<string[]>(['']);
  const [attachPdf, setAttachPdf] = useState(false);

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const removeEmailField = (index: number) => {
    setEmails((prevEmails) => {
      const newEmails = [...prevEmails];
      newEmails.splice(index, 1);
      return newEmails.length > 0 ? newEmails : [''];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const validEmails = emails.filter((email) => email.trim() !== '');

      if (validEmails.length === 0) {
        toast.error('Email input is emapty');
        return;
      }

      console.log('Sending invoice to:', validEmails, 'Attach PDF:', attachPdf);
      toast.message('Invoice sent successfully');

      setIsActionsModalOpen(false);
    } catch (error) {
      console.error('Error sending invoice:', error);
      toast.error('Failed to send invoice. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
        <DialogContent hideCloseIcon className="sm:max-w-md m-auto w-[95%] dark:text-cdneutral-white text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b]">
          <DialogHeader>
            <DialogTitle>Invoice Actions</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Input value={invoiceUrl} readOnly className="flex-1" />
              <Button
                variant="outline"
                size="icon"
                onClick={copyLink}
                className={isCopied ? 'bg-green-500 text-white' : 'dark:text-cdneutral-white text-cdneutral-black dark:bg-[#09090b]'}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={shareLink} className='dark:text-cdneutral-white text-cdneutral-black dark:bg-[#09090b]'>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 flex flex-col items-center justify-center w-full">
              <p className="text-sm text-muted-foreground">Save invoice for record purpose</p>
              <CustomButton
                disabled={isSaving}
                className="bg-transparent flex items-center justify-start px-10 border border-[#550f70] py-6 w-fit"
                type="button"
                onClick={saveInvoice}
              >
                <p className="text-[#550f70] font-clashLight text-[16px]">
                  {isSaving ? 'Saving...' : 'Save'}
                </p>
              </CustomButton>
            </div>

            <div className="space-y-2 flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Send Invoice to customer to receive payment
              </p>
              <CustomButton
                className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 flex items-center justify-between py-6 px-10 w-fit"
                type="button"
                onClick={openSendInvoiceModal}
              >
                <p className="font-clashLight text-[16px]">Send Invoice</p>
              </CustomButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isActionsModalOpen} onOpenChange={() => setIsActionsModalOpen(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Invoice</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {emails.map((email, index) => (
                <div key={index} className="flex items-center gap-2 w-full">
                  <Input
                    type="email"
                    placeholder="Customer's email address"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    className="w-full"
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEmailField(index)}
                      className="flex-shrink-0 ml-2"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove email</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end">
              <Button
                type="button"
                variant="ghost"
                className="flex items-center justify-end gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0"
                onClick={addEmailField}
              >
                <Plus className="w-4 h-4" />
                Add another email
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="attachPdf"
                checked={attachPdf}
                onCheckedChange={(checked) => setAttachPdf(checked as boolean)}
              />
              <label htmlFor="attachPdf" className="text-sm text-muted-foreground">
                Attach pdf copy of invoice
              </label>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <CustomButton
                className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 flex items-center justify-between py-6 px-10 w-fit"
                type="submit"
                disabled={isSending}
              >
                <p className="font-clashLight text-[16px]">
                  {isSending ? 'Sending..' : 'Send Invoice'}
                </p>
              </CustomButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvoiceActionsModal;
