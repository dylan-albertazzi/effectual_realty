import React, { useEffect, useState } from "react";
import Amplify, { API } from "aws-amplify";
import { Form, Field } from "@leveluptuts/fresh";

import { Container, Row, Col, Jumbotron, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup,Label,Input } from "reactstrap";
import { Link } from "react-router-dom";
import AppNavbar from "./AppNavbar";

import { DataStore } from '@aws-amplify/datastore';
import { Home } from '../models';

export default function ManageListingPage() {
  
    const [listing, setListing] = useState([]);
    
    useEffect(() => {
        const func = async () => {
            const listings = await DataStore.query(Home)
            console.log("before listings")
            console.log(listings)
            console.log("after listings")
            setListing(listings)
        }
        

        func()
    }, [])

    const [addListingModal, setaddListingModal] = useState(false);

    const toggle = () => setaddListingModal(!addListingModal);

    const createListing = async (data) => {
        // const listing = {
        //     title
        // }
        console.log("Creating Listing")
        
        console.log("Create Listing data", data)
        console.log("Street1", data.street1)
        console.log("zipCode", data.zipCode)
        console.log("typeof", typeof(data.zipCode))

        const newListing = await DataStore.save(
            new Home({
                "MLS": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
                "Street1": data.street1,
                "Street2": data.street2,
                "City": data.city,
                "State": data.state,
                "ZipCode": data.zipCode,
                "Neighborhood": data.neighborhood,
                "SalesPrice": data.salesPrice,
                "DateListed": data.dateListed,
                "Bedrooms": data.bedrooms,
                "Photos": data.photos,
                "Bathrooms": data.bathrooms,
                "GarageSize": data.garageSize,
                "SquareFeet": data.squareFeet,
                "LotSize": data.lotSize,
                "Description": data.description
            })
        
        );
        console.log("After saveListing", newListing)
        toggle()
    }
    const securityQuestions = [
        "What is your mother's maiden name?",
        "What was the name of your first pet?",
        "What was the name of your first school?"
      ];
      
    const onSubmit = (data) => {
        console.log("==data",data);
        createListing(data)
    }

    const previousValues = {
        name: 'Brooklyn Boo',
        email: 'scott@test.com',
      }
 

  return (
    <>
      <div className="bg-gray">
        <div className="jumbotron-home">
          <div className="home-intro-bg"></div>
          <Container className="home-intro" fluid>
            <AppNavbar initialOpen={false} />
            <Jumbotron className="bg-transparent mb-0 pt-2 pb-0">

              <h1 className="jumbotron-txt">
                Manage Listings Here!
                
              </h1>
            </Jumbotron>
            
          </Container>
              </div>
              <Container>
                  <Row>
                      <Col>
                          <Button onClick={toggle}>
                              Add Listing
                        </Button>
                      </Col>
                  </Row>
              </Container>
                 <Container>
                  <Row>
                      <Col>
                          {listing.map(listing => 
                            
                            
                                  
                              <Card className="shadow">
                            {listing.hasOwnProperty("Photos") ? (
                                <CardImg
                                top
                                width="100%"
                                // src={}
                                alt="Photo not added yet"
                                className="response-img"
                                />
                                                ) : (
                                                        <p>No Image Added</p>
                                // <CardImg
                                //   top
                                //   width="100%"
                                //   src={require("../../images/river-placeholder.png")}
                                //   alt="Card image cap"
                                //   className="response-img"
                                // />
                            )}

                            <CardBody>
                                <CardTitle className="text-center mb-1">
                                
                                    <h2 className="font-weight-bold mb-0">
                                    $ {listing.SalesPrice}
                                          </h2>
                                          <h3>{listing.Bedrooms} bed | {listing.Bathrooms} ba | {listing.SquareFeet} sq.ft</h3>
                                
                                </CardTitle>
                                      <CardSubtitle className="text-center">{listing.Street1} 
                                          {listing.hasOwnProperty("Street2") ? (listing.Street2) : null}</CardSubtitle>
                                      <CardSubtitle className="text-center">Date Listed: {listing.DateListed} GarageSize: {listing.GarageSize} sq.ft</CardSubtitle>
                                      <CardSubtitle className="text-center">Lot Size: {listing.hasOwnProperty("LotSize") ? ( listing.LotSize ) : null} sq.ft Neighborhood: {listing.hasOwnProperty("Neighborhood") ? (listing.Neighborhood ) : null}</CardSubtitle>
                                      <CardText>
                                          Description: <br/>
                                          {listing.hasOwnProperty("Description") ? (listing.Description) : null}
                                      </CardText>
                                      <CardSubtitle className="text-center">
                                            {listing.MLS}
                                      </CardSubtitle >
                                      <Button className="text-center"> Edit Listing </Button>
                                      
                            </CardBody>
                            </Card>
                          )}
                          

                      </Col>
                  </Row>
              </Container>
          </div>
          
        <Modal isOpen={addListingModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Enter Details For Your Listing Here</ModalHeader>
            <ModalBody>
            <Form formId="user-profile" onSubmit={onSubmit}>
                <Field placeholder="64576 Sylvan Loop" required>Street1</Field>
                <Field placeholder="Apt. 42" >Street2</Field>
                <Field placeholder="Bend" required>City</Field>
                <Field placeholder="OR" required>State</Field>
                <Field placeholder="97701" type="number" required>Zip Code</Field>
                <Field placeholder="NW Crossing">Neighborhood</Field>
                <Field placeholder="351000" type="number" required>Sales Price</Field>
                <Field placeholder="3" type="number" required>Bedrooms</Field>
                <Field placeholder="4" type="number" required>Bathrooms</Field>
                {/* <Field type="file" >Photos</Field> */}
                <Field placeholder="mm/dd/yyyy" type="date" required>Date Listed</Field>
                <Field placeholder="300" type="number" name="garageSize" >Garage Size (sq.ft)</Field>
                <Field placeholder="2450" type="number" name="squareFeet" required>Square Feet (sq.ft)</Field>
                <Field placeholder="10000" type="number" name="lotSize" >Lot Size (sq.ft)</Field>
                <Field placeholder="A lovely Bend house." required>Description</Field>
            </Form>
                        
            </ModalBody>
            <ModalFooter>
                
            </ModalFooter>
        </Modal>
       
    </>
  );
}

