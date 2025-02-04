'use client';

import { useState } from 'react';
import InvoiceForm from './invoice-form';
import { InvoicePreview } from './invoice-preview';
import { Button } from '@/components/ui/button';
import { Eye, PenSquare, Share2, ArrowLeftCircle } from 'lucide-react';
import { getInvoiceById } from '../invoice-config';
import { useParams } from 'next/navigation';
import InvoiceActionsModal from './invoice-action-modal';
import CustomButton from '@/components/shared/CustomButton';
import { useRouter } from 'next/navigation';

export default function TemplatePage() {
  const params = useParams();
  const router = useRouter();
  const invoice = getInvoiceById(params.id as string);
  const [activeView, setActiveView] = useState<'form' | 'preview'>('preview');
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div className="min-h-screen bg-cdneutral-white dark:bg-[#09090b]">
      <div className="container mx-auto px-4 py-8">
        <ArrowLeftCircle onClick={() => router.push('/invoice')} className="w-8 h-8 dark:text-cdneutral-white cursor-pointer mt-10 md:mt-0" />
        <div className="flex justify-end mb-5 md:mb-0">
          <CustomButton
            className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 flex items-center justify-between py-6"
            leftIcon={<Share2 className="w-16 h-16" />}
            type="button"
            onClick={() => setIsActionsModalOpen(true)}
          >
            <p className="font-clashSemiBold text-[16px]">Share & Save</p>
          </CustomButton>
        </div>
        <div className="max-[1155px]:flex hidden mb-4 justify-center space-x-2">
          <Button
            variant={activeView === 'preview' ? 'default' : 'outline'}
            onClick={() => setActiveView('preview')}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            variant={activeView === 'form' ? 'default' : 'outline'}
            onClick={() => setActiveView('form')}
          >
            <PenSquare className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div
            className={`w-full max-[1155px]:w-3/3 mt-8 md:mt-0 ${activeView === 'preview' ? 'max-[1155px]:block' : 'max-[1155px]:hidden'} min-[1156px]:block`}
          >
            <div className="bg-card sm:p-6 h-full overflow-auto bg-cdneutral-white dark:bg-[#09090b]">
              <InvoicePreview invoice={invoice} />
            </div>
          </div>
          <div
            className={`w-full max-[1155px]:w-3/3 ${activeView === 'form' ? 'max-[1155px]:block' : 'max-[1155px]:hidden'} min-[1156px]:block`}
          >
            <div className="bg-card p-6 h-full overflow-auto bg-cdneutral-white dark:bg-transparent">
              <InvoiceForm invoice={invoice} />
            </div>
          </div>
        </div>

        <InvoiceActionsModal
          isOpen={isActionsModalOpen}
          onClose={() => setIsActionsModalOpen(false)}
          invoiceId={invoice.templateId}
        />
      </div>
    </div>
  );
}
