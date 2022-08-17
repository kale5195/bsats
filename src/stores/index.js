import React from 'react';
import './_hydration';
import UIStore from './ui';
import ProfileStore from './profile';
import PostStore from './post';

export const stores = {
  uiStore: UIStore,
  profileStore: ProfileStore,
  postStore: PostStore,
};

const storeContext = React.createContext(stores);
export const StoresProvider = ({ children }) => (
  <storeContext.Provider value={stores}>{children}</storeContext.Provider>
);

export const useStores = () => React.useContext(storeContext);

export const hydrateStores = async () => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const s = stores[key];
      if (s.hydrate) {
        await s.hydrate();
      }
    }
  }
};
