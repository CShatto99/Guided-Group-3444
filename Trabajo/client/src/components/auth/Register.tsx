import * as React from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { FooterBar } from "../layout/FooterBar";
import { TopNavBar } from "../layout/TopNavBar";

/* Interface for defining props for Register page
 */
interface RegisterProps {

}

/* Interface for defining the State of the Register page 
 */
interface RegisterState {
    fullName: string;
    email: string;
    phone: number;
    company: string;
    companyCode: number;
    address: string;
    city: string;
    state: string;
    password: string;
    confirmPassword: string;
    companyImage: string;
}

/* Register component is the page that presents the user the registration form
*/
export class Register extends React.Component<RegisterProps, RegisterState> {
    
    //constructor
    constructor(props: RegisterProps) {
        super(props);

        this.state = {
            fullName: "",
            email: "",
            phone: 5555555555,
            company: "Select Company",
            companyCode: 1234,
            address: "",
            city: "",
            state: "Select State",
            password: "",
            confirmPassword: "",
            companyImage: "images/defaultCompany.png"
        }
    }

    /*Update state functions from form*/
    handleFullName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({fullName: event.target.value})
    }

    handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({email: event.target.value})
    }

    handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({phone: parseInt(event.target.value)})
    }

    handleCompany = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({company: event.target.value})
    }

    handleCompanyCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({companyCode: parseInt(event.target.value)})
    }

    handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({address: event.target.value})
    }

    handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({city: event.target.value})
    }

    handleState = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({state: event.target.value})
    }

    handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value})
    }

    handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({confirmPassword: event.target.value})
    }

    /* handle when the user hits submit.
        This is where the form will be sent to the API
        */
    handleSubmit = () => {
        let alertMessage = `name: ${this.state.fullName}\n`;
        alertMessage += `email: ${this.state.email}\n`;
        alertMessage += `phone: ${this.state.phone}\n`;
        alertMessage += `company: ${this.state.company}\n`;
        alertMessage += `company code: ${this.state.companyCode}\n`;
        alertMessage += `address: ${this.state.address}\n`;
        alertMessage += `city: ${this.state.city}\n`;
        alertMessage += `state: ${this.state.state}\n`;
        alertMessage += `password: ${this.state.password}\n`;
        alert(`TODO, send form to api:\n${alertMessage}`)
    }

    render() {
        //states to display for the select
        let states = ["Select State", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
                        "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", 
                        "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
                        "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
                        "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
                        "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", 
                        "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        return (
            <div>
                <TopNavBar/>
                    <div className={"mainContentArea"}>
                        <div className={"registerContainer"}>
                            <div className={"loginregContainer"}>
                                <h1>Register</h1>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <Label for="name" sm={3}>Full Name</Label>
                                        <Col>
                                            <Input type="text" name="Name" id="name" placeholder="Bobby Bobberson" value={this.state.fullName} onChange={this.handleFullName} sm={9}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="email" sm={3}>Email</Label>
                                        <Col>
                                            <Input type="email" name="Email" id="email" placeholder="example@example.com" value={this.state.email} onChange={this.handleEmail} sm={9}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="phone" sm={3}>Phone</Label>
                                        <Col>
                                            <Input type="tel" name="Phone" id="phone" placeholder="8175555555" value={this.state.phone} onChange={this.handlePhone} sm={9}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="company" sm={3}>Company</Label>
                                        <Col>
                                            <Input type="select" name="Company" id="company" value={this.state.company} onChange={this.handleCompany} sm={9}>
                                                <option>Select Company</option>
                                                <option>TODO make this pull from web request</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="companyCode" sm={3}>Company Code</Label>
                                        <Col>
                                            <Input type="text" name="CompanyCode" id="companyCode" value={this.state.companyCode} onChange={this.handleCompanyCode} sm={9}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="address" sm={3}>Address</Label>
                                        <Col>
                                            <Input type="text" name="Address" id="address" value={this.state.address} onChange={this.handleAddress} sm={9}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="city" sm={3}>City</Label>
                                        <Col>
                                            <Input type="text" name="City" id="city" value={this.state.city} onChange={this.handleCity} sm={4}/>
                                        </Col>
                                        <Label for="state" sm={2}>State</Label>
                                        <Col>
                                            <Input type="select" name="State" id="state" value={this.state.state} onChange={this.handleState} sm={1}>
                                                {states.map((value) => {return <option>{value}</option>})}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="password" sm={3}>Password</Label>
                                        <Col>
                                            <Input type="password" name="Password" id="password" placeholder="myPassword123!" value={this.state.password} onChange={this.handlePassword} sm={9}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="confirmpassword" sm={3}>Confirm Password</Label>
                                        <Col>
                                            <Input type="password" name="ConfirmPassword" id="confirmpassword" placeholder="myPassword123!" value={this.state.confirmPassword} onChange={this.handleConfirmPassword} sm={9}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col>
                                            <Button className={"submitButton"} type="submit">Register</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                            <div className={"companyInfo"}>
                                <img src={this.state.companyImage} alt="companyPhoto" className={"companyInfoPic"}/>
                                <p>
                                    {(this.state.company === "Select Company") ? "Please Select Company From List" : "TODO pull company address/info from web request"}
                                </p>
                            </div>
                        </div>
                    </div>
                <FooterBar/>
            </div>
        );
    }
}