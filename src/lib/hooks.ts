import { useContext, useEffect, useState } from "react";

import { useQueries, useQuery } from "@tanstack/react-query";

import { type ExtendedJobItem, type JobItem } from "./types";
import { BASE_API_URL } from "./constants";
import { handleError } from "./utils";
import { BookmarkContext } from "@/contexts/BookmarksContextProvider";

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

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchExtendedJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined) as ExtendedJobItem[];
  const isLoading = results.some((result) => result.isLoading);

  return { jobItems, isLoading };
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

export function useSearchQuery(searchText: string) {
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

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

// ----------------------

export function useBookmarkContext() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error(
      "useBookmarkContext must be used within a BookmarkContextProvider"
    );
  }

  return context;
}

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        handler();
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.addEventListener("click", handleClick);
    };
  }, [refs, handler]);
}
