import { configureStore, isAnyOf } from "@reduxjs/toolkit";

import { Chat, Role } from "@/types";
import * as idb from "@/utils/indexedDB";

import chatsReducer, {
    selectAllChats,
    removeOne,
    removeAll,
    addSingleMessage,
    updateSingleMessage,
    updateTitle,
    deleteMessageUpTo,
    setOne,
} from "./chatsSlice";
import { listenerMiddleware, startAppListening } from "./listenerMiddleware";
import rolesReducer, {
    setOneRole,
    updateOneRole,
    removeOneRole,
    removeAllRoles,
    selectAllRoles,
} from "./rolesSlice";
import settingReducer from "./settingSlice";
import uiReducer from "./uiSlice";

/** Update chats in IndexedDB.
The effect function checks if the action type is "chats/removeAll", and if it is, it deletes all chats from IndexedDB. If the action type is anything else, it retrieves all chats from the app's state, filters out any chats with no messages, and saves the remaining chats to IndexedDB.
 */
startAppListening({
    matcher: isAnyOf(
        setOne,
        removeOne,
        removeAll,
        addSingleMessage,
        updateSingleMessage,
        updateTitle,
        deleteMessageUpTo
    ),

    effect: async (action, listenerApi) => {
        if (action.type === "chats/removeAll") {
            await idb.del("chats");
        }
        // else if (action.type === 'chats/setOne') {
        //     //
        // }
        else {
            const chats: Chat[] = selectAllChats(store.getState());
            const chatsToSave: Chat[] = [];
            for (const chatID in chats) {
                if (chats[chatID].messages.length > 0) {
                    chatsToSave.push(chats[chatID]);
                }
                await idb.set("chats", chatsToSave);
            }
        }
    },
});

// Update roles in IndexedDB.

startAppListening({
    matcher: isAnyOf(setOneRole, updateOneRole, removeOneRole, removeAllRoles),

    effect: async (action, listenerApi) => {
        if (action.type === "roles/removeAll") {
            await idb.del("roles");
        } else {
            const roles: Role[] = selectAllRoles(store.getState());
            await idb.set("roles", roles);
        }
    },
});

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        setting: settingReducer,
        chats: chatsReducer,
        roles: rolesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Update setting in localStorage
store.subscribe(() => {
    localStorage.setItem("setting", JSON.stringify(store.getState().setting));
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
