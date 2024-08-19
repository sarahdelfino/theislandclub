export class Member {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    memberType: string;
    phone?: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        address: string,
        memberType: string,
        phone?: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.memberType = memberType;
        this.phone = phone;
    }


}