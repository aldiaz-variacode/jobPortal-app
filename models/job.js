class Job {
    constructor(id, description, position, location, recruiterId, jobtypeId){
        this.id = id;
        this.description = description;
        this.position = position;
        this.location = location;
        this.recruiterid = recruiterId;
        this.jobtypeid = jobtypeId;
    }
}

module.exports = Job;