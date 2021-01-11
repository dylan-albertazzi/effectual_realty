import React, { useEffect, useState } from "react";
import { Form, Field } from "@leveluptuts/fresh";
import { Container, Row, Col, Jumbotron, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup,Label,Input } from "reactstrap";
import AppNavbar from "./AppNavbar";

import { DataStore } from '@aws-amplify/datastore';
import { Home } from '../models';

import placeholder from '../images/house-placeholder.jpg'; 
export default function ManageListingPage() {
    
    //state variables used
    const [listing, setListing] = useState([]);
    const [addListingModal, setaddListingModal] = useState(false);
    const [editListingModal, seteditListingModal] = useState(false);
    const [previousValues, setPreviousValues] = useState({})
  
    
    //updates listings on page when loaded
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

  
    //function that opens and closes the add listing modal
    const toggle = () => setaddListingModal(!addListingModal);
    
    //function that opens the edit listing modal and populates with data from entry
    const toggleEditListing = async (original) => {
   
       
        //set values to be populated in edit form
        const func = async (original) => {
            // const listings = await DataStore.query(Home)
            console.log("before listings")
            console.log(original)
            console.log("after listings")
            setPreviousValues( {
                "MLS": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
                "id": original.id,
                "street1": original.street1,
                "street2": original.street2,
                "city": original.city,
                "state": original.state,
                "zipCode": original.zipCode,
                "neighborhood": original.neighborhood,
                "salesPrice": original.salesPrice,
                "dateListed": original.dateListed,
                "bedrooms": original.bedrooms,
                "photos": original.photos,
                "bathrooms": original.bathrooms,
                "garageSize": (typeof(original.garageSize) === 'string' ? null : original.garageSize),
                "squareFeet": original.squareFeet,
                "lotSize": (typeof(original.lotSize) === 'string' ? null : original.lotSize),
                "description": original.description
            })
        }
        func(original)
        
        //toggle the edit modal
        seteditListingModal(!editListingModal)
        
    }

    //function that closes the edit listing modal
    const toggleEditListingOff = () => seteditListingModal(!editListingModal);

    const deleteListing = async (id) => {
        //delete item with given id in datastore
        const modelToDelete = await DataStore.query(Home, id);
        DataStore.delete(modelToDelete);

        //update results on page
        const func = async () => {
            const listings = await DataStore.query(Home)
            console.log("before listings")
            console.log(listings)
            console.log("after listings")
            setListing(listings)
        }

        func()
    }
    

    const createListing = async (data) => {
        //make a new listing and save to data store
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
                "GarageSize": (typeof(data.garageSize) === 'string' ? null : data.garageSize),
                "SquareFeet": data.squareFeet,
                "LotSize": (typeof(data.lotSize) === 'string' ? null : data.lotSize),
                "Description": data.description
            })
        
        );
        
        //close the create listing modal
        toggle()

        //update results on page
        const func = async () => {
            const listings = await DataStore.query(Home)
            console.log("before listings")
            console.log(listings)
            console.log("after listings")
            setListing(listings)
        }
        
        func()
    }

    //fired when add listing form is submitted
    const onSubmit = (data) => {
        console.log("==data",data);
        createListing(data)
    }

    const editListing = async (newVals) => {
      
        const original = await DataStore.query(Home, newVals.id);
        console.log("==original edit listing:", original)
        await DataStore.save(Home.copyOf(original, item => {
            // Update the values on {item} variable to update DataStore entry
            item.Street1 = newVals.street1
            item.Street2 = newVals.street2
            item.City = newVals.city
            item.State = newVals.state
            item.ZipCode = newVals.zipCode
            item.Neighborhood = newVals.neighborhood
            item.SalesPrice = newVals.salesPrice
            item.DateListed = newVals.dateListed
            item.Bedrooms = newVals.bedrooms
            item.Photos = newVals.photos
            item.Bathrooms = newVals.bathrooms
            item.GarageSize = (typeof(newVals.garageSize) === 'string' ? null : newVals.garageSize)
            item.SquareFeet = newVals.squareFeet
            item.LotSize = (typeof(newVals.lotSize) === 'string' ? null : newVals.lotSize)
            item.Description = newVals.description
        }));

        //Close edit listing modal
        toggleEditListingOff()
        //Update Results on page
        const func = async () => {
            const listings = await DataStore.query(Home)
            console.log("before listings")
            console.log(listings)
            console.log("after listings")
            setListing(listings)
        }
        
        func()
    }

    //fired when edit listing form is submitted
    const onSubmitEditListing = (data) => {
        console.log("==data",data);
        editListing(data)
    }

 

  return (
    <>
      <div className="bg-gray">
        <div className="jumbotron-home">
          <div className="home-intro-bg"></div>
          <Container className="home-intro px-0" fluid>
            <AppNavbar initialOpen={false} />
            <Jumbotron className="bg-transparent mb-0 pt-2 pb-0 text-center mt-4">

              <h1 className="jumbotron-txt">
                Manage Listings Here!
                
              </h1>
            </Jumbotron>
            
          </Container>
              </div>
              <Container>
                  <Row className="my-4">
                      <Col className="d-flex justify-content-center">
                          <Button className="bg-success" onClick={toggle}>
                              Add Listing
                        </Button>
                      </Col>
                  </Row>
              </Container>
                 <Container>
                  <Row className="justify-content-around">
                      
                          {listing.slice(0).reverse().map(listing => 
                             <Col xs="5" className="m-2 my-4">
                            
                                  
                              <Card className="shadow">
                            {listing.hasOwnProperty("Photos") ? (
                                <CardImg
                                top
                                width="100%"
                                src={placeholder}
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
                                <CardTitle className="text-center mb-1 d-flex justify-content-between card-top-line">
                                
                                    <h2 className="font-weight-bold mb-0">
                                    $ {listing.SalesPrice}
                                          </h2>
                                          <h2>{listing.Bedrooms} bed | {listing.Bathrooms} ba | {listing.SquareFeet} sq.ft</h2>
                                
                                </CardTitle>
                                      <CardSubtitle className="card-txt my-3 d-flex justify-content-between">{listing.Street1} 
                                          {listing.hasOwnProperty("Street2") ? (listing.Street2) : null} {' '}{listing.City} {' '}{listing.State} {' '} {listing.ZipCode}</CardSubtitle>
                                      <CardSubtitle className="card-text my-3"><span>Date Listed: {listing.DateListed} </span><span>GarageSize: {listing.GarageSize} sq.ft</span></CardSubtitle>
                                      <CardSubtitle className="card-text my-3"><span>Lot Size: {listing.hasOwnProperty("LotSize") ? ( listing.LotSize ) : null} sq.ft </span><span>Neighborhood: {listing.hasOwnProperty("Neighborhood") ? (listing.Neighborhood ) : null}</span></CardSubtitle>
                                      <CardText>
                                          <strong>Description: </strong><br/>
                                          {listing.hasOwnProperty("Description") ? (listing.Description) : null}
                                      </CardText>
                                      <CardSubtitle className="card-text my-3">
                                      <span>MLS:  {listing.id}</span>
                                      </CardSubtitle >
                                     <div className="d-flex justify-content-around">
                                      <Button className="bg-warning" onClick={()=>toggleEditListing({id: listing.id, salesPrice: listing.SalesPrice, 
                                        bedrooms: listing.Bedrooms, bathrooms: listing.Bathrooms, squareFeet: listing.SquareFeet, 
                                        street1: listing.Street1, street2: listing.Street2, dateListed: listing.DateListed, 
                                        garageSize: listing.GarageSize, lotSize: listing.LotSize, neighborhood: listing.Neighborhood, 
                                        description: listing.Description, city: listing.City, state: listing.State, zipCode: listing.ZipCode})} className="text-center"> Edit Listing </Button>
                                      <Button onClick={()=>deleteListing(listing.id)} className="text-center bg-danger"> Delete Listing </Button>
                                      </div>
                            </CardBody>
                            </Card>
                            </Col>
                          )}
                          

                      
                  </Row>
              </Container>
          </div>
          {/* <Form formId="defaults" onSubmit={onSubmit} defaultValues={defaultValues}>
      <Field>Name</Field>
      <Field type="email">Email</Field>
      <Field>Two Words</Field>
    </Form> */}
          
        <Modal isOpen={addListingModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Enter Details For Your Listing Here</ModalHeader>
            <ModalBody>
            <Form formId="user-profile" cancelAction={toggle} onSubmit={onSubmit}>
                <Field placeholder="64576 Sylvan Loop" name="street1" required>Street1</Field>
                <Field placeholder="Apt. 42" >Street2</Field>
                <Field placeholder="Bend" required>City</Field>
                <Field placeholder="OR" required>State</Field>
                <Field placeholder="97701" required>Zip Code</Field>
                <Field placeholder="NW Crossing">Neighborhood</Field>
                <Field placeholder="351000" type="number" required>Sales Price</Field>
                <Field placeholder="3" type="number" required>Bedrooms</Field>
                <Field placeholder="4" type="number" required>Bathrooms</Field>
                {/* <Field type="file" >Photos</Field> */}
                <Field placeholder="mm/dd/yyyy" type="date" required>Date Listed</Field>
                <Field placeholder="300" type="number" name="garageSize" required>Garage Size (sq.ft)</Field>
                <Field placeholder="2450" type="number" name="squareFeet" required>Square Feet (sq.ft)</Field>
                <Field placeholder="10000" type="number" name="lotSize" required>Lot Size (sq.ft)</Field>
                <Field placeholder="A lovely Bend house." required>Description</Field>
            </Form>
                        
            </ModalBody>
            <ModalFooter>
                
            </ModalFooter>
        </Modal>
       
        <Modal isOpen={editListingModal}  toggle={toggleEditListing}>
            <ModalHeader toggle={toggleEditListing}>Edit Your Listing Here</ModalHeader>
            <ModalBody>
            <Form formId="defaults" cancelAction={toggleEditListingOff} defaultValues={previousValues} onSubmit={onSubmitEditListing}>
                <Field placeholder="64576 Sylvan Loop" required>Street1</Field>
                <Field placeholder="Apt. 42" >Street2</Field>
                <Field placeholder="Bend" required>City</Field>
                <Field placeholder="OR" required>State</Field>
                <Field placeholder="97701" required>Zip Code</Field>
                <Field placeholder="NW Crossing">Neighborhood</Field>
                <Field placeholder="351000" type="number" required>Sales Price</Field>
                <Field placeholder="3" type="number" required>Bedrooms</Field>
                <Field placeholder="4" type="number" required>Bathrooms</Field>
                {/* <Field type="file" >Photos</Field> */}
                <Field placeholder="mm/dd/yyyy" type="date" required>Date Listed</Field>
                <Field placeholder="300" type="number" name="garageSize" required>Garage Size (sq.ft)</Field>
                <Field placeholder="2450" type="number" name="squareFeet" required>Square Feet (sq.ft)</Field>
                <Field placeholder="10000" type="number" name="lotSize" required>Lot Size (sq.ft)</Field>
                <Field placeholder="A lovely Bend house." required>Description</Field>
            </Form>
                        
            </ModalBody>
            <ModalFooter>
                
            </ModalFooter>
        </Modal>
    </>
  );
}

