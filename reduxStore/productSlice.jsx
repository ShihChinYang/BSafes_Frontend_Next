import { createSlice } from '@reduxjs/toolkit';
import { debugLog } from '../lib/helper';
import { putS3Object } from '../lib/s3Helper';

const debugOn = false;
const ITEM_VERSIONS_BACKUP_FEATURE = true;

const initialState = {
    currentProduct: "",
    signedUrlForBackup: null,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        },
        setSignedUrlForBackup: (state, action) => {
            if(!ITEM_VERSIONS_BACKUP_FEATURE) return;
            if (action.payload !== null) {
                const signedUrlForBackup = action.payload;
                signedUrlForBackup.expiration = Date.now() + (signedUrlForBackup.expiresIn - 600) * 1000;
                state.signedUrlForBackup = signedUrlForBackup;
            } else {
                state.signedUrlForBackup = null;
            }
        }
    }
})


export const { setCurrentProduct, setSignedUrlForBackup } = productSlice.actions;
export const productReducer = productSlice.reducer;

export const backupAnItemVersionToS3 = (item, dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!ITEM_VERSIONS_BACKUP_FEATURE) {
                resolve();
                return;
            }
            const productState = getState().product;
            let signedUrlForBackup = productState.signedUrlForBackup;

            const s3Key = signedUrlForBackup.s3Key;
            const signedURL = signedUrlForBackup.url;

            const config = {
                onUploadProgress: async (progressEvent) => {
                    let percentCompleted = Math.ceil(progressEvent.loaded * 100 / progressEvent.total);
                    debugLog(debugOn, `Upload progress: ${progressEvent.loaded}/${progressEvent.total} ${percentCompleted} `);

                },
                headers: {
                    'Content-Type': 'binary/octet-stream'
                }
            }
            dispatch(setSignedUrlForBackup(null));
            await putS3Object(s3Key, signedURL, JSON.stringify(item), config, dispatch);
            resolve();
        } catch (error) {
            debugLog(debugOn, "backupAnItemVersionToS3 failed: ", error);
            reject("backupAnItemVersionToS3 error.");
        }
    });
}

export default productSlice;