
export interface CreateInput { 
    collectionName: string;
    payload: any;
}

export interface CreateResponse { 
    id: string;
}

export interface UpdateResponse { 
    id: string;
    success: boolean;
    date: any;
}

export interface DeleteResponse { 
    id: string;
    success: boolean;
    date: any;
}

export interface GetInput { 
    collectionName: string;
}

export interface GetResponse { 
    id: string;
    data: any;
}

export interface GetByIdInput { 
    collectionName: string;
    id: string;
}

export interface GetByIdResponse { 
    id: string;
    data: any;
}

export interface UpdateInput { 
    collectionName: string;
    id: string;
    payload: any;
}


export interface DeleteInput { 
    collectionName: string;
    id: string;
}