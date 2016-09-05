/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';

import "../css/ueditor.less";


export default class TUeditorComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dom : ''
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.value !== this.props.value) {
            const self = this;
            setTimeout(function(){
                self.state.dom.setContent(self.props.value);
            },0);
        }
    }

    componentDidMount() {
        const editor = new UE.ui.Editor({
            initialContent: "",  // 初始化时显示的内容
            focus: false,  // 是否聚焦
            initialFrameWidth: this.props.width,  // 设置宽度
            initialFrameHeight: this.props.height,  // 设置宽度
            autoClearinitialContent: true,  // focus时自动清空初始化时的内容
            autoHeightEnabled: false
        });
        editor.render(this.props.id);

        var self = this;
        editor.ready( function( ueditor ) {
            var value = self.props.value ? self.props.value : '';
            editor.setContent(value);
        });

        this.setState({
            dom : editor
        });
    }

    render() {
        return (
            <div className="ueditor-package">
                <script id={this.props.id} name="content" type="text/plain"></script>
            </div>
        )
    }
};
