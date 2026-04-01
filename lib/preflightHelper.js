import { clearLocalData } from "./helper";
import { clearLocalCredentials } from "./crypto";
import { setAccountState } from "../reduxStore/accountSlice";
import { setAccountVersion, setDisplayName, loggedIn, loggedOut, setFroalaLicenseKey, setClientEncryptionKey, setPreflightReady } from '../reduxStore/auth';
import { setNextAuthStep, setKeyMeta } from '../reduxStore/v1AccountSlice';

export function processPreflightResponse(data, dispatch, combinedPreflight = false) {
    if (data.status === 'ok') {
        dispatch(setAccountVersion(data.accountVersion));
        if (data.nextStep) {
            localStorage.setItem("authState", data.nextStep.step);
            if (data.nextStep.keyMeta) {
                dispatch(setDisplayName(data.nextStep.keyMeta.displayName));
                dispatch(setKeyMeta(data.nextStep.keyMeta));
            }
            if (data.idleTimeout) {
                if (data.accountVersion === 'v1') {
                    clearLocalCredentials('v1');
                } else {
                    clearLocalData();
                    dispatch(loggedOut());
                }
                dispatch(setNextAuthStep(data.nextStep))
            }
        } else {
            dispatch(loggedIn({ sessionKey: data.sessionKey, sessionIV: data.sessionIV, froalaLicenseKey: data.froalaLicenseKey, stripePublishableKey: data.stripePublishableKey }));
            dispatch(setAccountState({ accountState: data.accountState, nextDueTime: data.nextDueTime }));
        }
    } else {
        clearLocalData();
        dispatch(loggedOut());
        dispatch(setFroalaLicenseKey({ froalaLicenseKey: data.froalaLicenseKey }))
    }
    dispatch(setClientEncryptionKey(data.clientEncryptionKey));
    if (!combinedPreflight) {
        dispatch(setPreflightReady(true));
    }
    return {status: data.status};
}