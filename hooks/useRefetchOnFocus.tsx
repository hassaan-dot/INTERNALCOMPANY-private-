import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useModalStore } from "@/store/useModalStore";

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const { setFilters } = useModalStore();
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      setFilters({ page: 1, pageSize: 25 });
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );
}
