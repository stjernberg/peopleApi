import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Card, CardContent } from "../Styling";

const Details = (props) => {
  const { id } = useParams();
  const [thePerson, setThePerson] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    title: "",
  });

  const detailURL = `https://localhost:44342/People/${id}`;
  useEffect(() => {
    const getDetails = async () => {
      await axios
        .get(detailURL)
        .then((response) => {
          setThePerson(response.data);
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    };
    getDetails();
  }, [detailURL]);

  return (
    <>
      {props.showDetails && (
        <Card>
          <div className="card-header bg-info text-white">
            Person Information
          </div>
          <CardContent>
            <h2>{thePerson.title}</h2>
            <p>
              <span>Id: </span>
              {thePerson.id}
            </p>
            <p>
              <span>Name: </span>
              {thePerson.firstName} {thePerson.lastName}
            </p>

            <p>
              <span>Email: </span>
              {thePerson.email}
            </p>
            <Button
              variant="info"
              onClick={() => props.setShowDetails(!props.showDetails)}
            >
              Hide
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Details;
