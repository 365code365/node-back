// src/constants/ErrorCode.ts

export enum ErrorCode {
    SYS_ERROR = '5000',
    SUCCESS = '00000',
    Unauthorized = '5001',
    NOT_FUND_USER = '5002',
    Forbidden = '5003',
    InternalServerError = '5004',
}

export enum ErrorType {
    SYS_ERROR = 'SYS ERROR',
    Unauthorized = 'Unauthorized',
    NOT_FUND_USER = 'Not find user',
    Forbidden = 'Forbidden',
    InternalServerError = 'Internal server error',
}
