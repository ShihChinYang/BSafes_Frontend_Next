import { createSlice } from '@reduxjs/toolkit';

const forge = require('node-forge');
const argon2 = require('argon2-browser');

import { debugLog, PostCall, clearLocalData } from '../lib/helper'
import { decryptBinaryString, saveLocalCredentials, clearLocalCredentials } from '../lib/crypto';
import { v1AccountActivity } from '../lib/activities';

import { setDisplayName, loggedIn, loggedOut, setAccountVersion, cleanMemoryThunk} from './auth';

const debugOn = false;

const initialState = {
    activity: 0,  
    activityErrors: 0,
    activityErrorMessages: {},
    nickname: "",
    masterId: "",
    displayMasterId: "",
    nextAuthStep: null,
    keyMeta: null,
}

const v1AccountSlice = createSlice({
    name: "v1Account",
    initialState: initialState,
    reducers: {
        cleanV1AccountSlice: (state, action) => {
            const stateKeys = Object.keys(initialState);
            for(let i=0; i<stateKeys.length; i++) {
                let key = stateKeys[i];
                state[key] = initialState[key];
            }
        },
        resetV1AccountActivity: (state, action) => {
            state.activity = 0,
            state.activityErrors = 0,
            state.activityErrorCodes = { };
        },
        activityStart: (state, action) => {
            state.activityErrors &= ~action.payload;
            state.activityErrorMessages[action.payload]='';
            state.activity |= action.payload;
        },
        activityDone: (state, action) => {
            state.activity &= ~action.payload;
        },
        activityError: (state, action) => {
            state.activity &= ~action.payload.type;
            state.activityErrors |= action.payload.type;
            state.activityErrorMessages[action.payload.type] = action.payload.error;
        },
        nicknameResolved: (state, action) => {
            state.nickname = action.payload.nickname;
            state.masterId = action.payload.masterId;
            state.displayMasterId = action.payload.displayMasterId;
        },
        setNextAuthStep: (state, action) => {
            state.nextAuthStep = action.payload;
        },
        setKeyMeta: (state, action) => {
            state.keyMeta = action.payload;
        },
        signedOut: (state, action) => {
            const stateKeys = Object.keys(initialState);
            for(let i=0; i<stateKeys.length; i++) {
                let key = stateKeys[i];
                state[key] = initialState[key];
            }
        }
    }
});

export const { cleanV1AccountSlice, resetV1AccountActivity, activityStart, activityDone, activityError, nicknameResolved, setNextAuthStep, setKeyMeta, signedOut } = v1AccountSlice.actions;

const newActivity = async (dispatch, type, activity) => {
    dispatch(activityStart(type));
    try {
        await activity();
        dispatch(activityDone(type));
    } catch(error) {
        dispatch(activityError({type, error}));
    }
}

export const v1AccountReducer = v1AccountSlice.reducer;

export const nicknameSignInAsyncThunk = (data) => async (dispatch, getState) => {
    newActivity(dispatch, v1AccountActivity.NicknameSignIn, () => {
        return new Promise(async (resolve, reject) => {
            const nickname = data.nickname;
            PostCall({
                api:'/nicknameSignIn',
                body: {nickname},
                dispatch
            }).then( data => {
                debugLog(debugOn, data);
                if(data.status !== 'ok') {
                    debugLog(debugOn, "woo... failed to resolve nickname.")
                    reject("NicknameSignInError");
                    return;
                }    
                const masterId = data.masterId;
                const displayMasterId = data.displayMasterId;
                debugLog(debugOn, "nickname resolved.")
                dispatch(nicknameResolved({nickname, masterId, displayMasterId}));
                resolve();
            }).catch( error => {
                debugLog(debugOn, "nicknameSignIn failed: ", error)
                reject("Failed to sign in with nickname.");
            })
        });s
    })
}

