import React from 'react';
import { Dimmer, Loader} from 'semantic-ui-react';

const Spiner = () => {
    return (
        <Dimmer active>
            <Loader size='large' indeterminate>Preparing Files</Loader>
        </Dimmer>
    );
};

export default Spiner;