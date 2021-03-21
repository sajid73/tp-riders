import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import RideOptions from '../RideOptions/RideOptions';
import vehicle from '../../MOCK_DATA.json'
import './Home.css'

const Home = () => {
    const [vehicles, setVehicles] = useState([])
    useEffect(() => {
        setVehicles(vehicle);
    }, [])
    return (
            <div className="m-5">
                <div>
                {
                    vehicles.map(v => <RideOptions vehicle={v}></RideOptions>)
                }
                </div>
            </div>
    )
}

export default Home;