class Applicant {
    constructor(id, name, email, phone, lastLaboralExperience, urlCurriculum){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.lastLaboralExperience = lastLaboralExperience;
        this.urlCurriculum = urlCurriculum;
    }
}

module.exports = Applicant;