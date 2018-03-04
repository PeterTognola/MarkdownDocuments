import React from 'react';
import { ProgressBar } from "react-toolbox/lib/progress_bar/";
import { Dialog } from "react-toolbox/lib/dialog";

export class templates extends React.Component {
    static loading() {
        return <div style={{position:"fixed", top:"50%", left:"50%", transform:"translate(-50%, -50%)", width:"40px", height:"40px", zIndex:"99" }} className="loading">
            <ProgressBar type='circular' mode='indeterminate' multicolor />
        </div>;
    }

    static error(error) {
        if (error === null || error === "") error = "There was an unknown error.";

        let active = true;

        const closeDialog = () => { active = false };

        return (
            <Dialog
                actions={ [{ label: "OK", onClick: closeDialog}] }
                active={active}
                onEscKeyDown={closeDialog}
                onOverlayClick={closeDialog}
                title="There was an error!">
                <p>{error}</p>
            </Dialog>
        );
    }
}