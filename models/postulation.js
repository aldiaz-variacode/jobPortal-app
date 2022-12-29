class Postulation {
    constructor(id, jobId, postulantId, experience, cvurl){
        this.id = id;
        this.jobId = jobId;
        this.postulantId = postulantId;
        this.experience = experience;
        this.cvurl = cvurl;
    }
}

module.exports = Postulation;