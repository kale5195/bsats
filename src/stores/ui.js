import { Appearance } from 'react-native';
import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';

export class UIStore {
  appearance = 'auto'; // light auto dark
  homeTab = 1;
  systemColor = Appearance.getColorScheme();

  setAppearanceMode = (v) => {
    this.appearance = v;
  };

  setHomeTab = (i) => {
    this.homeTab = i;
  };

  setSystemColor = (v) => {
    this.systemColor = v;
  };

  get themeColor() {
    if (this.appearance == 'auto') {
      return this.systemColor;
    }
    return this.appearance;
  }

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'uiStore',
      properties: ['appearance', 'homeTab'],
    });
  }
  hydrate = async () => {
    await hydrateStore(this);
  };
}
