"use client"

import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomButton from "@/components/shared/CustomButton";
import { AddTeam } from "@/assets";
import Image from "next/image";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMemberModal = ({  isOpen, onClose }: AddMemberModalProps)  => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[425px] m-auto w-[95%] dark:text-cdneutral-white text-cdneutral-black bg-cdneutral-white dark:bg-[#09090b]"
      >
        <DialogHeader className="items-center text-center">
          <div className="mx-auto mb-4 rounded-full p-3">
            <Image src={AddTeam} width={100} height={100} alt="Add team"/>
          </div>
          <DialogTitle>Add team members</DialogTitle>
          <DialogDescription className="text-center">
            Add team members to manage the monitoring of activities on the dashboard
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="ademola@gmail.com"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <CustomButton
            className="bg-gradient-to-r from-cdsecondary-100 to-cdprimary-100 text-white font-clashLight text-[16px] flex items-center justify-start px-10 py-6 w-fit"
            type="button"
          >
            Add
          </CustomButton>
        </div>
      </DialogContent>
    </Dialog>
  )
};

export default AddMemberModal;
