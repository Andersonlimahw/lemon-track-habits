// REF: https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/

import { 
    collection, 
    addDoc, 
    Timestamp, 
    query, 
    orderBy,
    updateDoc,
    doc,
    deleteDoc,
    getDoc
} from 'firebase/firestore';
import { db }  from './firebaseConfig';

import { 
    GetInput, 
    GetByIdInput, 
    GetByIdResponse,
    UpdateInput,
    UpdateResponse,
    DeleteInput,
    DeleteResponse,
    CreateInput,
    CreateResponse
} from './interfaces';


export const create = async ({ collectionName, payload } : CreateInput) : Promise<CreateResponse> => {
    try { 
        const response = await addDoc(collection(db, collectionName), {
            ...payload,
            created: Timestamp.now()
        });
        console.log('[Firebase][Add] - Success - response: ', response, 'id: ', response.id, ' payload: ', payload);
        return {
            id: response.id,
        };
    } catch(ex) {
        console.error('[Firebase][Add] - Error: ', ex);
        throw new Error(`Error to create document: ${ex}`);
    }
}

export const get = async ({ collectionName } : GetInput) => {
    try { 
        let result;
        const response = query(
            collection(db, collectionName)
        );       
        console.log('[Firebase][get] - Success - response: ', result, response);
        return response;
    } catch(ex) {
        /* istanbul ignore next */
        console.error('[Firebase][get] - Error: ', ex);
        /* istanbul ignore next */
        throw new Error(`Error to create document: ${ex}`);
    }
}

export const getById = async ({ collectionName, id } : GetByIdInput) : Promise<GetByIdResponse> => {
    try { 
        const documentRefById = await doc(db, collectionName, id);
        const response = await getDoc(documentRefById);
        console.log('[Firebase][get] - Success - response: ', response);
        return {
            id: response.id,
            data: response.data()
        };
    } catch(ex) {
        console.error('[Firebase][get] - Error: ', ex);
        throw new Error(`Error to getById document: ${ex}`);
    }
}

export const update = async ({ collectionName, id, payload } : UpdateInput) : Promise<UpdateResponse> => {
    try { 
        const documentRefById = await doc(db, collectionName, id);
        const response  = await updateDoc(documentRefById, {
            ...payload,
            updatedAt: Timestamp.now()
        })
        console.log('[Firebase][update] - Success - response: ', response, ' payload: ', payload);
        return {
            id: id, 
            success: true,
            date: Timestamp.now()
        }
    } catch(ex) {
        console.error('[Firebase][update] - Error: ', ex);
        throw new Error(`Error to update document: ${ex}`);
    }
}

export const deleteById = async ({ collectionName, id } : DeleteInput) : Promise<DeleteResponse> => {
    try { 
        const documentRefById = await doc(db, collectionName, id);
        const response = await deleteDoc(documentRefById);

        console.log('[Firebase][deleteById] - Success - response: ', response);
        return {
            id: id,
            success: true,
            date: Timestamp.now()
        };
    } catch(ex) {
        console.error('[Firebase][deleteById] - Error: ', ex);
        throw new Error(`Error to deleteById document: ${ex}`);
    }
}