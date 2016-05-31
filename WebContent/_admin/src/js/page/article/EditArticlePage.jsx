/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';


export default class EditArticlePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <BreadcrumbComponent data={this.props.routes} />
                <span>EditArticlePage</span>
            </div>
        );
    }
};





