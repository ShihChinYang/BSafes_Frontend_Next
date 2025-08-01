import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import accountSlice, {accountReducer} from './accountSlice';
import scriptsSlice, { scriptsReducer } from './scriptsSlice';
import stylesheetsSlice, { stylesheetsReducer } from './stylesheetsSlice';
import authSlice, {authReducer} from './auth';
import containerSlice, {containerReducer} from './containerSlice';
import pageSlice, {pageReducer} from './pageSlice';
import teamSlice, {teamReducer} from './teamSlice';
import v1AccountSlice, { v1AccountReducer } from './v1AccountSlice';
import productSlice, {productReducer} from './productSlice';


const reduxStore = configureStore({
    reducer: {
        [stylesheetsSlice.name]: stylesheetsReducer,
        [scriptsSlice.name]: scriptsReducer,
        [authSlice.name]: authReducer,
        [containerSlice.name]: containerReducer,
        [pageSlice.name]: pageReducer,
        [teamSlice.name]: teamReducer,
        [v1AccountSlice.name]: v1AccountReducer,
        [accountSlice.name]:accountReducer,
        [productSlice.name]:productReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['page/addImages', 'page/imageUploaded', 'page/setAbortController'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.files', 'payload.img', 'payload.buffer', 'payload.xhr', 'payload.writer', 'payload.stripePromise', 'payload.content', 'payload.item.content'],
        // Ignore these paths in the state
        ignoredPaths: ['page.videosUploadQueue', 'page.videoPanels', 'page.audiosUploadQueue', 'page.audioPanels', 'page.imageUploadQueue', 'page.imagePanels', 'page.attachmentsUploadQueue', 'page.attachmentPanels', 'page.abortController', 'page.xhr', 'page.writer', 'scripts.stripePromise', 'page.content', 'page.originalContent','page.error'],
      },
    }),
})

const createStore = () => reduxStore;

export const reduxWrapper = createWrapper(createStore);

export default reduxStore;