'use client';

import { Provider } from 'react-redux';
import { store } from '../store/index';
import { useEffect } from 'react';
import { fetchMe } from '../features/authSlice';

export default function StoreProvider({ children }) {
  useEffect(() => {
    store.dispatch(fetchMe());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
