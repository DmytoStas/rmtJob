import { createContext } from "react";

import { useLocalStorage } from "@/lib/hooks";
import { type TChildren } from "@/lib/types";

type BookmarkContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
};

export const BookmarkContext = createContext<BookmarkContext | null>(null);

export default function BookmarksContextProvider({ children }: TChildren) {
  const [bookmarkedIds, setBookmarkedIts] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

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
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
