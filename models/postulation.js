class Postulation {
    constructor(id, jobId, postulantId, experience, cvUrl){
        this.id = id;
        this.jobId = jobId;
        this.postulantId = postulantId;
        this.experience = experience;
        this.cvUrl = cvUrl;
    }
}

module.exports = Postulation;