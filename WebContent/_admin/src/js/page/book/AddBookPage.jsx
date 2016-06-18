/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';



import { Form, Upload, Input, Button, Icon, notification, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';

import '../../../css/book.less';


export default class AddBookPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            allSort     : [],              // 所有分类的数组
            sortId      : 0,               // 分类ID
            sortName    : "",              // 分类Name
            title       : "",              // 图书标题
            height      : "",              // 图书内容
            cover       : "",              // 图书封面
            path        : "",              // 图书路径
            loading     : false,           // 按钮是否在请求过程中

            sortDOM     : null
        };

        this.sortSelected = this.sortSelected.bind(this);
        this.titleChange  = this.titleChange.bind(this);
        this.heightChange = this.heightChange.bind(this);
        this.pathChange   = this.pathChange.bind(this);
        this.submitClick  = this.submitClick.bind(this);
    }

    // 渲染之前获取分类和标签数据
    componentWillMount() {
        // 获取图书的分类列表
        this.byTypeGetSort();
    }

    // 设置state中和页面数据相关的值
    settingState(allSort, sortId, sortName, title, height, cover, path, loading) {
        if(allSort === "no") {
            allSort = this.state.allSort;
        }
        if(sortId === "no") {
            sortId = this.state.sortId;
        }
        if(sortName === "no") {
            sortName = this.state.sortName;
        }
        if(title === "no") {
            title = this.state.title;
        }
        if(height === "no") {
            height = this.state.height;
        }
        if(cover === "no") {
            cover = this.state.cover;
        }
        if(path === "no") {
            path = this.state.path;
        }
        if(loading === "no") {
            loading = this.state.loading;
        }

        this.setState({
            allSort  : allSort,
            sortId   : sortId,
            sortName : sortName,
            title    : title,
            height   : height,
            cover    : cover,
            path     : path,
            loading  : loading
        });
    }




    /******************************事件响应方法--开始***********************************/

    // 分类切换
    sortSelected(sortId){
        let nowSort = {
            sortId   : sortId,
            sortName : ""
        };
        const sorts = this.state.allSort;
        for(let sort of sorts){
            if(sort.id === sortId) {
                nowSort.sortName = sort.name;
                break;
            }
        }

        this.settingState("no", nowSort.sortId, nowSort.sortName, "no", "no", "no", "no", "no");
    }

    // 标题变化
    titleChange(e) {
        const title = e.target.value;
        // 设置state中的图书标签数据
        this.settingState("no", "no", "no", title, "no", "no", "no", "no");
    }

    // 高度变化
    heightChange(e) {
        const height = e.target.value;
        // 设置state中的图书标签数据
        this.settingState("no", "no", "no", "no", height, "no", "no", "no");
    }

    // 下载路径变化
    pathChange(e) {
        const path = e.target.value;
        // 设置state中的图书标签数据
        this.settingState("no", "no", "no", "no", "no", "no", path, "no");
    }

    // 提交按钮点击
    submitClick() {
        // 设置state中的图书内容数据
        this.settingState("no", "no", "no", "no", "no", "no", "no", true);
        // 新增图书
        this.submitData();
    }

    /******************************事件响应方法--结束***********************************/


    // 首先得到图书的分类
    byTypeGetSort() {
        const self = this;
        jQuery.ajax({
            type : "POST",
            url : "/doit/sortAction/byTypeGetSort",
            data : {
                "type" : "book"
            },
            dataType:"json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success : function(cbData) {
                if(cbData.success === "1"){
                    let sortArray = [];
                    for(let item of cbData.data){
                        const sortObj = {
                            "id" : item.Sort_ID,
                            "name" : item.Sort_Name
                        };
                        sortArray.push(sortObj);
                    }

                    // 设置state中的分类数据
                    self.settingState(sortArray, sortArray[0].id, sortArray[0].name, "no", "no", "no", "no", "no");

                    // 设置sortDOM--因为ajax之后select的默认数据不会自动设置
                    self.setState({
                        sortDOM : <SelectComponent
                            defaultValue={sortArray[0].id}
                            data={sortArray}
                            selected={self.sortSelected}
                        />
                    });
                }
            },error :function(){
                message.error("请求图书分类连接出错！");
            }
        });
    }

    // 上传成功的回调方法
    uploaderSuccess(info) {
        message.success(`${info.file.name} 上传成功。`);
        this.settingState("no", "no", "no", "no", "no", info.file.response, "no", "no");
    }

    // 上传失败的回调方法
    uploaderError(info) {
        message.error(`${info.file.name} 上传失败。`);
        this.settingState("no", "no", "no", "no", "no", "no", "no", "no");
    }

    // 提交数据
    submitData() {
        const self = this;
        setTimeout(function() {

            const cover    = self.state.cover;
            const sortId   = self.state.sortId;
            const sortName = encodeURI(encodeURI(self.state.sortName));
            const title    = encodeURI(encodeURI(self.state.title));
            const height   = self.state.height;
            const path     = self.state.path.replace(/&/g, "*");

            jQuery.ajax({
                type : "POST",
                url : "/doit/bookAction/addBook",
                data : {
                    "name" : title,
                    "sortId" : sortId,
                    "sortName" : sortName,
                    "height" : height,
                    "cover" : cover,
                    "link" : path
                },
                dataType:"json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success : function(cbData) {
                    console.info(cbData);
                    self.settingState("no", "no", "no", "no", "no", "no", "no", false);
                    if(cbData.success === "1") {
                        self.openTip("success", cbData.msg);
                    } else {
                        self.openTip("error", cbData.msg);
                    }
                },error :function(){
                    message.error("新增图书连接出错！");
                }
            });
        }, 0);
    }

    // 打开提示弹框
    openTip(type, msg) {
        notification[type]({
            message: "保存提示",
            description: msg,
            duration: 3
        });
    }

    render() {
        const self = this;
        const FormItem = Form.Item;
        const props = {                // 图书路径
            name: 'file',
            action: '/doit/UniversalUploadAction',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    self.uploaderSuccess(info);
                } else if (info.file.status === 'error') {
                    self.uploaderError(info);
                }
            },
        };

        return (
            <div>
                <MenuComponent openSubMenu={this.props.route.sort} selectedMenu={this.props.route.bpath} />
                <div className="ant-layout-main">
                    <div className="ant-layout-header">
                        <Row>
                            <Col span={4}>
                                <SearchComponent
                                    placeholder="快速菜单入口"
                                    style={{ width: 230 }}
                                />
                            </Col>
                            <Col span={12} offset={8}>
                                <ToolBarComponent />
                            </Col>
                        </Row>
                    </div>
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            <BreadcrumbComponent
                                data={this.props.routes}
                            />
                            <div className="page add-book-page">
                                <Form horizontal>
                                    <FormItem
                                        label="图书封面 : ">
                                        <Upload {...props}>
                                            <Button className="uploader-btn" type="ghost">
                                                <Icon type="upload" /> 点击上传
                                            </Button>
                                        </Upload>
                                    </FormItem>
                                    <FormItem
                                        label="图书分类 : ">
                                    {this.state.sortDOM}
                                    </FormItem>
                                    <FormItem
                                        label="图书名称 : ">
                                        <Input onChange={this.titleChange} placeholder="" size="large"/>
                                    </FormItem>
                                    <FormItem
                                        label="图书高度 : ">
                                        <Input onChange={this.heightChange} placeholder="" size="large"/>
                                    </FormItem>
                                    <FormItem
                                        label="下载路径 : ">
                                        <Input onChange={this.pathChange} type="textarea" rows="3" size="large"/>
                                    </FormItem>
                                    <FormItem
                                        label="">
                                        <Button
                                            onClick={this.submitClick}
                                            loading={this.state.loading}
                                            type="primary"
                                            icon="cloud-upload-o"
                                            size="large">
                                            提交图书
                                        </Button>
                                    </FormItem>
                                </Form>


                            </div>
                        </div>
                    </div>
                    <div className="ant-layout-footer">
                        52DOIT 版权所有 © 2016 由不拽注定被甩~技术支持
                    </div>
                </div>
            </div>
        );
    }
};





