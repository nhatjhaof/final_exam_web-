import { Request, Response } from "express";

let latestData: any = null;
let waitingRes: Response | null = null;

export const waitForNewData = (req: Request, res: Response) => {
  if (latestData) {
    res.json({ newData: latestData });
    latestData = null;
  } else {
    waitingRes = res;
    setTimeout(() => {
      if (waitingRes) {
        waitingRes.json({ newData: null });
        waitingRes = null;
      }
    }, 10000); // timeout sau 30s
  }
};

export const notifyNewData = (data: any) => {
  latestData = data;
  if (waitingRes) {
    waitingRes.json({ newData: data });
    waitingRes = null;
  }
};