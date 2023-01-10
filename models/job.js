class Job {
    constructor(id, description, position, location, recruiterId, jobTypeId, accessTypeId){
        this.id = id;
        this.description = description;
        this.position = position;
        this.location = location;
        this.recruiterId = recruiterId;
        this.jobTypeId = jobTypeId;
        this.accessTypeId = accessTypeId;
    }
}

module.exports = Job;