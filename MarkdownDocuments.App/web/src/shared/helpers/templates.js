import React from 'react';
import { ProgressBar } from "react-toolbox/lib/progress_bar/";
import { Snackbar } from "react-toolbox/lib/snackbar";

export class templates extends React.Component {
    static loading() {
        return <div style={{position:"fixed", top:"50%", left:"50%", transform:"translate(-50%, -50%)", width:"40px", height:"40px", zIndex:"99" }} className="loading">
            <ProgressBar type='circular' mode='indeterminate' multicolor />
        </div>;
    }

    static error(error) {
        if (error === null || error === "") error = "There was an unknown error.";

        return (
            <Snackbar active={true} timeout={5000} label={`Error: ${error}...`} />
        );
    }
}