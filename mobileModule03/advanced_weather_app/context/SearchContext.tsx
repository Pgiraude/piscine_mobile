import { createContext, useContext, useState, ReactNode } from "react";

type SearchContextType = {
  searchText: string;
  setSearchText: (text: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
