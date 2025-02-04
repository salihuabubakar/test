import React from 'react';
import { NoData } from '@/assets';
import Image from 'next/image';

export default function NoDataRecord() {
  return (
    <div className="flex items-center justify-center h-full">
      <Image src={NoData} alt="no data image" />
    </div>
  )
}
