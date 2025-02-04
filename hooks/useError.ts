import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { StringNull } from "@/types";

const useError = (error: StringNull, errorHandler: () => void) => {
  const clearError = useRef(() => {});

  clearError.current = errorHandler;

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError.current();
    }
  }, [error]);
};

export default useError;
