import React from 'react';

const NotFound = () => {
    const invalidStyle = {
        marginTop: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
        <div style={invalidStyle}>
            <h1 style={{ color: 'red' }}>Invaild URL</h1>
        </div>
    );
};

export default NotFound;