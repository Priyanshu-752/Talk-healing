import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserStore } from "@/models/modules/user/store"
import { CommunityStore } from '../modules/communities/store';
// import { NotificationStore } from "@/models/modules/notification/store"
// import { GlobalsStore } from "@/models/modules/globals/store"
// import { DashboardStore } from "../modules/dashboard/store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    userStore: types.optional(UserStore, {} as any),
    communityStore: types.optional(CommunityStore, {} as any),
    // dashboardStore: types.optional(DashboardStore, {} as any), 
    // globalsStore: types.optional(GlobalsStore, {} as any),
    // notificationStore: types.optional(NotificationStore, {} as any),
    
   
    // commentStore: types.optional(CommentStore, {} as any), // Assuming replyStore is similar to submissionStore
})
/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
