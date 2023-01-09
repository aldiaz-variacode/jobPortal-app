class Job {
    constructor(id, description, position, location, recruiterId, jobTypeId, accessTypeId, createdAt){
        this.id = id;
        this.description = description;
        this.position = position;
        this.location = location;
        this.recruiterId = recruiterId;
        this.jobTypeId = jobTypeId;
        this.accessTypeId = accessTypeId;
        this.createdAt = createdAt;
    }
}

module.exports = Job;