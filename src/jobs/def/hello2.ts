import { JobDefinition } from "./baseJobDef";

import { Logger } from "../../util/logger";
const logger = new Logger("jobs.def.hello2");

const JOB_NAME = "hello2";
const JOB_SCHEDULE = "0 * * * * *";

export class Hello2Job extends JobDefinition {
    constructor() {
        super(JOB_NAME, JOB_SCHEDULE);
    }
    async startProcess (done: (err?: Error) => void) {
        logger.info("starts");
        await new Promise(resolve => {
            setTimeout(() => {
                logger.info("Hello 2 World!!!");
                resolve();
            }, 3000);    
        });
        logger.info("ends");
        done();
    }
}
