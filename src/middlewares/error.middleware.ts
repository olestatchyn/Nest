import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { CustomError } from '../errors/customError';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { statusCode, statusMessage } = res;

      if (statusCode >= HttpStatus.BAD_REQUEST) {
        const errorId = uuid();

        const errorMessage = statusMessage || 'Internal Server Error';
        const error = new CustomError(errorMessage, statusCode);
        error.errorId = errorId;

        console.error(`Error ID: ${errorId}`);
        console.error(`Status Code: ${statusCode}`);
        console.error(`Error Message: ${errorMessage}`);
      }
    });
    next();
  }
}
//test