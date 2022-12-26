import { NavItems } from './nav-items';
import { SearchBar } from './search-bar';

export const Header = () => {
  return (
    <div className="flex w-full items-center justify-between bg-white px-12 py-3">
      <div className="flex items-center gap-16">
        <img src="/images/logo.svg" className="h-14 w-16" />
        <SearchBar />
      </div>
      <NavItems />
    </div>
  );
};
