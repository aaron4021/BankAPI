export class AccountCreateData{
    userID: number;
    bankID: number;
    balance: number;
    
}
export class AccountDetailInfo{
    username: string;
    bankName: string;
    balance: number;
    code: string;
}

export class AccountTransfer{
    userID: number;
    code: number;
    balance: number;
    bankID: number
}

export class Withdraw{
    balance: number;
    userID: number;
}