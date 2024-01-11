import { createContext, useEffect, useState } from "react";

import { useJobItems } from "@/lib/hooks";
import {
  type JobItemId,
  type ExtendedJobItem,
  type TChildren,
} from "@/lib/types";

type BookmarkContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: ExtendedJobItem[];
  isLoading: boolean;
};

export const BookmarkContext = createContext<BookmarkContext | null>(null);

export default function BookmarksContextProvider({ children }: TChildren) {
  const [bookmarkedIds, setBookmarkedIts] = useState<JobItemId[]>(() =>
    JSON.parse(localStorage.getItem("bookmarkedJobItemIds") || "[]")
  );

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);

  useEffect(() => {
    localStorage.setItem("bookmarkedJobItemIds", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIts((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIts((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
