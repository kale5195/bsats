import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';

export class ProfileStore {
  token = undefined;
  username = undefined;
  lastCheckedNotifications = 0;
  get isLogin() {
    return !!this.token && !!this.username;
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
    this.lastCheckedNotifications = 0;
  };

  checkedNotifcation = () => {
    this.lastCheckedNotifications = Date.now();
  };

  get shouldNotify() {
    return Date.now() - this.lastCheckedNotifications >= 1000 * 6;
  }
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: 'profileStore',
      properties: ['token', 'username', 'lastCheckedNotifications'],
    });
  }
  hydrate = async () => {
    await hydrateStore(this);
  };
}
