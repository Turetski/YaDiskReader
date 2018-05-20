import React from 'react';

import styles from './styles.less'; // eslint-disable-line no-unused-vars

export default ({ name, size, type }) => (
    <div>
        <span>{type}    </span>
        <span>{name}    </span>
        <span>{size}    </span>
    </div>
);
