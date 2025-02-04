export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  dueDate: string;
  fromCompany: string;
  fromAddress: string;
  fromEmail: string;
  toCompany: string;
  toAddress: string;
  toEmail: string;
  items: InvoiceItem[];
  logo: string;
  headingColor: string;
  logoWidth?: number;
}

export interface InvoiceStore {
  // Invoice Data
  invoices: Record<string, InvoiceData>;
  currentInvoice: InvoiceData;
  updateInvoice: (templateId: string, data: InvoiceData) => void;
  getInvoice: (templateId: string) => InvoiceData;
}
