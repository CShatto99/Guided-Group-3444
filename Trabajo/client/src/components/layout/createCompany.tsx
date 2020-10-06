import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import "./layoutStyles.css";
import states from "../../json/states.json";
import Axios from "axios";

// Interface for defining props for CreateCompany page
interface createCompanyProps {}

/* The CreateCompany component is rendered when a user wants to
 * create a new company.
 */
export const CreateCompany: React.FC<createCompanyProps> = () => {
  //State variables
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Select State");
  const [zip, setZip] = useState("");
  const [code, setCode] = useState("");
  const [checkCode, setCheckCode] = useState("");
  const [image, setImage] = useState("");

  /* Function:    handleFile
   * Parameters:  e: React.ChangeEvent<HTMLInputElement> - event from HTML form
   * Return:      void
   * Purpose:     This function is called when a user inputs an image file into
   *              the add image form element.  It then reads the file's contents
   *              and updates the image state variable to a base64 encoded version
   *              of the image.
   */
  let handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    //reader is needed for reading the file
    const reader = new FileReader();

    //event listener that is called when file is read
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      if (reader.result) {
        setImage(reader.result as string);
      }
    });

    //read the file
    reader.readAsDataURL(e.target.files![0]);
  };

  /* Function:    handleSubmit
   * Parameters:  e: React.ChangeEvent<HTMLInputElement> - event from HTML form
   * Return:      void
   * Purpose:     This function is called when the user submits the form.  It
   *              creates the json object that is expected by the createCompany
   *              endpoint on the API server, then requests the server to add the
   *              company.  If the result is a failure, it updates the variables
   *              that will inform the user of the errors.  If the result is a success
   *              the user is informed.
   */
  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //create request object
    let requestObject: Object = {
      name: name,
      address: address + "\n" + city + ", " + state + "  " + zip,
      code: code,
      codeCheck: checkCode,
      image: image,
    };

    //convert  object to json string
    let requestJson: string = JSON.stringify(requestObject);

    //TODO remove this once implemented
    alert(`TODO, send form to api:\n${requestJson}`);

    //make api call
    Axios.post("localhost:5000/createCompany", requestJson)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //return html form
  return (
    <div>
      <div>
        <div className={"registerContainer"}>
          <div className={"formContainer"}>
            <h1>Register New Company</h1>
            <Form
              onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
            >
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
                    required
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
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
                    name="address"
                    id="address"
                    placeholder="Company Address"
                    required
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
                    name="city"
                    id="city"
                    placeholder="Company City"
                    required
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
                    name="state"
                    id="state"
                    value={state}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setState(e.target.value)
                    }
                    sm={1}
                  >
                    {states.map((value) => {
                      return <option key={value}>{value}</option>;
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="zip" sm={3}>
                  Zipcode
                </Label>
                <Col>
                  <Input
                    type="text"
                    name="zip"
                    id="zip"
                    placeholder="00000"
                    required
                    value={zip}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setZip(e.target.value)
                    }
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
                    type="password"
                    name="code"
                    id="company"
                    placeholder="************"
                    required
                    value={code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCode(e.target.value)
                    }
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
                    type="password"
                    name="checkCode"
                    id="checkCode"
                    placeholder="************"
                    required
                    value={checkCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCheckCode(e.target.value)
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
            {image === "" ? (
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFile(e)
                  }
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
                  src={image}
                  alt="companyPhoto"
                  className={"companyInfoPic"}
                />
                <Label for="image">Choose a different picture</Label>
                <Input
                  style={{ border: "solid 1px black" }}
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFile(e)
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
