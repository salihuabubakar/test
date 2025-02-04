import {
  Template1,
  Template2,
  Template3,
  Template4,
  Template5,
  Template6,
  Template7,
  Template8,
  Template9,
  Template10,
  Template11,
  Template12,
} from '@/assets';
import BusinessOne from '@/components/Business/BusinessOne';
import BusinessThree from '@/components/Business/BusinessThree';
import BusinessTwo from '@/components/Business/BusinessTwo';
import InvoiceOne from '@/components/Freelancer/InvoiceOne';
import InvoiceThree from '@/components/Freelancer/InvoiceThree';
import InvoiceTwo from '@/components/Freelancer/InvoiceTwo';
import CommercialOne from '@/components/Commercial/CommercialOne';
import CommercialTwo from '@/components/Commercial/CommercialTwo';
import ContractorOne from '@/components/Contractor/ContractorOne';
import ContractorTwo from '@/components/Contractor/ContractorTwo';
import CateringTwo from '@/components/Catering/CateringTwo';
import CateringOne from '@/components/Catering/CateringOne';
import React from 'react';
import { InvoiceData } from '@/types/invoiceData';

export type TabName =
  | 'All'
  | 'Freelancer'
  | 'Business'
  | 'Commercial'
  | 'Contractor'
  | 'Catering Services';

export interface LinksProps {
  templateId: string;
  alt: string;
  imgSrc: string;
  component: React.ForwardRefExoticComponent<InvoiceData & React.RefAttributes<HTMLDivElement>>;
}

export const tabs: TabName[] = [
  'All',
  'Freelancer',
  'Business',
  'Commercial',
  'Contractor',
  'Catering Services',
];

export const links: LinksProps[] = [
  {
    templateId: '1',
    alt: 'Freelancer',
    imgSrc: Template1,
    component: InvoiceOne,
  },
  {
    templateId: '2',
    alt: 'Freelancer',
    imgSrc: Template2,
    component: InvoiceTwo,
  },
  {
    templateId: '3',
    alt: 'Freelancer',
    imgSrc: Template3,
    component: InvoiceThree,
  },
  {
    templateId: '4',
    alt: 'Business',
    imgSrc: Template4,
    component: BusinessOne,
  },
  {
    templateId: '5',
    alt: 'Business',
    imgSrc: Template5,
    component: BusinessTwo,
  },
  {
    templateId: '6',
    alt: 'Business',
    imgSrc: Template6,
    component: BusinessThree,
  },
  {
    templateId: '7',
    alt: 'Commercial',
    imgSrc: Template7,
    component: CommercialOne,
  },
  {
    templateId: '8',
    alt: 'Commercial',
    imgSrc: Template8,
    component: CommercialTwo,
  },
  {
    templateId: '9',
    alt: 'Contractor',
    imgSrc: Template9,
    component: ContractorOne,
  },
  {
    templateId: '10',
    alt: 'Contractor',
    imgSrc: Template10,
    component: ContractorTwo,
  },
  {
    templateId: '11',
    alt: 'Catering Services',
    imgSrc: Template11,
    component: CateringOne,
  },
  {
    templateId: '12',
    alt: 'Catering Services',
    imgSrc: Template12,
    component: CateringTwo,
  },
];

export function getInvoiceById(id: string): LinksProps | undefined {
  return links.find((link) => link.templateId === id);
}
