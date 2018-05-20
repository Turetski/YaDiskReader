import * as React from 'react';
import { Button, Alert } from 'react-bootstrap';

import styles from './styles.less'; // eslint-disable-line no-unused-vars

export default ({ title, btnLabel, onBtnClick }) => (
    <Alert bsStyle="danger">
        {title}
        <Button
            bsStyle="danger"
            className="btn-auth"
            onClick={onBtnClick}
        >
            {btnLabel}
        </Button>
    </Alert>
);
