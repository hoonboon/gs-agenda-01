/**
 * Steps to register new JobDef:
 * 1. Create the NewJobDef class by extending JobDefinition in /jobs/def folder
 * 2. Import the NewJobDef class here and add into JobStore
 */
import { JobDefinition } from "./def/baseJobDef";
import { HelloJob } from "./def/hello";

const JobStore: any = {
    HelloJob
}

export function getJobDef(jobDefClassName: string): JobDefinition {
    return new JobStore[jobDefClassName];
}
