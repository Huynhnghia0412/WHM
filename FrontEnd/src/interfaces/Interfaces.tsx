//nguoi dung
export interface IUser {
    id: string;
    userCode: string;
    userName: string;
    password?: string;
    fullName: string;
    email: string;
    tax?: string;
    address?: string;
    phoneNumber: string;
    gender?: number;
    role: IRole;
    roleId?: string;
    createTime?: string;
    userClaims?: IUserClaims[]
}

//kho
export interface IWareHouse {
    id: number;
    name: string;
    userId: string;
    email: string
}

//vai tro
export interface IRole {
    id: string;
    name: string;
    roleClaims?: IRoleClaims[]
}

export interface IRoleClaims {
    claimType: string;
    claimValue: string;
    roleId: string
}

export interface IUserClaims {
    claimType: string;
    claimValue: string;
    userId: string
}

export interface ICustomer {
    id: number;
    customerCode: string;
    name: string;
    phone: string;
    tax: string;
    email: string;
    address: string;
}

export interface IProduct {
    id: number;
    productCode: string;
    name: string;
    status: string;
    price: number;
    unit: string;
    des: string;
    quantity: number;
    productType: IProductType;
    productTypeId: number;
    noteItems: string;
    quantityInWareHouse: number;
}

export interface IProductType {
    id: number;
    productTypeCode: string;
    name: string;
    detail: string;
}

export interface IItem {
    id: number,
    productId: number;
    quantity: number;
    price: number;
    totalPrice: number;
}

export interface ICheckProduct {
    id: number;
    quantity: number;
    deviationQuantity?: number; // Số lượng lệch
    deviationValue?: number;    // Giá trị lệch
}

export interface IRequestInventoryNote {
    noteCode: string;
    noteDay: Date;
    notes: string;
    items: ICheckProduct[]
}

export interface IResponseInventoryNote {
    id: number;
    noteCode: string;
    noteDay: Date;
    notes: string;
    items: ICheckProduct[]
}

// export interface IResponseInOutNote {
//     id: number;
//     noteCode: string;
//     noteDay: Date;
//     notes: string;
//     type: string;
//     items: IItem[]
// }

export interface IRequestInOutNote {
    id: number;
    noteCode: string;
    noteDate: Date;
    des: string;
    wareHouseId: number;
    customerId: number;
    userId: string;
    noteItems: IItem[];
    //
    wareHouseName: string;
    customerName: string;
    userName: string;
    total: number;
}

export interface ILogin {
    username: string;
    password: string;
}

//report request
export interface IInOutReportRequest {
    productNameOrCode: string;
    productTypeId: number;
    fromDate: Date;
    toDate: Date;
}

export interface IRevenueReportRequest {
    fromDate: Date;
    toDate: Date;
}

export interface ICustomerRevenueReportRequest {
    customerId: number;
    fromDate: Date;
    toDate: Date;
}


export interface IUserModel {
    fullName: string,
    id: string,
    email: string,
    role: string,
    readInOutNote: string;
    modifyInOutNote: string;
    readWarehouse: string;
    modifyWarehouse: string;
    readProduct: string;
    modifyProduct: string;
    readProductType: string;
    modifyProductType: string;
    readCheckInventory: string;
    modifyCheckInventory: string;
    readCustomer: string;
    modifyCustomer: string;
}


