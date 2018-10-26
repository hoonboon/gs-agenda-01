import Agenda from "agenda";
import * as os from "os";

import { MongoClient } from "mongodb";

import * as jobStore from "./jobStore";

import { Logger } from "../util/logger";
const logger = new Logger("jobs.daemon");

const mongoDbUrl = process.env.MONGODB_URI || "";

const agenda = new Agenda();

export async function start() {
    const mongoClient = await MongoClient.connect(mongoDbUrl, { useNewUrlParser: true });
    
    agenda.name(`${os.hostname} - ${process.pid}`)
        .mongo(mongoClient.db(), "agendaJobs")
        .processEvery("15 seconds");

    await new Promise(resolve => agenda.once("ready", resolve));
    
    await defineAndScheduleAllJobs();

    await agenda.start();
    
    logger.info("daemon started");
}

export async function stop() {
    return agenda.stop();
}

async function defineAndScheduleAllJobs () {
    // this function determines which job from the jobStore to be scheduled
    // TODO: load targetJobsClassName from database/ env instead of hardcoded here
    // TODO: allow user to suspend job/ change job schedule
    const targetJobsClassName = ["HelloJob", "Hello1Job", "Hello2Job"];
    
    for (const jobClassName of targetJobsClassName) {
        const aJob = jobStore.getJobDef(jobClassName);
        agenda.define(aJob.jobName, (job: Agenda.Job, done: (err?: Error) => void) => { 
            aJob.startProcess(done);
        });
        await agenda.every(aJob.jobSchedule, aJob.jobName);
    }
}
