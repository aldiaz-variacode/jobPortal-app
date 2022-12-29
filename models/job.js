class Job {
    constructor(id, description, position, location, recruiterId, jobTypeId){
        this.id = id;
        this.description = description;
        this.position = position;
        this.location = location;
        this.recruiterId = recruiterId;
        this.jobTypeId = jobTypeId;
    }
}

module.exports = Job;