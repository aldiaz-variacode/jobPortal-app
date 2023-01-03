class Recruiter {
    constructor(id, name, lastname, email, roleId, google = false){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.roleId = roleId;
        this.google = google;
    }
}

module.exports = Recruiter;