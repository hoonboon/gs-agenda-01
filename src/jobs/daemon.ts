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
    // TODO: load target JobDefs from database
    const aJob = jobStore.getJobDef("HelloJob");
    agenda.define(aJob.jobName, (job: Agenda.Job, done: (err?: Error) => void) => { 
        aJob.startProcess(done);
    });
    await agenda.every(aJob.jobSchedule, aJob.jobName);
}
