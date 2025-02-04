'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CustomButton from '@/components/shared/CustomButton';
import { Lock } from 'lucide-react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const handlePasswordChange = () => {
  console.log('Password Changed Successfully');
};

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        hideCloseIcon
        className="sm:max-w-[425px] m-auto w-[95%] dark:text-cdneutral-white text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b]"
      >
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <p className="text-sm text-[#77818A]">Fill details to change Password</p>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Old Password</label>
            <div className="relative">
              <Input
                id="old-password"
                type="password"
                placeholder="Enter old password here"
                className="pr-10"
              />
              <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <div className="relative">
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password here"
                className="pr-10"
              />
              <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm new Password</label>
            <div className="relative">
              <Input
                id="confirm-password"
                type="password"
                placeholder="Re-enter new password"
                className="pr-10"
              />
              <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <CustomButton
            className="bg-transparent text-[#77818A] font-clashLight text-[16px] flex items-center justify-start px-10 border border-[#C5C5C5] py-6 w-fit"
            type="button"
            onClick={onClose}
          >
            Cancel
          </CustomButton>
          <CustomButton
            className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 text-white font-clashLight text-[16px] flex items-center justify-start px-10 py-6 w-fit"
            type="button"
            onClick={handlePasswordChange}
          >
            Change
          </CustomButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
