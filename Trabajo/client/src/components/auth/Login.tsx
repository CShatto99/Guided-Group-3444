import * as React from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { FooterBar } from "../layout/FooterBar";
import { TopNavBar } from "../layout/TopNavBar";

/* Interface for defining props for Login page
 */
interface LoginProps {

}

/* Interface for defining the State of the Login page 
 */
interface LoginState {
    email: string;
    password: string;
}

/* Login component is the page that presents the user the login form
*/
export class Login extends React.Component<LoginProps, LoginState> {
    
    //constructor
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    /* handle state changes from form */
    handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({email: event.target.value})
    }

    handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value})
    }
    
    handleSubmit = () => {
        let alertMessage = `TODO send form to API:\nemail: ${this.state.email}\npassword: ${this.state.password}`;
        alert(alertMessage);
    }

    render() {
        return (
            <div>
                <TopNavBar/>
                    <div className={"mainContentArea"}>
                        <div className={"loginregContainer"}>
                            <h1>Please Login</h1>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label for="email" sm={3}>Email</Label>
                                    <Col>
                                        <Input type="email" name="Email" id="email" placeholder="example@example.com" value={this.state.email} onChange={this.handleEmail} sm={9}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="password" sm={3}>Password</Label>
                                    <Col>
                                        <Input type="password" name="Password" id="password" placeholder="myPassword123!" value={this.state.password} onChange={this.handlePassword} sm={9}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col>
                                        <Button className={"submitButton"} type="submit">Login</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Button className={"submitButton"} href="/forgotPassword">Forgot Password</Button>
                        </div>
                    </div>
                <FooterBar/>
            </div>
        );
    }
}