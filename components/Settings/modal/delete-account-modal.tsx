'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import CustomButton from '@/components/shared/CustomButton';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        hideCloseIcon
        className="sm:max-w-[425px] m-auto w-[95%] dark:text-cdneutral-white text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b]"
      >
        <p className=" flex flex-col text-center py-4">
          <span className="text-red-500">Delete my CashDime Account</span>
          Are you sure you want to delete your Account as this action cannot be reversed?
        </p>
        <div className="flex justify-center gap-4">
          <CustomButton
            className="bg-transparent text-[#77818A] font-clashLight text-[16px] flex items-center justify-start px-10 border border-[#C5C5C5] py-6 w-fit"
            type="button"
          >
            Yes
          </CustomButton>
          <CustomButton
            onClick={onClose}
            className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 text-white font-clashMedium text-[16px] flex items-center justify-start px-10 py-6 w-fit"
            type="button"
          >
            No
          </CustomButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
