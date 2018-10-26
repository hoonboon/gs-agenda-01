/**
 * Steps to register new JobDef:
 * 1. Create the NewJobDef class by extending JobDefinition in /jobs/def folder
 * 2. Import the NewJobDef class here and add into JobStore
 */
import { JobDefinition } from "./def/baseJobDef";
import { HelloJob } from "./def/hello";
import { Hello1Job } from "./def/hello1";
import { Hello2Job } from "./def/hello2";

const JobStore: any = {
    HelloJob,
    Hello1Job,
    Hello2Job,
}

export function getJobDef(jobDefClassName: string): JobDefinition {
    return new JobStore[jobDefClassName];
}
