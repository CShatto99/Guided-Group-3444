import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import "./layoutStyles.css";
import states from "../../json/states.json";

/* Interface for defining props for landing page
 */
interface companiesProps {}

/* Interface for defining state for landing page
 */
interface companiesState {
  name: string;
  code: string;
  checkCode: string;
  address: string;
  city: string;
  state: string;
  image: string;
}

export class Companies extends React.Component<companiesProps, companiesState> {
  constructor(props: companiesProps) {
    super(props);

    this.state = {
      name: "",
      code: "",
      checkCode: "",
      address: "",
      city: "",
      state: "",
      image: "",
    };
  }

  handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    let img: string = "";

    let self = this;

    reader.addEventListener("load", function () {
      // convert image file to base64 string
      if (reader.result) {
        self.setState({ image: reader.result as string });
      }
    });

    reader.readAsDataURL(e.target.files![0]);

    console.log(this.state.image);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let alertMessage = `New Company Request\nname: ${this.state.name}\n`;
    alertMessage += `code: ${this.state.code}\n`;
    alertMessage += `address: ${this.state.address}\n`;
    alertMessage += `city: ${this.state.city}\n`;
    alertMessage += `state: ${this.state.state}\n`;
    alertMessage += `image string: ${this.state.image}\n`;
    alert(`TODO, send form to api:\n${alertMessage}`);
  };

  render() {
    return (
      <div>
        <div>
          <div className={"registerContainer"}>
            <div className={"loginregContainer"}>
              <h1>Register New Company</h1>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Label for="name" sm={3}>
                    Company Name
                  </Label>
                  <Col>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="My Excellent Company"
                      value={this.state.name}
                      onChange={this.handleStateChange}
                      sm={9}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="code" sm={3}>
                    Company Code
                  </Label>
                  <Col>
                    <Input
                      type="text"
                      name="code"
                      id="company"
                      value={this.state.code}
                      onChange={this.handleStateChange}
                      sm={9}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="checkCode" sm={3}>
                    Re-enter Code
                  </Label>
                  <Col>
                    <Input
                      type="text"
                      name="checkCode"
                      id="checkCode"
                      value={this.state.checkCode}
                      onChange={this.handleStateChange}
                      sm={9}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="address" sm={3}>
                    Address
                  </Label>
                  <Col>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      value={this.state.address}
                      onChange={this.handleStateChange}
                      sm={9}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="city" sm={3}>
                    City
                  </Label>
                  <Col>
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      value={this.state.city}
                      onChange={this.handleStateChange}
                      sm={4}
                    />
                  </Col>
                  <Label for="state" sm={2}>
                    State
                  </Label>
                  <Col>
                    <Input
                      type="select"
                      name="state"
                      id="state"
                      value={this.state.state}
                      onChange={this.handleStateChange}
                      sm={1}
                    >
                      {states.map((value) => {
                        return <option key={value}>{value}</option>;
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Button className={"submitButton"} type="submit">
                      Register
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
            <div className={"companyInfo"}>
              {this.state.image === "" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Label for="image">
                    Upload Image of Company - This Will Help Users Know They are
                    Signing Up for the Right Company
                  </Label>
                  <Input
                    style={{ border: "solid 1px black" }}
                    type="file"
                    name="image"
                    id="image"
                    onChange={this.handleFile}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={this.state.image}
                    alt="companyPhoto"
                    className={"companyInfoPic"}
                  />
                  <Label for="image">Choose a different picture</Label>
                  <Input
                    style={{ border: "solid 1px black" }}
                    type="file"
                    name="image"
                    id="image"
                    onChange={this.handleFile}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
