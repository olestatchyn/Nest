import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message, statusCode);
    this.name = 'CustomError';
    this.errorId = '';
  }

  errorId: string;
}