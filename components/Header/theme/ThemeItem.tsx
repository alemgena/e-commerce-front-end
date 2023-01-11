/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
import React from 'react';
import { IconType } from 'react-icons';
import { useTheme } from 'next-themes';

interface Props {
  theme: string;
  currentTheme?: string;
  Icon: IconType;
}
const ThemeItem: React.FC<Props> = ({ theme, Icon, currentTheme }) => {
  const { setTheme } = useTheme();

  function onThemeClickHandler() {
    setTheme(theme);
  }

  return (
    <div
      className={`flex items-center justify-start py-1 ${
        currentTheme && currentTheme === theme ? 'font-bold' : ''
      }`}
      onClick={onThemeClickHandler}
    >
      <button className="border-none" aria-label="theme-toggle" role="button">
        <Icon
          style={{
            fontSize: '1.3rem',
            filter: 'drop-shadow(0px 0px 5px rgb(0 0 0 / 0.3))',
          }}
        />
      </button>
      <h4 className="ltr:ml-3 rtl:mr-3 md:hidden">{`${theme}`}</h4>
    </div>
  );
};

export default ThemeItem;
