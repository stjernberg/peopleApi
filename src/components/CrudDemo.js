import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import Details from "./Details";
import PeopleList from "./PeopleList";
import { useForm } from "react-hook-form";
import { Wrapper } from "../Styling";

const CrudDemo = () => {
  const [people, setPeople] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const baseURL = "https://localhost:44342/People/";

  useEffect(() => {
    getPeople();
  }, [baseURL]);

  const getPeople = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        setPeople(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };
  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  //Maps the people array and send each object to Peoplelis, to be displayed on the page.
  const TableRow = () => {
    return (
      <>
        <tbody>
          {people.map((person) => (
            <PeopleList
              {...person}
              key={person.id}
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              getPeople={getPeople}
            />
          ))}
        </tbody>
      </>
    );
  };

  //Adds new people to the people-array, ny posting the user's input.
  const AddPeople = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
      console.log("DATA: ", data);
      const newPerson = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        title: data.title,
      };

      const savePerson = async () => {
        await axios
          .post(baseURL, newPerson)
          .then((response) => {
            setPeople([...people, newPerson]);
            getPeople();
            console.log(response.data);
          })
          .catch((err) => {
            console.log("ERROR", err);
          });
      };
      savePerson();
    };

    //Shows the form used for editing people.
    return (
      <>
        <h2 className="mt-3 text-center">Add new person</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicText">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              {...register("firstName", { required: true, minLength: 2 })}
            />
            {errors.firstName && (
              <span className="text-danger">First name is Required!</span>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-2">Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              {...register("lastName", { required: true, minLength: 2 })}
            />
            {errors.lastName && (
              <span className="text-danger">Lost name is Required!</span>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-2">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <span className="text-danger">
                Correct email format is Required!
              </span>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-2">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
            />
          </Form.Group>
          <div className="text-center mt-3">
            <Button variant="info" type="submit">
              Add person
            </Button>
          </div>
        </Form>
      </>
    );
  }; //End of AddPeople

  //Returns the different components of the CrudDemo page.
  return (
    <Wrapper>
      <h1 className="mb-4 text-center">People list</h1>
      <Table striped bordered hover>
        <TableHeader />
        <TableRow />
      </Table>
      <Details showDetails={showDetails} setShowDetails={setShowDetails} />
      <AddPeople />
    </Wrapper>
  );
}; //End of CrudDemo

export default CrudDemo;
