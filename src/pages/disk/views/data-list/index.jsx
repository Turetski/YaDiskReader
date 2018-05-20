import React from 'react';

import Item from './item';

export default ({ data, parentPath, needBackBtn }) => (
    <ul>
        {needBackBtn && (
            <Item
                name=".."
                type="back"
                path={parentPath}
            />
        )}
        {data.map((item) => <Item {...item} key={item.name} />)}
    </ul>
);
