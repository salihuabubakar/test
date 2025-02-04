import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { StringNull } from "@/types";

const useSuccess = (message: StringNull, messageHandler: () => void) => {
  const clearMessage = useRef(() => {});

  clearMessage.current = messageHandler;

  useEffect(() => {
    if (message) {
      toast.success(message);
      clearMessage.current();
    }
  }, [message]);
};

export default useSuccess;
