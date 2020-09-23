import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import states from "../../json/states.json";
import { register } from "../../store/user";

/* Interface for defining props for Register page
 */
interface RegisterProps {}

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

export const Register: React.FC<RegisterState> = () => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState<RegisterState["fullName"]>("");
  const [email, setEmail] = useState<RegisterState["email"]>("");
  const [phone, setPhone] = useState<RegisterState["phone"]>(5555555555);
  const [company, setCompany] = useState<RegisterState["company"]>("");
  const [companyCode, setCompanyCode] = useState<RegisterState["companyCode"]>(
    1234
  );
  const [address, setAddress] = useState<RegisterState["address"]>("");
  const [city, setCity] = useState<RegisterState["city"]>("");
  const [state, setState] = useState<RegisterState["state"]>("");
  const [password, setPassword] = useState<RegisterState["password"]>("");
  const [confirmPassword, setConfirmPassword] = useState<
    RegisterState["confirmPassword"]
  >("");
  const [companyImage, setCompanyImage] = useState<
    RegisterState["companyImage"]
  >("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let alertMessage = `name: ${fullName}\n`;
    alertMessage += `email: ${email}\n`;
    alertMessage += `phone: ${phone}\n`;
    alertMessage += `company: ${company}\n`;
    alertMessage += `company code: ${companyCode}\n`;
    alertMessage += `address: ${address}\n`;
    alertMessage += `city: ${city}\n`;
    alertMessage += `state: ${state}\n`;
    alertMessage += `password: ${password}\n`;
    alert(`TODO, send form to api:\n${alertMessage}`);

    const user = {
      fullName,
      email,
      phone,
      company,
      companyCode,
      address,
      city,
      state,
      password,
      confirmPassword,
      companyImage,
    };

    dispatch(register(user));
  };

  return (
    <div>
      <div className={"mainContentArea"}>
        <div className={"registerContainer"}>
          <div className={"loginregContainer"}>
            <h1>Register</h1>
            <Form onSubmit={e => handleSubmit(e)}>
              <FormGroup row>
                <Label for="name" sm={3}>
                  Full Name
                </Label>
                <Col>
                  <Input
                    type="text"
                    name="Name"
                    id="name"
                    placeholder="Bobby Bobberson"
                    value={fullName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFullName(e.target.value)
                    }
                    sm={9}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="email" sm={3}>
                  Email
                </Label>
                <Col>
                  <Input
                    type="email"
                    name="Email"
                    id="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    sm={9}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="phone" sm={3}>
                  Phone
                </Label>
                <Col>
                  <Input
                    type="tel"
                    name="Phone"
                    id="phone"
                    placeholder="8175555555"
                    value={phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPhone(parseInt(e.target.value))
                    }
                    sm={9}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="company" sm={3}>
                  Company
                </Label>
                <Col>
                  <Input
                    type="select"
                    name="Company"
                    id="company"
                    value={company}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCompany(e.target.value)
                    }
                    sm={9}
                  >
                    <option>Select Company</option>
                    <option>TODO make this pull from web request</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="companyCode" sm={3}>
                  Company Code
                </Label>
                <Col>
                  <Input
                    type="text"
                    name="CompanyCode"
                    id="companyCode"
                    value={companyCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCompanyCode(parseInt(e.target.value))
                    }
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
                    name="Address"
                    id="address"
                    value={address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAddress(e.target.value)
                    }
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
                    name="City"
                    id="city"
                    value={city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCity(e.target.value)
                    }
                    sm={4}
                  />
                </Col>
                <Label for="state" sm={2}>
                  State
                </Label>
                <Col>
                  <Input
                    type="select"
                    name="State"
                    id="state"
                    value={state}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setState(e.target.value)
                    }
                    sm={1}
                  >
                    {states.map(value => {
                      return <option key={value}>{value}</option>;
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" sm={3}>
                  Password
                </Label>
                <Col>
                  <Input
                    type="password"
                    name="Password"
                    id="password"
                    placeholder="myPassword123!"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    sm={9}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="confirmpassword" sm={3}>
                  Confirm Password
                </Label>
                <Col>
                  <Input
                    type="password"
                    name="ConfirmPassword"
                    id="confirmpassword"
                    placeholder="myPassword123!"
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setConfirmPassword(e.target.value)
                    }
                    sm={9}
                  />
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
            <img
              src={companyImage}
              alt="companyPhoto"
              className={"companyInfoPic"}
            />
            <p>
              {company === "Select Company"
                ? "Please Select Company From List"
                : "TODO pull company address/info from web request"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
