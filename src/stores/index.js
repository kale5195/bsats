import React from 'react';

import './_hydration';
import { PostStore } from './post';
import { ProfileStore } from './profile';
import { UIStore } from './ui';

class Stores {
  uiStore = new UIStore();
  profileStore = new ProfileStore();
  postStore = new PostStore();
}

export const stores = new Stores();

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
