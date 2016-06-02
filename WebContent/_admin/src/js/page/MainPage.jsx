/**
 * Created by a1 on 2016/5/5.
 */




import React from 'react';
import ReactDOM from 'react-dom';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="main_page">
                {/* 渲染子组件 */}
                {this.props.children}
	        </div>
        );
    }
};





