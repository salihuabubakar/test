import { create } from 'zustand';
import { InvoiceData, InvoiceStore } from '@/types/invoiceData';

const defaultInvoice: InvoiceData = {
  invoiceNumber: '#001',
  dueDate: '1 OCT 2024',
  fromCompany: 'Timetales',
  fromAddress: '123, Anywhere street\nNew York, NY',
  fromEmail: 'timetales@outlook.com',
  toCompany: 'Logoipsum',
  toAddress: '123, Anywhere street,\nNew York, NY',
  toEmail: 'mail@outlook.com',
  items: [
    { description: 'Digital Consulting', quantity: 1, unitPrice: 1000, discount: 0 },
    { description: 'Graphics Design', quantity: 1, unitPrice: 500, discount: 0 },
    { description: 'Marketing Services', quantity: 1, unitPrice: 300, discount: 0 },
  ],
  logo: '',
  headingColor: '',
};

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  // Invoice Data Management
  invoices: {},
  currentInvoice: defaultInvoice,
  updateInvoice: (templateId, data) =>
    set((state) => ({
      invoices: { ...state.invoices, [templateId]: data },
    })),
  getInvoice: (templateId) => get().invoices[templateId] || defaultInvoice,
}));