export const authenticateManagedMemberAsyncThunk = (data) => async (dispatch, getState) => {
    newActivity(dispatch, v1AccountActivity.AuthenticateManagedMember, () => {
        return new Promise(async (resolve, reject) => {
            const masterId = data.masterId;
            const memberName = forge.util.encodeUtf8(data.memberName);
            const password = data.password;

            const username = 'm' + ':' + masterId + ':' + memberName;

            PostCall({
                api:'/authenticateManagedMember',
                body: {
                    masterId,
                    username,
                    password
                },
                dispatch
            }).then( data => {
                debugLog(debugOn, data);
                if(data.status !== 'ok') {
                    debugLog(debugOn, "Failed to authenticate.")
                    reject('Failed to authenticate.');
                    return;
                }    
                
                localStorage.setItem("authToken", data.authToken);
                dispatch(setAccountVersion('v1'));
                if(data.nextStep.keyMeta){
                    dispatch(setDisplayName(data.nextStep.keyMeta.displayName));
                    dispatch(setKeyMeta(data.nextStep.keyMeta));
                }
                localStorage.setItem("authState", data.nextStep.step);
                dispatch(setNextAuthStep(data.nextStep)); 
                resolve();
            }).catch( error => {
                debugLog(debugOn, "AuthenticateManagedMember failed: ", error)
                reject('Failed to authenticate.');
            })
        });
    });
}

export const verifyMFAAsyncThunk = (data) => async (dispatch, getState) => {
    newActivity(dispatch, v1AccountActivity.VerifyMFA, () => {
        return new Promise(async (resolve, reject) => {
            const token = data.MFAToken;

            PostCall({
                api:'/verifyMFAToken',
                body: {
                    token
                },
                dispatch
            }).then( data => {
                debugLog(debugOn, data);
                if(data.status !== 'ok') {
                    debugLog(debugOn, "woo... failed to verify MFA.")
                    reject('Failed to verify MFA.');
                    return;
                }    
                localStorage.setItem("MFAPassed", 'true');
                
                if(data.nextStep.keyMeta){
                    dispatch(setDisplayName(data.nextStep.keyMeta.displayName));
                    dispatch(setKeyMeta(data.nextStep.keyMeta));
                }
                localStorage.setItem("authState", data.nextStep.step);
                dispatch(setNextAuthStep(data.nextStep)); 
                resolve();
            }).catch( error => {
                debugLog(debugOn, "verifyMFAToken failed: ", error)
                reject('Failed to verify MFA.');
            })
        })
    });
}

