import { Response, Request } from "express";

const testRoute = (req:Request, res: Response)=>{

    res.send("route test tested");

};

export {testRoute};