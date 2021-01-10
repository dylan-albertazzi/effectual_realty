import React, { useEffect } from "react";
import Amplify, { API } from "aws-amplify";
import { Container, Row, Col, Jumbotron, Button } from "reactstrap";

// import "animate.css/animate.css";


import { Link } from "react-router-dom";
import AppNavbar from "./AppNavbar";



export default function HomePage() {
  const apiName = "submitForm";
  const path = "/submit";
  const myInit = {
    // OPTIONAL
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {
      // OPTIONAL
      name: "param",
    },
  };
//   useEffect(() => {
//     console.log("made it to insert survey monkey")
//   const script = document.createElement('script');

//   script.src = "https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd9myoxaykD4Nric6MRtsFnioEt14hFYoTMcoGgbOon83.js";
//   script.async = true;

//   document.body.appendChild(script);

//   return () => {
//     document.body.removeChild(script);
//      console.log("Inserted survey monkey")
//   }
// }, []);
 

  return (
    <>
      <div className="bg-gray">
        <div className="jumbotron-home">
          <div className="home-intro-bg"></div>
          <Container className="home-intro" fluid>
            <AppNavbar initialOpen={false} />
            <Jumbotron className="bg-transparent mb-0 pt-2 pb-0">
              {/* <h1 className="jumbotron-txt">
                Coming to Bend?
                <br />
                Eat Local!
              </h1> */}
              <h1 className="jumbotron-txt">
                Get a superb restaurant recommendation
                <br />
                in 2 minutes!
              </h1>
            </Jumbotron>
            
          </Container>
              </div>
              </div>
       
    </>
  );
}
