export interface CreateVandorInput{
    username: string;
    email:string;
    password:string;
}


export interface VandorLoginInputs{
    username:string;
    password:string;
}

export interface VandorPayload{
    _id:string;
    email:string;
    username:string;
    
}