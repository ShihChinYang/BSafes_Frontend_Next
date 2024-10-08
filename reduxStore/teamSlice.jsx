import { createSlice } from '@reduxjs/toolkit';

const forge = require('node-forge');

import { encryptBinaryString, encryptBinaryStringCBC, decryptBinaryStringCBC, ECBEncryptBinaryString, ECBDecryptBinaryString } from '../lib/crypto';
import { debugLog, PostCall } from '../lib/helper'
import { teamsActivity } from '../lib/activities';

const debugOn = false;

const initialState = {
    activity: 0,  
    activityErrors: 0,
    activityErrorMessages: {},
    activityResult:null,
    error: null,
    teams: [],
    teamName: 'Personal',
    teamData: null,
    pageNumber: 1,
    itemsPerPage: 20,
    total:0,
    memberSearchValue:'',
    memberSearchResult:null,
    teamMembers: [],
    teamMembersTotal:0,
};

const teamSlice = createSlice({
    name: "team",
    initialState: initialState,
    reducers: {
        cleanTeamSlice: (state, action) => {
            const stateKeys = Object.keys(initialState);
            for(let i=0; i<stateKeys.length; i++) {
                let key = stateKeys[i];
                state[key] = initialState[key];
            }
        },
        resetTeamActivity: (state, action) => {
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
        setActivityResult: (state, action) => {
            state.activityResult = action.payload;
        },
        teamsLoaded: (state, action) => {
            state.teams = action.payload.hits;
            state.total = action.payload.total;
            state.pageNumber = action.payload.pageNumber;
        },
        newTeamAddedOnTop: (state, action) => {
            state.teams.unshift(action.payload);
        },
        newTeamAddedBefore: (state, action) => {
            state.teams.splice(action.payload.targetIndex, 0, action.payload.team);
        },
        newTeamAddedAfter: (state, action) => {
            state.teams.splice(action.payload.targetIndex+1, 0, action.payload.team);
        },
        setTeamName: (state, action) => {
            state.teamName = action.payload.teamName;
        },
        setTeamData: (state, action) => {
            state.teamData = action.payload.teamData;
        },
        clearMemberSearchResult: (state, action) => {
            state.memberSearchResult = null;
        },
        setMemberSearchValue: (state, action) => {
            state.memberSearchValue = action.payload;
        },
        setMemberSearchResult: (state, action) => {
            state.memberSearchResult = action.payload;
        },
        setTeamMembers: (state, action) => {
            const hits = action.payload;
            state.teamMembersTotal = hits.total;
            state.teamMembers = hits.hits.map((member)=>member._source);
        },
        newTeamMemberAdded: (state, action) => {
            const teamMember = action.payload;
            state.teamMembers = [teamMember].concat(state.teamMembers);
        },
        teamMemberDeleted: (state, action) => {
            const member = action.payload;
            let teamMembers = state.teamMembers.filter((teamMember)=> {return (teamMember.memberId !== member.memberId)})
            state.teamMembers = teamMembers;
        },
        clearTeamMembers: (state, action) => {
            state.teamMembers = [];
        }
    }
})

export const { cleanTeamSlice, resetTeamActivity, activityStart, activityDone, activityError, setActivityResult, teamsLoaded, newTeamAddedOnTop, newTeamAddedBefore, newTeamAddedAfter, setTeamName, setTeamData, clearMemberSearchResult, setMemberSearchValue, setMemberSearchResult, setTeamMembers, newTeamMemberAdded, teamMemberDeleted, clearTeamMembers } = teamSlice.actions;

const newActivity = async (dispatch, type, activity) => {
    dispatch(activityStart(type));
    dispatch(setActivityResult(null));
    try {
        await activity();
        dispatch(activityDone(type));
    } catch(error) {
        dispatch(activityError({type, error}));
    }
}

export const listTeamsThunk = (data) => async (dispatch, getState) => {
    function cacheTeamNameForTeamMember(teamId, cachedTeamName) {
        return new Promise(async (resolve, reject) => {
            PostCall({
                api: '/memberAPI/cacheTeamNameForTeamMember',
                body: {
                    teamId,
                    cachedTeamName: forge.util.encode64(cachedTeamName),
                }
            }).then(data => {
                debugLog(debugOn, data);
                if (data.status === 'ok') {
                    resolve();
                } else {
                    debugLog(debugOn, "cacheTeamNameForTeamMember failed: ", data.error);
                    reject("cacheTeamNameForTeamMember error.");
                }
            }).catch(error => {
                debugLog(debugOn, "cacheTeamNameForTeamMember failed: ", error)
                reject("cacheTeamNameForTeamMember error.");
            })

        });
    }
    
    newActivity(dispatch, teamsActivity.ListTeams , () => {
        return new Promise(async (resolve, reject) => {
            let i, state, auth, hits=[], decryptedTeam, team, privateKeyFromPem, encodedTeamName, teamName, cachedTeamName, pageNumber;
            state = getState().team;
            auth = getState().auth;
            hits = [];
            pageNumber = data.pageNumber;
            PostCall({
                api: '/memberAPI/listTeams',
                body: {
                    from: (pageNumber -1 ) * state.itemsPerPage,
                    size: state.itemsPerPage
                }
            }).then(async data => {
                debugLog(debugOn, data);
                if (data.status === 'ok') {
                    privateKeyFromPem = forge.pki.privateKeyFromPem(auth.privateKey);
                    for( i=0; i<data.hits.hits.length; i++) {
                         team = data.hits.hits[i];
                        if (team._source.encryptedTeamName) {
                            if (team._source.cachedTeamName && team._source.cachedTeamName !== 'NULL') {
                                if( (auth.accountVersion === 'v2') && (team._source.keyVersion === 3)){
                                    encodedTeamName = decryptBinaryStringCBC(forge.util.decode64(team._source.cachedTeamName), auth.searchKey, auth.searchIV);
                                    teamName = "<h2>" + forge.util.decodeUtf8(encodedTeamName) + "</h2>";
                                    decryptedTeam = {
                                        title: teamName,
                                        id: team._source.teamId,
                                        position: team._source.position
                                    }
                                } else {
                                    encodedTeamName = ECBDecryptBinaryString(forge.util.decode64(team._source.cachedTeamName), auth.searchKey);
                                    teamName = "<h2>" + forge.util.decodeUtf8(encodedTeamName) + "</h2>";
                                    decryptedTeam = {
                                        title: teamName,
                                        id: team._source.teamId,
                                        position: team._source.position
                                    }     
                                }
                            } else {
                                encodedTeamName = privateKeyFromPem.decrypt(forge.util.decode64(team._source.encryptedTeamName));
                                teamName = "<h2>" + forge.util.decodeUtf8(encodedTeamName) + "</h2>";
                                try {
                                    if(auth.accountVersion === 'v1') {
                                        cachedTeamName = ECBEncryptBinaryString(encodedTeamName, auth.searchKey);
                                    } else if(auth.accountVersion === 'v2') {
                                        cachedTeamName = encryptBinaryStringCBC(encodedTeamName, auth.searchKey, auth.searchIV);
                                    }      
                                    await cacheTeamNameForTeamMember(team._source.teamId, cachedTeamName);
                                } catch(error) {
                                    debugLog("cacheTeamName error");
                                }
                                decryptedTeam = {
                                    title: teamName,
                                    id: team._source.teamId,
                                    position: team._source.position
                                }
                            }
                        } else {
                            decryptedTeam = {
                                title: 'Error',
                                id: team._source.teamId,
                                position: team._source.position
                            }
                        }
                        
                        hits.push(decryptedTeam);
                    }
                   
                    dispatch(teamsLoaded({ pageNumber ,total: data.hits.total, hits }));
                    resolve();
                } else {
                    debugLog(debugOn, "listTeams error.", data.error);
                    reject("Failed to list teams.");
                }
            }).catch(error => {
                debugLog(debugOn, "listTeams failed: ", error)
                reject("Failed to list teams.");
            })
        });
    });
}

export const getTeamData = (teamId) => {
    debugLog(debugOn, "getTeamData()");
    return new Promise(async (resolve, reject) => {
        PostCall({
            api: '/memberAPI/getTeamData',
            body: { teamId }
        }).then(data => {
            debugLog(debugOn, data);
            if (data.status === 'ok') {
                const team = data.team;
                resolve(team);
            } else {
                debugLog(debugOn, "getTeamData failed: ", data.error);
                reject("Failed to get team data.");
            }
        }).catch(error => {
            debugLog(debugOn, "getTeamData failed: ", error)
            reject("getTeamData error.");
        })
    });
}

function generateTeamKey() {
    const salt = forge.random.getBytesSync(16);
    const randomKey = forge.random.getBytesSync(32);
    const teamKey = forge.pkcs5.pbkdf2(randomKey, salt, 10000, 32);

    return teamKey;
}
  
export function createANewTeam(teamName, addAction, targetTeam, targetPosition, publicKeyPem) {
    return new Promise(async (resolve, reject) => {
        const teamKey = generateTeamKey();
        const encodedTeamName = forge.util.encodeUtf8(teamName);
        const encryptedTeamName = encryptBinaryString(encodedTeamName, teamKey);
  
        const publicKeyFromPem = forge.pki.publicKeyFromPem(publicKeyPem);
        const encodedTeamKey = forge.util.encodeUtf8(teamKey);
        const encryptedTeamKey = publicKeyFromPem.encrypt(encodedTeamKey);
        const encryptedTeamNameByMemberPublic = publicKeyFromPem.encrypt(encodedTeamName);
  
        const salt = forge.random.getBytesSync(16);
        const randomKey = forge.random.getBytesSync(32);
        const searchKey = forge.pkcs5.pbkdf2(randomKey, salt, 10000, 32);
        const searchKeyEnvelope = encryptBinaryString(searchKey, teamKey);
  
        const searchIV = forge.random.getBytesSync(16);
        const searchIVEnvelope = encryptBinaryString(searchIV, teamKey);

        const addActionOptions = {
            name: forge.util.encode64(encryptedTeamName),
            teamKeyEnvelope: forge.util.encode64(encryptedTeamKey),
            searchKeyEnvelope: forge.util.encode64(searchKeyEnvelope),
            searchIVEnvelope: forge.util.encode64(searchIVEnvelope),
            encryptedTeamNameByMemberPublic: forge.util.encode64(encryptedTeamNameByMemberPublic),
            addAction: addAction,
        };
  
        if (addAction !== "addATeamOnTop") {
            addActionOptions.targetTeam = targetTeam;
            addActionOptions.targetPosition = targetPosition;
        }

        debugLog(debugOn, addActionOptions);

        PostCall({
            api: '/memberAPI/createANewTeam',
            body: addActionOptions
        }).then(result => {
            debugLog(debugOn, result);
  
            if (result.status === 'ok') {
                if (result.team) {
                    resolve(result.team);
                } else {
                    debugLog(debugOn, "woo... failed to create a team!", result.error);
                    reject("Failed to create a team.");
                }
            } else {
                debugLog(debugOn, "woo... failed to create a team!", result.error);
                reject("Failed to create a team.");
            }
      });
    });
}

export const createANewTeamThunk = (data) => async (dispatch, getState) => {
    newActivity(dispatch, teamsActivity.CreateANewTeam, () => {
        return new Promise(async (resolve, reject) => {
            const auth = getState().auth;
            const teamName = data.title;
            const publicKeyPem = data.publicKeyPem;
            const addAction = data.addAction;
            const targetIndex = data.targetIndex;
            const targetTeam = data.targetTeam;
            const targetPosition = data.targetPosition;
            const teamKey = generateTeamKey();
            const encodedTeamName = forge.util.encodeUtf8(teamName);
            const encryptedTeamName = encryptBinaryString(encodedTeamName, teamKey);
  
            const publicKeyFromPem = forge.pki.publicKeyFromPem(publicKeyPem);
            const encodedTeamKey = forge.util.encodeUtf8(teamKey);
            const encryptedTeamKey = publicKeyFromPem.encrypt(encodedTeamKey);
            const encryptedTeamNameByMemberPublic = publicKeyFromPem.encrypt(encodedTeamName);
  
            const salt = forge.random.getBytesSync(16);
            const randomKey = forge.random.getBytesSync(32);
            const searchKey = forge.pkcs5.pbkdf2(randomKey, salt, 10000, 32);
            const searchKeyEnvelope = encryptBinaryString(searchKey, teamKey);
            
            
            const addActionOptions = {
                name: forge.util.encode64(encryptedTeamName),
                teamKeyEnvelope: forge.util.encode64(encryptedTeamKey),
                searchKeyEnvelope: forge.util.encode64(searchKeyEnvelope),
                encryptedTeamNameByMemberPublic: forge.util.encode64(encryptedTeamNameByMemberPublic),
                addAction: addAction,
            };
  
            if(auth.accountVersion !== 'v1'){
                const searchIV = forge.random.getBytesSync(16);
                const searchIVEnvelope = encryptBinaryString(searchIV, teamKey);
                addActionOptions.searchIVEnvelope = forge.util.encode64(searchIVEnvelope);
            }

            if (addAction !== "addATeamOnTop") {
                addActionOptions.targetTeam = targetTeam;
                addActionOptions.targetPosition = targetPosition;
            }

            debugLog(debugOn, addActionOptions);

            PostCall({
                api: '/memberAPI/createANewTeam',
                body: addActionOptions
            }).then(result => {
                debugLog(debugOn, result);
  
                if (result.status === 'ok') {
                    if (result.team) {
                        let team = {
                            title: teamName,
                            id: result.team.id,
                            position: result.team.position
                        }
                        switch(addAction) {
                            case 'addATeamOnTop':
                                dispatch(newTeamAddedOnTop(team));
                                break;
                            case 'addATeamBefore':
                                dispatch(newTeamAddedBefore({team, targetIndex}));
                                break;
                            case 'addATeamAfter':
                                dispatch(newTeamAddedAfter({team, targetIndex}));
                                break;
                            default:
                        }
                        resolve(result.team);
                    } else {
                        debugLog(debugOn, "woo... failed to create a team!", result.error);
                        reject("Failed to create a new team.");
                    }
                } else {
                    debugLog(debugOn, "woo... failed to create a team!", result.error);
                    reject("Failed to create a team.");
                }
            });

        });
    });
}

export const findMemberByIdThunk = (data) => async (dispatch, getState) => {
    newActivity(dispatch, teamsActivity.SearchForAMember, () => {
        return new Promise(async (resolve, reject) => {
            PostCall({
                api: '/memberAPI/findMemberById',
                body: {
                    id: data.id
                }
            }).then(data => {
                if (data.status === 'ok') {
                    dispatch(setMemberSearchResult(data.member));
                    resolve();
                } else {
                    dispatch(setMemberSearchResult({}));
                    reject("Failed to find a member by ID.");
                }
            }).catch(error => {
                debugLog(debugOn, "findMemberById failed: ", error)
                reject("Failed to find a member by ID.");
            })
        });
    });
}

export const listTeamMembersThunk = (data) => async (dispatch, getState) => {
    debugLog(debugOn, 'listTeamMembersThunk');
    newActivity(dispatch, teamsActivity.ListTeamMembers, () => {
        return new Promise(async (resolve, reject) => {
            const teamId = data.teamId;
            let state = getState().team;
            PostCall({
                api: '/memberAPI/listTeamMembers',
                body: {
                    teamId,
                    size: state.itemsPerPage,
                    from: (data.pageNumber - 1) * state.itemsPerPage
                }
            }).then(data => {
                if (data.status === 'ok') {
                    dispatch(setTeamMembers(data.hits));
                    resolve();
                } else {
                    reject("Failed to list team members.");
                }
            }).catch(error => {
                debugLog(debugOn, "listTeamMembers failed: ", error)
                reject("Failed to list team members.");
            })
        })
    })
}

export const addAMemberToTeamThunk = (data) => async (dispatch, getState) => {
    newActivity(dispatch, teamsActivity.AddAMemberToTeam, () => {
        return new Promise(async (resolve, reject) => {
            let pki, teamId, teamKey,teamName, publicKeyFromPem, encodedTeamKey, encodedTeamName, encryptedTeamKey, encryptedTeamName, teamMember;
            const member = data.member;
            const memberId = member.id;
            const containerState = getState().container;
            
            if(!containerState.workspaceKeyReady){
                reject("Workspace key not ready!");
                return;
            }
            pki = forge.pki;
            teamId = containerState.workspace;
            teamKey = containerState.workspaceKey;
            teamName = containerState.workspaceName;
            publicKeyFromPem = pki.publicKeyFromPem(forge.util.decode64(member.publicKey));
            encodedTeamKey = forge.util.encodeUtf8(teamKey);
            encryptedTeamKey = publicKeyFromPem.encrypt(encodedTeamKey);
            encryptedTeamKey = forge.util.encode64(encryptedTeamKey);
            encodedTeamName = forge.util.encodeUtf8(teamName);
            encryptedTeamName = publicKeyFromPem.encrypt(encodedTeamName);
            encryptedTeamName = forge.util.encode64(encryptedTeamName);
            teamMember = {
                teamId,
                memberId,
                encryptedTeamName,
                teamKeyEnvelope: encryptedTeamKey,
            }
            PostCall({
                api: '/memberAPI/addATeamMember',
                body: teamMember
            }).then(data => {
                if (data.status === 'ok') {
                    dispatch(setActivityResult('Added'));
                    dispatch(setMemberSearchValue(''));
                    dispatch(newTeamMemberAdded(teamMember));
                    resolve();
                } else {
                    dispatch(setActivityResult(data.error));
                    dispatch(setMemberSearchValue(''));
                    reject("Failed to add a team member.");
                }
            }).catch(error => {
                debugLog(debugOn, "addAMemberToTeamThunk failed: ", error)
                reject("Failed to add a team member.");
            })

        });
    });
}

export const deleteATeamMemberThunk = (data) => async (dispatch, getState) => {
    newActivity(dispatch, teamsActivity.DeleteATeamMember, () => {
        return new Promise(async (resolve, reject) => {
            const member = data.member;
            const teamId = member.teamId;
            const memberId = member.memberId;

            PostCall({
                api: '/memberAPI/deleteATeamMember',
                body: {
                    teamId,
                    memberId
                }
            }).then(data => {
                if (data.status === 'ok') {
                    dispatch(teamMemberDeleted(member));
                    resolve();
                } else {
                    
                    reject("Failed to delete a team member.");
                }
            }).catch(error => {
                debugLog(debugOn, "deleteATeamMemberThunk failed: ", error)
                reject("Failed to delete a team member.");
            })
            
        })
    });
}

export const teamReducer = teamSlice.reducer;

export default teamSlice;


