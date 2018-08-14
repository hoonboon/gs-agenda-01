// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

import * as daemon from "./jobs/daemon";
import { Logger } from "./util/logger";

const logger = new Logger("app");

daemon.start().catch(error => {
    console.error(error);
    process.exit(-1);
});

async function graceful() {
    await daemon.stop();
    logger.info("daemon stopped");
    process.exit(0);
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);
