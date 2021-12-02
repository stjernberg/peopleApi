import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Wrapper } from "../Styling";

//Edits the person clicked on.
const Edit = () => {
  const { id } = useParams();
  const [person, setPerson] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    title: "",
  });

  const history = useHistory();
  const detailURL = `https://localhost:44342/People/${id}`;
  const URL = "https://localhost:44342/People/";

  //Fetches the details of the chosen person so that the values in the form can be preset.
  useEffect(() => {
    const getDetails = async () => {
      await axios
        .get(detailURL)
        .then((response) => {
          setPerson(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    };
    getDetails();
  }, [detailURL]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //The values to be preset.
  let fields = ["firstName", "lastName", "email", "title"];
  fields.forEach((field) => setValue(field, person[field]));

  const onSubmit = (data) => {
    console.log("DATA: ", data);
    const edPerson = {
      id: person.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      title: data.title,
    };

    //Makes a put request to change chosen details.
    const editPerson = async () => {
      await axios
        .put(URL, edPerson)
        .then((res) => {
          console.log("RES:", res);
          if (res.status === 204) {
            console.log("Person is deleted!");
          } else {
            console.log("API ERROR");
          }
        })
        .catch((err) => {
          console.log("ERR", err);
        });
    };

    editPerson();
    //go back to the people's list and refresh the page.
    history.push("/crud");
    window.location.reload();
  };

  //Shows the form used to edit a person.
  return (
    <>
      <Wrapper>
        <h2 className="mt-3 text-center">edit person</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicText">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              name="firstName"
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
            <Button variant="warning" type="submit">
              Edit
            </Button>
          </div>
        </Form>
      </Wrapper>
    </>
  );
};

export default Edit;
