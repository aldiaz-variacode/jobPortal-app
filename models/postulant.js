class Postulant {
    constructor(id, name, lastname, email, phone, roleId){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.roleId = roleId;
        this.verified = false;
        this.verifiedAt = 'none';
    }
}

module.exports = Postulant;