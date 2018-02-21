import React from 'react';

export class templates extends React.Component{
    static loading() {
        return <div style={{position:"fixed", top:"50%", left:"50%", transform:"translate(-50%, -50%)", width:"40px", height:"40px", zIndex:"99" }} className="loading">
            <span className="icon loading"></span>
        </div>;
    }
}