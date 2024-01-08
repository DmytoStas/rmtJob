import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { type ExtendedJobItem, type JobItem } from "./types";
import { BASE_API_URL } from "./constants";
import { handleError } from "./utils";

type ExtendedJobItemAPIResponce = {
  public: boolean;
  jobItem: ExtendedJobItem;
};

const fetchExtendedJobItem = async (
  id: number
): Promise<ExtendedJobItemAPIResponce> => {
  const res = await fetch(`${BASE_API_URL}/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }

  return await res.json();
};

export function useExtendedJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchExtendedJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.addEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

type JobItemsAPIResponce = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsAPIResponce> => {
  const res = await fetch(`${BASE_API_URL}?search=${searchText}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }

  return await res.json();
};

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );

  return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
