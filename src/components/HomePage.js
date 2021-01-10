import React, { useEffect, useState } from "react";
import { Form, Field } from "@leveluptuts/fresh";
import { Container, Row, Col, Jumbotron, Button,InputGroup, InputGroupAddon, InputGroupText,Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup,Label,Input } from "reactstrap";
import AppNavbar from "./AppNavbar";

import { DataStore } from '@aws-amplify/datastore';
import { Home } from '../models';




export default function HomePage() {
  //state variables used
  const [listing, setListing] = useState([]);
  const [addListingModal, setaddListingModal] = useState(false);
  const [editListingModal, seteditListingModal] = useState(false);
  const [previousValues, setPreviousValues] = useState({})

  const [numBedsMin, setnumBedsMin] = useState(0)
  const [numBedsMax, setnumBedsMax] = useState(100)
  const [numBathroomsMin, setnumBathroomsMin] = useState(0)
  const [numBathroomsMax, setnumBathroomsMax] = useState(100)
  const [sqftMin, setSqftMin] = useState(0)
  const [sqftMax, setSqftMax] = useState(10000000)
  const [city, setCity] = useState("")
  const [MLS, setMLS] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState(0)
  
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
      
  },[])
  useEffect(() => {
    const func = async () => {
        const listings = await DataStore.query(Home)
        console.log("before listings")
        console.log(listings)
        console.log("after listings")
        setListing(listings)
    }
    

    func()
    console.log("ues effect city")
    
},[city])
//   useEffect(() => {
//     const func = async () => {
//         const listings = await DataStore.query(Home)
//         console.log("before listings")
//         console.log(listings)
//         console.log("after listings")
//         setListing(listings)
//     }
    

//     func()
// },[])


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
  
  //update values when change happens
  useEffect(() => {updateFilters()}, [city])
  useEffect(() => {updateFilters()}, [sqftMax])
  useEffect(() => {updateFilters()}, [sqftMin])
  useEffect(() => {updateFilters()}, [numBedsMax])
  useEffect(() => {updateFilters()}, [numBedsMin])

  const onChangeBedsMin = (event) => {
    setnumBedsMin(event.target.value);
    // updateFilters()
  };
  const onChangeBedsMax = (event) => {
    setnumBedsMax(event.target.value);
    
    // updateFilters()
  };

  const onChangeSqftMin = (event) => {
    setSqftMin(event.target.value);
    // updateFilters()
  };
  const onChangeSqftMax = (event) => {
    setSqftMax(event.target.value);
    
    // updateFilters()
  };

  const onChangeCity = async (event) => {

    setCity(event.target.value)
    
  };
  
  
 


 const updateFilters = () => {
  // const listings = await DataStore.query(Home, c => c.Bedrooms("gt", numBedsMin));
  // console.log(listings);

  const func = async () => {
    const listings = await DataStore.query(Home, c => c.Bedrooms("ge", numBedsMin).Bedrooms("le", numBedsMax).SquareFeet("ge", sqftMin).SquareFeet("le", sqftMax).City("beginsWith", city));
    console.log(listings);
    setListing(listings)
    }


  func()
  console.log("updated filters")

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
              Search Listings Here!
              
            </h1>
          </Jumbotron>
          
        </Container>
            </div>
            <Container>
                <Row>
                    <Col>
                        <Button >
                            Reset Filters
                      </Button>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">#</InputGroupAddon>
                        <Input placeholder="# Bedrooms" min={0} max={100} type="number" step="1" />
                        
                    </InputGroup>
                    <label>
                      # Bedrooms Min.
                      <input type="number" value={numBedsMin} onChange={onChangeBedsMin} />
                    </label>
                    <label>
                      # Bedrooms Max.
                      <input type="number" value={numBedsMax} onChange={onChangeBedsMax} />
                    </label>
                    <label>
                      Square Feet Min.
                      <input type="number" value={sqftMin} onChange={onChangeSqftMin} />
                    </label>
                    <label>
                      Square Feet Max.
                      <input type="number" value={sqftMax} onChange={onChangeSqftMax} />
                    </label>
                    <label>
                      City
                      <input type="text" value={city} onChange={onChangeCity} />
                    </label> {city}
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
                          
                          )}

                          <CardBody>
                              <CardTitle className="text-center mb-1">
                              
                                  <h2 className="font-weight-bold mb-0">
                                  $ {listing.SalesPrice}
                                        </h2>
                                        <h3>{listing.Bedrooms} bed | {listing.Bathrooms} ba | {listing.SquareFeet} sq.ft</h3>
                              
                              </CardTitle>
                                    <CardSubtitle className="text-center">{listing.Street1} 
                                        {listing.hasOwnProperty("Street2") ? (listing.Street2) : null} {' '}{listing.City} {' '}{listing.State} {' '} {listing.ZipCode}</CardSubtitle>
                                    <CardSubtitle className="text-center">Date Listed: {listing.DateListed} GarageSize: {listing.GarageSize} sq.ft</CardSubtitle>
                                    <CardSubtitle className="text-center">Lot Size: {listing.hasOwnProperty("LotSize") ? ( listing.LotSize ) : null} sq.ft Neighborhood: {listing.hasOwnProperty("Neighborhood") ? (listing.Neighborhood ) : null}</CardSubtitle>
                                    <CardText>
                                        Description: <br/>
                                        {listing.hasOwnProperty("Description") ? (listing.Description) : null}
                                    </CardText>
                                    <CardSubtitle className="text-center">
                                          <p>MLS:  {listing.id}</p> 
                                    </CardSubtitle >
                                   
                          </CardBody>
                          </Card>
                        )}
                        

                    </Col>
                </Row>
            </Container>
        </div>
       
  </>
);
}