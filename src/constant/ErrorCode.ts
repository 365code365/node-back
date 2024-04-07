// src/constants/ErrorCode.ts

export enum ErrorCode {
    SYS_ERROR = '5000',
    SUCCESS = '00000',
    Unauthorized = '5001',
    NOT_FUND_USER = '5002',
    Forbidden = '5003',
    InternalServerError = '5004',
    USER_HAS_EXIST = '5005',
    password_is_empty = '5006',
    token_not_exist = '5007',
    this_param_not_empty = '5008',
}

export enum ErrorType {
    SYS_ERROR = 'SYS ERROR',
    Unauthorized = 'Unauthorized',
    password_is_empty = 'password is empty',
    NOT_FUND_USER = 'Not find user',
    USER_HAS_EXIST = 'User has exist',
    Forbidden = 'Forbidden',
    InternalServerError = 'Internal server error',
    token_not_exist = 'token_not_exist',
    this_param_not_empty = 'this_param_not_empty',
}
