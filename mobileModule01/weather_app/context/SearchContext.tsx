import { createContext, useContext, useState } from "react";

const SearchContext = createContext<{
  searchText: string;
  setSearchText: (text: string) => void;
}>({
  searchText: "",
  setSearchText: () => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
