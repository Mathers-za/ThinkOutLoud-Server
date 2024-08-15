import { Request, Response, NextFunction } from "express";

export const isRequestParamsProvided = (paramaterKey: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (
      req.params[paramaterKey] === undefined ||
      !req.params.hasOwnProperty(paramaterKey)
    ) {
      res
        .status(400)
        .json({ message: "Request paramater not provided or provided" });
    } else next();
  };
};

export const checkQueryParamsCorrect = (queryParams: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const queryParam of queryParams) {
      if (
        !req.query.hasOwnProperty(queryParam) ||
        req.query[queryParam] === undefined
      ) {
        return res.status(400).json({
          message: `Problem occurred with passing request query params: Missing or undefined parameter '${queryParam}'`,
        });
      }
    }

    next();
  };
};
