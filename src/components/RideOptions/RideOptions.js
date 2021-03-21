import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import './RIdeOptions.css'

const RideOptions = (props) => {
    const history = useHistory();
    const vehicleDetails = (vehicle) => {
        history.push(`/destination/${vehicle}`)
    }
    const {vehicle_name, passenger, images, icons} = props.vehicle;
    return (
        <div className="box-style">
            <img src={images} alt={vehicle_name}/>
            <Button onClick={() => vehicleDetails(vehicle_name)} variant='outlined' color='primary'>{vehicle_name}</Button>
        </div>
    );
};

export default RideOptions;