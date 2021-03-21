import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import vehicle from '../../MOCK_DATA.json';
import './Destination.css'
import { Input } from '@material-ui/core';
import passengerIcon from '../../images/peopleicon.png'
import SimpleMap from '../SimpleMap/SimpleMap'

const Destination = () => {
    const { vehicletype } = useParams();
    const [vehicles, setVehicles] = useState([])
    useEffect(() => {
        setVehicles(vehicle);
    }, [])
    const [submited, setSubmited] = useState(false)
    const vehicleDetails = vehicles.find(v => v.vehicle_name === vehicletype)

    const [place, setPlace] = useState({
        from: '',
        to: '',
        dateTime: ''
    })

    const handleChange = (e) => {
        const takenPlaces = { ...place }
        takenPlaces[e.target.name] = e.target.value;
        setPlace(takenPlaces)
        e.preventDefault();
    }
    const handleSubmit = (e) => {
        const clicked = true;
        setSubmited(clicked);
        e.preventDefault();
    }
    return (
        <Container>
            <Row>
                <Col xs={6} md={4}>
                    {
                        !submited &&
                        <div className="input-fields m-5">
                            <form onSubmit={handleSubmit}>
                                <label>From</label><br></br>
                                <Input onBlur={handleChange} name="from" type='text' placeholder="Pickup" required></Input><br />
                                <label>To</label><br></br>
                                <Input onBlur={handleChange} name="to" type='text' placeholder="Destination" required></Input><br></br><br></br>
                                <Input onBlur={handleChange} type="date" name="dateTime" required/><br/><br/>
                                <input type='submit'></input>
                            </form>
                        </div>
                    }
                    {
                        submited &&
                        <div className="fareTable ml-5">
                            <p> <b>{place.from}</b> To <b>{place.to}</b></p>
                            on {place.dateTime}
                            <div className="rideStyle">
                                <img className="rideIcon" src={vehicleDetails?.icon} alt="rideIcon" />
                                <div className="passengerNumber">{vehicleDetails?.vehicle_name}</div>
                                <img className="peopleIcon" src={passengerIcon} alt="" /><span className="passengerNumber">{vehicleDetails?.passenger}</span>
                                <div className="priceStyle">${vehicleDetails?.economy}</div>
                            </div>
                            <div className="rideStyle">
                                <img className="rideIcon" src={vehicleDetails?.icon} alt="rideIcon" />
                                <div className="passengerNumber">{vehicleDetails?.vehicle_name}</div>
                                <img className="peopleIcon" src={passengerIcon} alt="" /><span className="passengerNumber">{vehicleDetails?.passenger}</span>
                                <div className="priceStyle">${vehicleDetails?.business}</div>
                            </div>
                            <div className="rideStyle">
                                <img className="rideIcon" src={vehicleDetails?.icon} alt="rideIcon" />
                                <div className="passengerNumber">{vehicleDetails?.vehicle_name}</div>
                                <img className="peopleIcon" src={passengerIcon} alt="" /><span className="passengerNumber">{vehicleDetails?.passenger}</span>
                                <div className="priceStyle">${vehicleDetails?.luxury}</div>
                            </div>
                        </div>
                    }
                </Col>
                <Col xs={12} sm={8} >
                    <Container className="map-style">
                        <SimpleMap></SimpleMap>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Destination;