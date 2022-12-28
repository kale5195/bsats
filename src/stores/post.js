import _ from 'lodash';
import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';

export class PostStore {
  historyPosts = [];
  favPosts = [];

  upvotedPosts = {};

  addHistoryPost = (v) => {
    const item = {
      ...v,
      createTime: Date.now(),
    };
    this.historyPosts = _.filter(this.historyPosts, (t) => t.pid !== item.pid)
      .concat(item)
      .sort((a, b) => b.createTime - a.createTime);
  };

  toggleFavPosts = (v) => {
    if (_.find(this.favPosts, { pid: v.pid })) {
      this.favPosts = _.filter(this.favPosts, (t) => t.pid !== v.pid);
    } else {
      const item = {
        ...v,
        createTime: Date.now(),
      };
      this.favPosts = this.favPosts.concat(item).sort((a, b) => b.createTime - a.createTime);
    }
  };

  isFavPost = (pid) => {
    return _.find(this.favPosts, { pid });
  };

  clearHistoryPosts = () => {
    this.historyPosts = [];
    this.favPosts = [];
  };

  setUpvotedPosts = (id, value) => {
    this.upvotedPosts[id] = value;
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: 'postStore',
      properties: ['historyPosts', 'favPosts'],
    });
  }
  hydrate = async () => {
    await hydrateStore(this);
  };
}