export const verifyKeyHashAsyncThunk = (data) => async (dispatch, getState) => {
    newActivity(dispatch, v1AccountActivity.VerifyKeyHash, () => {
        return new Promise(async (resolve, reject) => {
            const credentials = {
                secret:{},
                keyPack:{}
            };
            const goldenKey = data.key; 
            const state = getState().v1Account;
            const keySalt = forge.util.decode64(state.keyMeta.keySalt); 
            let expandedKey; 

            if(state.keyMeta.schemeVersion === '0') {
                expandedKey = forge.pkcs5.pbkdf2(goldenKey, keySalt, 10000, 32);
            } else {
                const result= await argon2.hash({
                    pass: goldenKey, 
                    salt: keySalt,
                    time: 2,
                    mem: 100 * 1024,
                    hashLen: 32,
                    parallelism: 2,
                    type: argon2.ArgonType.Argon2id
                })
                const expandedKeyHex = result.hashHex;
                expandedKey = forge.util.hexToBytes(expandedKeyHex); 
            }
            credentials.secret.expandedKey = expandedKey;

            const md = forge.md.sha256.create();
            md.update(expandedKey);
            const keyHash = md.digest().toHex();
            PostCall({
                api:'/memberAPI/verifyV1KeyHash',
                body: {
                    keyHash
                },
                dispatch
            }).then( data => {
                debugLog(debugOn, data);
                
                if(data.status !== 'ok') {
                    debugLog(debugOn, "woo... failed to verify keyHash.")
                    reject('Failed to verify key hash.');
                    return;
                }    
                
                function verifyV1Challenge() {
                    let randomMessage = data.randomMessage;
                    randomMessage = forge.util.encode64(randomMessage);
                    
                    credentials.keyPack.publicKey = forge.util.encode64(data.publicKey);
                    credentials.keyPack.privateKeyEnvelope = data.privateKeyEnvelope;
                    credentials.keyPack.envelopeIV = data.envelopeIV;
                    credentials.keyPack.searchKeyEnvelope = data.searchKeyEnvelope;
                    credentials.keyPack.searchKeyIV = data.searchKeyIV;

                    const envelopeIV = forge.util.decode64(data.envelopeIV);
                    let privateKey = forge.util.decode64(data.privateKeyEnvelope);
                    privateKey = decryptBinaryString(privateKey, expandedKey, envelopeIV);
                    
                    const pki = forge.pki;
                    const privateKeyFromPem = pki.privateKeyFromPem(privateKey);
                    const md = forge.md.sha1.create();
                    md.update(randomMessage, 'utf8');
                    let signature = privateKeyFromPem.sign(md);
                    signature = forge.util.encode64(signature);

                    PostCall({
                        api:'/memberAPI/verifyV1Challenge',
                        body: { signature },
                        dispatch
                    }).then( data => {
                        if(data.status == "ok") {  
                            credentials.memberId = data.memberId;
                            credentials.displayName = data.displayName;
                            debugLog(debugOn, `challenge passed`)
                            localStorage.setItem("authState", "Unlocked");
                            saveLocalCredentials(credentials, data.sessionKey, data.sessionIV, 'v1');
                            dispatch(setNextAuthStep(null));
                            dispatch(loggedIn({sessionKey: data.sessionKey, sessionIV: data.sessionIV}))
                            resolve();
                        } else {
                            debugLog(debugOn, "woo... failed to verify challenge: ", data.error);
                            reject("Challenge failed.");
                        }
                    }).catch( error => {
                        debugLog(debugOn, "woo... failed to verify challenge.");
                        reject("Challenge failed.");
                    })
                } 
                    
                verifyV1Challenge();
            }).catch( error => {
                debugLog(debugOn, "verifyKeyHash failed: ", error)
                reject('Failed to verify key hash.');
            })
        });
    });

}

export const lockAsyncThunk = (data) => async (dispatch, getState) => {
    newActivity(dispatch, v1AccountActivity.Lock, () => {
        return new Promise(async (resolve, reject) => {
            clearLocalCredentials('v1');
            dispatch(loggedOut());
            localStorage.setItem("authState", null);
            dispatch(cleanMemoryThunk());
            PostCall({
                api:'/memberAPI/lock',
                dispatch
            }).then( data => {
                if(data.status !== 'ok') {
                    debugLog(debugOn, "woo... failed to lock.")
                    reject('Failed to lock.');
                    return;
                }    
                localStorage.setItem("authState", data.nextStep.step);
                dispatch(setNextAuthStep(data.nextStep));
                resolve();
            }).catch( error => {
                debugLog(debugOn, "lock failed: ", error)
                reject('Failed to lock.');
            }) 
        })
    })
}

export const signOutAsyncThunk = (data) => async (dispatch, getState) => {
    newActivity(dispatch, v1AccountActivity.SignOut, () => {
        return new Promise(async (resolve, reject) => {
            
            dispatch(signedOut());
            dispatch(loggedOut());

            PostCall({
                api:'/memberAPI/signOut',
                dispatch
            }).then( data => {
                if(data.status !== 'ok') {
                    debugLog(debugOn, "woo... failed to signout.")
                    reject('Failed to sign out.');
                    return;
                }    
                dispatch(setNextAuthStep(null));
                resolve();
            }).catch( error => {
                debugLog(debugOn, "lock failed: ", error)
                reject('Failed to sign out.');
            }) 
            clearLocalData();
            dispatch(cleanMemoryThunk());
        })
    })
}

export default v1AccountSlice;