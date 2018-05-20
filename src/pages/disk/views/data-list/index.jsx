import React from 'react';

import Item from './item';

export default ({ data }) => (
    <ul>
        {data.map((item) => <Item {...item} key={item.name} />)}
    </ul>
);
