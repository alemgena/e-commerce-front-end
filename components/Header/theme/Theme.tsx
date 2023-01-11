import React from 'react';
import { BiMoon } from 'react-icons/bi';
import { MdOutlineLightMode } from 'react-icons/md';
import { useTheme } from 'next-themes';

import ThemeItem from './ThemeItem';

function Theme() {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const renderThemeChanger = () => {
    if (currentTheme === 'dark') {
      return <ThemeItem theme="light" Icon={MdOutlineLightMode} />;
    }
    return <ThemeItem theme="dark" Icon={BiMoon} />;
  };

  return (
    <div className="p-1 md:ltr:ml-1 md:rtl:ml-1">
      <div className="md:hidden">
        <h3>theme</h3>
        <div className="z-10 mt-2 ml-1">
          <ThemeItem
            theme="light"
            Icon={MdOutlineLightMode}
            currentTheme={currentTheme}
          />
          <ThemeItem theme="dark" Icon={BiMoon} currentTheme={currentTheme} />
        </div>
      </div>
      <div className="hidden md:block">{renderThemeChanger()}</div>
    </div>
  );
}

export default Theme;
