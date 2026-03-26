import { NextFunction, Request, Response } from "express";
import fs from "fs";

export function logReqRes(fileName: string) {
  return (_req: Request, res: Response, next: NextFunction): void => {
    fs.appendFile(
      fileName,
      `${new Date().toISOString()} - ${res.req.method} ${res.req.path}\n`,
      (error) => {
        if (error) {
          console.error("Error writing to log file:", error);
        }
      },
    );
    next();
  };
}
