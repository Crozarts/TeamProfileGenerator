// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, phoneNumber) {
        super(name, id, email);
        this.phoneNumber = phoneNumber;
    }

    getRole() {
        return 'Manager';
    }

    getOfficeNumber() {
        return this.phoneNumber;
    }
}

module.exports = Manager;
