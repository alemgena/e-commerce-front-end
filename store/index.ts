import { configureStore } from '@reduxjs/toolkit';

import activeMenuItemReducer from './activeMenuItem-slice';
import megaMenuReducer from './megaMenu-slice';

const store = configureStore({
  reducer: {
    activeMenuItem: activeMenuItemReducer,
    megaMenu: megaMenuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
