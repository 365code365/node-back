// src/constants/ErrorCode.ts


export enum ErrorCode {
  SUCCESS = '00000',
  Unauthorized = '5001',
  NOT_FUND_USER = '5002',
  Forbidden = '5003',
  USER_HAS_EXIST = '5005',
  password_is_empty = '5006',
  token_not_exist = '5007',
  this_param_not_empty = '5008',
  has_exist = '5009',
  has_not_exist = '5010',
  app_error = '5011',
  cannot_batch_approve = '5012',
  empty_approve = '5013',
  sys_error = '500'
}

export enum ErrorType {
  Unauthorized = 'Unauthorized',
  password_is_empty = 'password is empty',
  NOT_FUND_USER = 'Not find user',
  USER_HAS_EXIST = 'User has exist',
  Forbidden = 'Forbidden',
  token_not_exist = 'token_not_exist',
  this_param_not_empty = 'this_param_not_empty',
  has_exist = 'has_exist',
  has_not_exist = 'has_not_exist',
  app_error = 'approve result reject or waiting',
  cannot_batch_approve = 'Cannot approve, there are students pending approval.',
  empty_approve = 'empty approve',
  sys_error = 'sys_error',
}
