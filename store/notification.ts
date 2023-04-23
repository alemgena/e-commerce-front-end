import { createSlice } from '@reduxjs/toolkit';
let notificationCount;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  notificationCount = localStorage.getItem('notificatioCount')!;
}
const notification = createSlice({
  name: 'notification',
  initialState: {
    notificationCount: notificationCount,
  },
  reducers: {
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
  },
});
export const notificationAction = notification.actions;
export default notification.reducer;
