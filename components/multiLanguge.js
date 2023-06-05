import React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import i18next from 'i18next';
import axios from 'axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const languageMap = {
  en: { label: 'Eng', },
  am: { label: 'አማርኛ',},
  om: { label: 'Oromipha', },
  so: { label: 'Somali' },
  ti: { label: 'Tigreghna', },
  //Oromipha
};
const LanguageSelect = () => {
  const selected = 'en';
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [selectLable, setSelectLable] = React.useState(null);
  const selectedLabel = (label) => {
    setSelectLable(languageMap[label].label);
  };
  return (
    <div className="d-flex justify-content-end align-items-center language-select-root">
      <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
        {selectLable?selectLable:"English"}
        <ArrowDropDownIcon fontSize="small" />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div>
          <List>
            {/* <ListSubheader>{t("select_language")}</ListSubheader> */}
            {Object.keys(languageMap)?.map((item) => (
              <ListItemButton
                key={item}
                onClick={() => {
                  i18next.changeLanguage(item);
                  setMenuAnchor(null);
                  selectedLabel(item);
                }}
              >
                {languageMap[item].label}
              </ListItemButton>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelect;
