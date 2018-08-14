export abstract class JobDefinition {
    protected _jobName: string;
    protected _jobSchedule: string;
    
    constructor(name: string, schedule: string) {
        this._jobName = name;
        this._jobSchedule = schedule;
    }
    
    get jobName(): string {
        return this._jobName;
    }
    
    get jobSchedule(): string {
        return this._jobSchedule;
    }

    abstract async startProcess (done: (err?: Error) => void): Promise<void>;
}
