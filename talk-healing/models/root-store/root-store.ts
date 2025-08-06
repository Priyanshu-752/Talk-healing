import { UserStore } from '@/models/modules/user/store';
import { Instance, SnapshotOut, types } from 'mobx-state-tree';
export const RootStore = types.model('RootStore').props({
    userStore: types.optional(UserStore, {} as any),
    });