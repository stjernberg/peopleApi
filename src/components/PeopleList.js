import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

//Displays the list of people and buttons to display details, delete or edit a specific person.
const PeopleList = (props) => {
  const history = useHistory();

  const personDetails = () => {
    props.setShowDetails(!props.showDetails);
    history.push(`/details/${props.id}`);
  };
  const deletePerson = () => {
    const deleteURL = `https://localhost:44342/People/${props.id}`;

    //Deletes a person with matched id, by making a delete request.
    const personToDelete = async () => {
      await axios
        .delete(deleteURL)
        .then((res) => {
          console.log("RES:", res);
          if (res.status === 202) {
            console.log("Person is deleted!");
            props.getPeople();
          } else {
            console.log("API ERROR");
          }
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    };
    personToDelete();
  };

  //Displays a table with all the people.
  return (
    <>
      <tr>
        <td>{props.id}</td>
        <td>
          {props.firstName} {props.lastName}
        </td>
        <td>{props.email}</td>
        <td>
          <Button
            className="me-1"
            variant="info"
            onClick={() => {
              personDetails();
            }}
          >
            Details
          </Button>
          <Button
            className="me-1"
            variant="danger"
            onClick={() => {
              deletePerson();
            }}
          >
            Delete
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              history.push(`/edit/${props.id}`);
            }}
          >
            Edit
          </Button>
        </td>
      </tr>
    </>
  );
};

export default PeopleList;
