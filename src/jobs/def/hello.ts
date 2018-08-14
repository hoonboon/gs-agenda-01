import { JobDefinition } from "./baseJobDef";

import { Logger } from "../../util/logger";
const logger = new Logger("jobs.def.hello");

const JOB_NAME = "hello";
const JOB_SCHEDULE = "0,20,40 * * * * *";

export class HelloJob extends JobDefinition {
    constructor() {
        super(JOB_NAME, JOB_SCHEDULE);
    }
    async startProcess (done: (err?: Error) => void) {
        logger.info("starts");
        await new Promise(resolve => {
            setTimeout(() => {
                logger.info("Hello World!!!");
                resolve();
            }, 7000);    
        });
        logger.info("ends");
        done();
    }
}
