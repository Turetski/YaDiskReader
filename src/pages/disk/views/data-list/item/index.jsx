import React from 'react';
import { withRouter } from 'react-router-dom';

import styles from './styles.less'; // eslint-disable-line no-unused-vars

class DiskItem extends React.Component {
    handleClick = () => {
        const { type, path } = this.props;
        const preparedPath = path.replace('disk:/', '');

        if (type === 'file') {
            return null;
        }

        this.props.history.push({
            search: `?path=${preparedPath}`,
        });
    }

    render() {
        const { name, size, type } = this.props;

        return (
            <li className={`wrapper ${type}`} onClick={this.handleClick}>
                <span className="type glyphicon glyphicon-folder-open" />
                <span className="name">{name}    </span>
                <span>{size}    </span>
            </li>
        );
    }
}

export default withRouter(DiskItem);
