

export class userModel{
    email !: string;
    password !: string;
    password_bis !: string;
    last_name !:string;
    first_name !: string;
    pseudo !: string;
}

export interface userInfo{
    email : string;
    last_name :string;
    first_name : string;
    pseudo : string;
    id_role : string;
    id : Number;
}

export class Login_model{
    email !: string;
    password!:string;
}
