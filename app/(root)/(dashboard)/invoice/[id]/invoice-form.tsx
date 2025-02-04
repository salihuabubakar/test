'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from 'lucide-react';
import { Open_Sans } from 'next/font/google';
import CustomButton from '@/components/shared/CustomButton';
import { useInvoiceStore } from '@/zustand/invoiceDataSlice';
import { LinksProps } from '../invoice-config';
import { cn } from '@/lib';

interface InvoiceFormProps {
  invoice: LinksProps;
}

const openSans = Open_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

const defaultColors = [
  '#399320',
  '#932020',
  '#936920',
  '#F7DD4A',
  '#2CED96',
  '#019DC8',
  '#205493',
  '#1801B0',
  '#67069F',
  '#D512DB',
  '#E30C49',
  '#020B71',
  '#FF3A36',
  '#000000',
];

const InvoiceForm = ({ invoice }: InvoiceFormProps) => {
  const { getInvoice, updateInvoice } = useInvoiceStore();
  const invoiceData = getInvoice(invoice.templateId);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInvoiceUpdate = (field: string, value: any) => {
    const updatedData = { ...invoiceData, [field]: value };
    updateInvoice(invoice.templateId, updatedData);
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleInvoiceUpdate('logo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const updatedItems = [...invoiceData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleInvoiceUpdate('items', updatedItems);
  };

  const addItem = () => {
    const newItem = { description: '', quantity: 1, unitPrice: 0, discount: 0 };
    handleInvoiceUpdate('items', [...invoiceData.items, newItem]);
  };

  const removeItem = (index: number) => {
    const updatedItems = invoiceData.items.filter((_, i) => i !== index);
    handleInvoiceUpdate('items', updatedItems);
  };

  if (!isClient) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <form 
      className={`
        space-y-6 overflow-x-none overflow-y-auto max-h-[830px] scrollbar-thumb-cdneutral-white dark:scrollbar-thumb-transparent
        scrollbar-thin scrollbar-track-cdneutral-white dark:scrollbar-track-transparent bg-cdneutral-white w-fit px-4 dark:bg-transparent
        dark:text-cdneutral-white
      `}
    >
      <div className="flex md:flex-row flex-col items-center bg-cdneutral-white dark:bg-transparent">
        <div>
          <Label className={`${openSans.className}`} htmlFor="headingColor">
            Choose color
          </Label>
          <div className="flex items-center space-x-2 mt-2">
            <Input
              id="headingColor"
              type="color"
              value={invoiceData.headingColor}
              onChange={(e) => handleInvoiceUpdate('headingColor', e.target.value)}
              className="w-32 h-32 p-0 rounded-full border-2 border-white ring-2 ring-gray-200 overflow-hidden appearance-none cursor-pointer [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mx-4 mt-2">
          {defaultColors.map((color) => (
            <div key={color} className="flex items-center justify-center">
              <Button
                onClick={() => handleInvoiceUpdate('headingColor', color)}
                className={cn(
                  'w-8 h-8 rounded-full cursor-pointer transition-all duration-200',
                  'hover:scale-110 hover:ring-2 hover:ring-offset-2 hover:ring-gray-300',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300',
                  invoiceData.headingColor.toLowerCase() === color.toLowerCase() &&
                    'scale-110 ring-2 ring-offset-2 ring-gray-400'
                )}
                style={{ backgroundColor: color }}
                type="button"
                aria-label={`Select color ${color}`}
                aria-pressed={invoiceData.headingColor.toLowerCase() === color.toLowerCase()}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-full">
          <Label className={`${openSans.className}`} htmlFor="logo">
            Logo
          </Label>
          <Input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} />
        </div>
        <div className="w-full">
          <Label htmlFor="logoWidth">Width (px)</Label>
          <Input
            id="logoWidth"
            type="number"
            value={invoiceData.logoWidth || 80}
            onChange={(e) => handleInvoiceUpdate('logoWidth', parseInt(e.target.value))}
            min="1"
          />
        </div>
      </div>

      <div className="flex md:flex-row flex-col items-center space-x-4">
        <div className="w-full">
          <Label className={`${openSans.className}`} htmlFor="dueDate">
            Due Date
          </Label>
          <Input
            id="dueDate"
            value={invoiceData.dueDate}
            onChange={(e) => handleInvoiceUpdate('dueDate', e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label className={`${openSans.className}`} htmlFor="invoiceNumber">
            Invoice Number
          </Label>
          <Input
            id="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={(e) => handleInvoiceUpdate('invoiceNumber', e.target.value)}
          />
        </div>
      </div>

      {/* From Company Details */}
      <div className="space-y-2">
        <h3 className="font-semibold">From</h3>
        <div className="flex md:flex-row flex-col items-center space-x-4">
          <div className="w-full">
            <Label className={`${openSans.className}`} htmlFor="fromCompany">
              Company
            </Label>
            <Input
              id="fromCompany"
              value={invoiceData.fromCompany}
              onChange={(e) => handleInvoiceUpdate('fromCompany', e.target.value)}
            />
          </div>
          <div className="w-full">
            <Label className={`${openSans.className}`} htmlFor="fromEmail">
              Email
            </Label>
            <Input
              id="fromEmail"
              type="email"
              value={invoiceData.fromEmail}
              onChange={(e) => handleInvoiceUpdate('fromEmail', e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label className={`${openSans.className}`} htmlFor="fromAddress">
            Address
          </Label>
          <textarea
            id="fromAddress"
            className="w-full min-h-[80px] px-3 py-2 border rounded-md bg-cdneutral-white dark:bg-transparent"
            value={invoiceData.fromAddress}
            onChange={(e) => handleInvoiceUpdate('fromAddress', e.target.value)}
          />
        </div>
      </div>

      {/* To Company Details */}
      <div className="space-y-2">
        <h3 className="font-semibold">To</h3>
        <div className="flex md:flex-row flex-col items-center space-x-4">
          <div className="w-full">
            <Label className={`${openSans.className}`} htmlFor="toCompany">
              Company
            </Label>
            <Input
              id="toCompany"
              value={invoiceData.toCompany}
              onChange={(e) => handleInvoiceUpdate('toCompany', e.target.value)}
            />
          </div>
          <div className="w-full">
            <Label className={`${openSans.className}`} htmlFor="toEmail">
              Email
            </Label>
            <Input
              id="toEmail"
              type="email"
              value={invoiceData.toEmail}
              onChange={(e) => handleInvoiceUpdate('toEmail', e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label className={`${openSans.className}`} htmlFor="toAddress">
            Address
          </Label>
          <textarea
            id="toAddress"
            className="w-full min-h-[80px] px-3 py-2 border rounded-md bg-cdneutral-white dark:bg-transparent"
            value={invoiceData.toAddress}
            onChange={(e) => handleInvoiceUpdate('toAddress', e.target.value)}
          />
        </div>
      </div>
      {/* Invoice Items */}
      <div className="space-y-2">
        <h3 className="font-semibold">Invoice Items</h3>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="flex flex-wrap gap-2 items-end">
            <div className="flex-grow">
              <Label className={`${openSans.className}`} htmlFor={`item-description-${index}`}>
                Description
              </Label>
              <Input
                id={`item-description-${index}`}
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
              />
            </div>
            <div className="w-20">
              <Label className={`${openSans.className}`} htmlFor={`item-quantity-${index}`}>
                Quantity
              </Label>
              <Input
                id={`item-quantity-${index}`}
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
              />
            </div>
            <div className="w-24">
              <Label className={`${openSans.className}`} htmlFor={`item-unitPrice-${index}`}>
                Unit Price
              </Label>
              <Input
                id={`item-unitPrice-${index}`}
                type="number"
                value={item.unitPrice}
                onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
              />
            </div>
            <div className="w-24">
              <Label className={`${openSans.className}`} htmlFor={`item-discount-${index}`}>
                Discount (%)
              </Label>
              <Input
                id={`item-discount-${index}`}
                type="number"
                value={item.discount}
                onChange={(e) => updateItem(index, 'discount', parseFloat(e.target.value))}
              />
            </div>
            <Button type="button" variant="destructive" onClick={() => removeItem(index)}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <CustomButton
          className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 flex items-center justify-between py-6"
          leftIcon={<Plus className="w-16 h-16" />}
          type="button"
          onClick={addItem}
        >
          <p className="font-clashSemiBold text-[16px]">Add Item</p>
        </CustomButton>
      </div>
    </form>
  );
};

export default InvoiceForm;
