import { Router } from "express";
import { readHookPush } from "../controllers/hookController.js"

export const hookRoute = Router()

hookRoute.post('/hookPush', readHookPush)
hookRoute.post('/hookIssue', readHookPush)