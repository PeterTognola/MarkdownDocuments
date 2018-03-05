import React, { Component } from 'react';

export class header extends Component {
    render() {
        return (
            <div>
                <div style={{margin:"10px 15px 0"}}>
                    {this.props.children}
                </div>

                <hr />
            </div>
        );
    }
}