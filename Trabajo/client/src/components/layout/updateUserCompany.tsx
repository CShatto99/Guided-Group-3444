import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "./layoutStyles.css";
import states from "../../json/states.json";
import Axios from "axios";
import { idText } from "typescript";

// Interface for defining props for CreateCompany page
interface updateUserCompanyProps {}

interface CompanyInfo {
  name: string;
  address: string;
  id: string;
  image: string;
}

/* The CreateCompany component is rendered when a user wants to
 * create a new company.
 */
export const UpdateUserCompany: React.FC<updateUserCompanyProps> = () => {
  //State variables
  const [ID, setID] = useState("");
  const [name, setName] = useState("Select Company");
  const [code, setCode] = useState("");
  const [image, setImage] = useState("/images/defaultCompany.png");
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);
  const [companiesLoaded, setCompaniesLoaded] = useState(false);

  useEffect(() => {
    if (!companiesLoaded) {
      setCompanies([
        {
          name: "Select Company",
          address: "",
          id: "",
          image: "/images/defaultCompany.png",
        },
        {
          name: "company1",
          address: "111 test drive\ntest, ts  1",
          id: "1234ABC",
          image: "https://static.thenounproject.com/png/88781-200.png",
        },
        {
          name: "company2",
          address: "222 test drive\ntest, ts  2",
          id: "2345BCD",
          image:
            "https://pngimage.net/wp-content/uploads/2018/06/firm-icon-png-8.png",
        },
        {
          name: "company3",
          address: "333 test drive\ntest, ts  3",
          id: "3456CDE",
          image:
            "https://www.sgrsportsmanagement.com/wp-content/uploads/2019/12/company-d23ad282fb3350d9eab92ce12076a274.png",
        },
        {
          name: "company4",
          address: "444 test drive\ntest, ts  4",
          id: "4567DEF",
          image: "",
        },
      ]);
      setCompaniesLoaded(true);
    }
    companies.forEach(company => {
      if (company.name === name) {
        setImage(company.image);
        setID(company.id);
      }
    });
  }, [name]);

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
      id: ID,
      code: code,
    };

    //convert  object to json string
    let requestJson: string = JSON.stringify(requestObject);

    //TODO remove this once implemented
    alert(`TODO, send form to api:\n${requestJson}`);
  };

  //return html form
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={"registerContainer"}>
          <div className={"formContainer"}>
            <h1>Register New Company</h1>
            <Form
              onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
            >
              <FormGroup row>
                <Label for="companies" sm={3}>
                  Select Company
                </Label>
                <Col>
                  <Input
                    type="select"
                    name="companies"
                    id="companies"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                    sm={9}
                  >
                    {companies.map(val => {
                      return <option key={val.name}>{val.name}</option>;
                    })}
                  </Input>
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
              <FormGroup row style={{alignItems: "center", justifyContent: "center"}}>
                <Button className={"submitButton"} type="submit">
                  Register
                </Button>
              </FormGroup>
            </Form>
          </div>
          <div className={"companyInfo"}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={image === "" ? "/images/defaultCompany.png" : image}
                alt="companyPhoto"
                className={"companyInfoPic"}
                style={{ minHeight: "50vh" }}
              />
            </div>
          </div>
        </div>
        <div
          className={"formContainer"}
          style={{
            display: "flex",
            width: "auto",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          <h3>Is your company not listed? Create it here:</h3>
          <Button
            style={{ marginLeft: "15px" }}
            className={"navButton"}
            href="/userHome/createCompany"
          >
            Create Company
          </Button>
        </div>
      </div>
    </div>
  );
};
