import express from "express";
import fs from "fs";

const app = express();

export function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `${new Date().toISOString()} - ${req.method} ${req.path}\n`,
      (err) => {
        if (err) console.error("Error writing to log file:", err);
      },
    );
    next();
  };
}
