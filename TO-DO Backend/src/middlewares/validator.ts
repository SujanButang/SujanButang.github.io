import { Schema } from "joi";

import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/badRequestError";

export function validateReqQuery(schema: Schema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);

    if (error) {
      return next(new BadRequestError(error.message));
    }

    req.query = value;

    next();
  };
}

export function validateReqBody(schema: Schema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return next(new BadRequestError(error.message));
    }

    req.body = value;

    next();
  };
}


export function validateReqParams(schema:Schema){
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params);

    if (error) {
      return next(new BadRequestError(error.message));
    }

    req.params = value;

    next();
  };
}