import { JobDefinition } from "./baseJobDef";

import { Logger } from "../../util/logger";
const logger = new Logger("jobs.def.hello1");

const JOB_NAME = "hello1";
const JOB_SCHEDULE = "0,30 * * * * *";

export class Hello1Job extends JobDefinition {
    constructor() {
        super(JOB_NAME, JOB_SCHEDULE);
    }
    async startProcess (done: (err?: Error) => void) {
        logger.info("starts");
        await new Promise(resolve => {
            setTimeout(() => {
                logger.info("Hello 1 World!!!");
                resolve();
            }, 5000);    
        });
        logger.info("ends");
        done();
    }
}
