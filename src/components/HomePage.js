import React, { useEffect, useState } from "react";

import { Container, Row, Col, Jumbotron, Button,Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from "reactstrap";
import AppNavbar from "./AppNavbar";

import { DataStore } from '@aws-amplify/datastore';
import { Home } from '../models';

import placeholder from '../images/house-placeholder.jpg'; 



export default function HomePage() {
  //state variables used
  const [listing, setListing] = useState([]);
 

  const [numBedsMin, setnumBedsMin] = useState(0)
  const [numBedsMax, setnumBedsMax] = useState(100)
  const [numBathroomsMin, setNumBathroomsMin] = useState(0)
  const [numBathroomsMax, setNumBathroomsMax] = useState(100)
  const [sqftMin, setSqftMin] = useState(0)
  const [sqftMax, setSqftMax] = useState(10000000)
  const [city, setCity] = useState("")
  const [MLS, setMLS] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [id, setId] = useState("")
  
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
  
  //update values when change happens
  useEffect(() => {updateFilters()}, [city])
  useEffect(() => {updateFilters()}, [sqftMax])
  useEffect(() => {updateFilters()}, [sqftMin])
  useEffect(() => {updateFilters()}, [numBedsMax])
  useEffect(() => {updateFilters()}, [numBedsMin])
  useEffect(() => {updateFilters()}, [numBathroomsMin])
  useEffect(() => {updateFilters()}, [numBathroomsMax])
  useEffect(() => {updateFilters()}, [MLS])
  useEffect(() => {updateFilters()}, [id])
  useEffect(() => {updateFilters()}, [state])
  useEffect(() => {updateFilters()}, [zipCode])

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
  const onChangeNumBathroomsMin = async (event) => {
    setNumBathroomsMin(event.target.value)
  };
  const onChangeNumBathroomsMax = async (event) => {
    setNumBathroomsMax(event.target.value)
  };
  const onChangeMLS = async (event) => {
    setMLS(event.target.value)
  };
  const onChangeState = async (event) => {
    setState(event.target.value)
  };
  const onChangeZipCode = async (event) => {
    setZipCode(event.target.value)
  };
  const onChangeId = async (event) => {
    setId(event.target.value)
  };


 const resetFilters = () => {
  setnumBedsMin(0)
  setnumBedsMax(100)
  setNumBathroomsMin(0)
  setNumBathroomsMax(100)
  setSqftMin(0)
  setSqftMax(10000000)
  setCity("")
  setMLS("")
  setState("")
  setZipCode("")
  setId("")

 }


 const updateFilters = () => {

  const func = async () => {
    const listings = await DataStore.query(Home, c => c.Bedrooms("ge", numBedsMin)
    .Bedrooms("le", numBedsMax).SquareFeet("ge", sqftMin).SquareFeet("le", sqftMax)
    .City("beginsWith", city).Bathrooms("ge",numBathroomsMin).Bathrooms("le",numBathroomsMax)
    .id("beginsWith", id).State("beginsWith", state).ZipCode("beginsWith", zipCode));

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
        <Container className="home-intro px-0" fluid>
          <AppNavbar initialOpen={false} />
          <Jumbotron className="bg-transparent mb-0 pt-2 pb-0 text-center my-4">
            <h1 className="jumbotron-txt">
              Search Listings Here!
            </h1>
          </Jumbotron>
          
        </Container>
            </div>
            <Container>
                <Row className="my-2">
                    <Col className="d-flex justify-content-between filter-section"> 
                    <label>
                      <span># Bedrooms Min.</span>{' '}
                      <input type="number" value={numBedsMin} onChange={onChangeBedsMin} />
                    </label>
                    <label>
                      <span># Bedrooms Max.</span>{' '}
                      <input type="number" value={numBedsMax} onChange={onChangeBedsMax} />
                    </label>

                    </Col>
                    </Row>
                    <Row className="my-2">
                      <Col className=" d-flex justify-content-between filter-section">
                      <label>
                      <span>Square Feet Min.</span>{' '}
                      <input type="number" value={sqftMin} onChange={onChangeSqftMin} />
                    </label>
                    <label>
                      <span>Square Feet Max.</span>{' '}
                      <input type="number" value={sqftMax} onChange={onChangeSqftMax} />
                    </label>
                      </Col>
                    </Row>
                   <Row className="my-2">
                     <Col className="d-flex justify-content-between filter-section">
                     <label>
                      <span># Bathrooms Min.</span>{' '}
                      <input type="text" value={numBathroomsMin} onChange={onChangeNumBathroomsMin} />
                    </label> 
                    <label>
                      <span># Bathrooms Max.</span>{' '}
                      <input type="text" value={numBathroomsMax} onChange={onChangeNumBathroomsMax} />
                    </label> 
                     </Col>
                   </Row>
                   <Row className="my-2">
                     <Col className="d-flex justify-content-between filter-section">
                     <label>
                      <span>City</span>{' '}
                      <input type="text" value={city} onChange={onChangeCity} />
                    </label> 
                    
                    
                    <label>
                      <span>State</span>{' '}
                      <input type="text" value={state} onChange={onChangeState} />
                    </label> 
                    
                     </Col>
                   </Row>
                   <Row>
                     <Col className="d-flex justify-content-between filter-section">
                     <label>
                      <span>Zip Code</span>{' '}
                      <input type="text" value={zipCode} onChange={onChangeZipCode} />
                    </label> 
                     <label>
                      <span>MLS</span>{' '}
                      <input type="text" value={id} onChange={onChangeId} />
                    </label> 
                     </Col>
                   </Row>
                <Row className="my-3">
                  <Col classNmae="filter-section">
                  <Button onClick={resetFilters}>
                            Reset Filters
                      </Button>
                    </Col>
                </Row>
                
            </Container>
               <Container>
                <Row className="justify-content-around">
                    
                        {listing.slice(0).reverse().map(listing => 
                          <Col xs="5" className="m-2 my-3">
                          
                                
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
                          
                          )}
                          <CardBody className="">
                              <CardTitle className="text-center mb-1 d-flex justify-content-between card-top-line">
                              
                                  <h2 className="font-weight-bold mb-0">
                                  $ {listing.SalesPrice}
                                        </h2>
                                        <h2>{listing.Bedrooms} bed | {listing.Bathrooms} ba | {listing.SquareFeet} sq.ft</h2>
                              
                              </CardTitle>
                                    <CardSubtitle className="card-txt my-3 d-flex justify-content-between">{listing.Street1} 
                                      {listing.hasOwnProperty("Street2") ? (listing.Street2) : null} {' '}{listing.City} {' '}{listing.State} {' '} {listing.ZipCode}</CardSubtitle>
                                    <CardSubtitle className="card-txt my-3"><span>Date Listed: {listing.DateListed} </span><span>GarageSize: {listing.GarageSize} sq.ft</span></CardSubtitle>
                                    <CardSubtitle className="card-txt my-3"><span>Lot Size: {listing.hasOwnProperty("LotSize") ? ( listing.LotSize ) : null} sq.ft</span> <span>Neighborhood: {listing.hasOwnProperty("Neighborhood") ? (listing.Neighborhood ) : null}</span></CardSubtitle>
                                    <CardText>
                                       <strong> Description:</strong> <br/>
                                        {listing.hasOwnProperty("Description") ? (listing.Description) : null}
                                    </CardText>
                                    <CardSubtitle className="card-txt my-3">
                                          <span>MLS:  {listing.id}</span>
                                    </CardSubtitle >
                                   
                          </CardBody>
                          </Card>
                          </Col>
                        )}
                        

                </Row>
            </Container>
        </div>
       
  </>
);
}