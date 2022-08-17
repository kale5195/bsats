import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';

class ProfileStore {
  token = undefined;
  username = undefined;
  get isLogin() {
    return !!this.token;
  }
  get hasUsername() {
    return !!this.username;
  }
  setToken = (v) => {
    this.token = v;
  };
  setUsername = (v) => {
    this.username = v;
  };
  logout = () => {
    this.token = undefined;
    this.username = undefined;
  };
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: ProfileStore.name,
      properties: ['token', 'username'],
    });
  }
  hydrate = async () => {
    await hydrateStore(this);
  };
}

export default new ProfileStore();
