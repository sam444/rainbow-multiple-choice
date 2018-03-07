import { Component, UICheckbox, UISmartPanelGrid, source } from "rainbowui-core";
import { Util } from 'rainbow-foundation-tools';
// import "../css/style.css";
import PropTypes from 'prop-types';
export default class MultipleChoice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectlist: [],
            checklist: [],
            selectvalue: []
        }
    }
    componentWillMount() {
        this.createCheckList();
    }
    componentDidMount() {
    }
    checkboxChangeEvent(checkboxid) {
        let selectlist = this.state.selectlist;
        if ($("input[id=" + checkboxid + "]").prop("checked")) {
            selectlist.push(checkboxid);
        } else {
            for (let i in selectlist) {
                if (checkboxid == selectlist[i]) {
                    selectlist.splice(i, 1);
                    break;
                }
            }
        }
        this.createSelectList(selectlist);
        this.props.onCheck(selectlist);
        this.setState({ selectlist: selectlist });
    }
    createCheckList() {
        let checkList = [];
        let source = this.props.src;
        for(let i in source){
            checkList.push(<ul className="any">
                                <li>
                                    <a className="filter-unlimit filter-tag selected">不限</a>
                                </li>
                            </ul>);
            for (let object in source[i]) {
                checkList.push(
                    <li>
                        <input type="checkbox" id={"input"+i+source[i][object].id} onChange={this.checkboxChangeEvent.bind(this,"input"+i+source[i][object].id)} />
                        <label for={"input"+i+source[i][object].id} id={"label"+i+ source[i][object].id}>{source[i][object].text}</label>
                    </li>
                )
            }
            checkList.push(<br/>)
        }
        console.log(checkList);
        this.setState({ checklist: checkList })
    }
    createSelectList(selectlist) {
        let selectvalue = [];
        for (let i in selectlist) {
            let selectItem = selectlist[i].slice(5);
            let labelvalue = $("#label" + selectItem).text();
            selectvalue.push(
                <li className="selected-tag">
                    <a>{labelvalue}<span className="glyphicon glyphicon-remove" onClick={this.removeNode.bind(this,"input"+selectItem)}></span></a>
                </li>
                
            );

        }
        this.setState({ selectvalue: selectvalue })
    }
    removeNode(selectItem) {
        let selectlist = this.state.selectlist;
        for (let i in selectlist) {
            if (selectItem == selectlist[i]) {
                selectlist.splice(i, 1);
                break;
            }
        }
        $("input[id=" + selectItem + "]").prop("checked", false);
        this.createSelectList(selectlist);
        this.props.onCheck(selectlist);
        this.setState({ selectlist: selectlist });
    }
    removeAll() {
        let self = this;
        let selectlist = this.state.selectlist;
        for (let i in selectlist) {
            $("input[id=" + selectlist[i] + "]").prop("checked", false);
        }
        this.props.onCheck([]);
        this.setState({ selectlist:[],selectvalue:[]});
    }
    render() {
        return (
            <div>
                <div className="hotel-filter-list">
                    <strong className="tit">已选</strong>
                    <div className="con selected-query">
                        <ul className="list">
                            <li className="filter-query-clear">
                                <a className="J_FilterQueryClear" onClick={this.removeAll.bind(this)}>全部清除</a>
                            </li>
                            {this.state.selectvalue}
                        </ul>
                    </div>
                </div>
                <div className="hotel-filter-list filter-list-has-more hotel-filter-list-min">
                    <strong className="tit"></strong>
                    <div className="con checkbox">
                        <ul className="list" id="checklist">
                            {this.state.checklist}
                        </ul>
                    </div>
                </div>
            </div>
        )

    }
};


/**
 * MultipleChoice component prop types
 */
MultipleChoice.propTypes = $.extend({}, Component.propTypes, {
    onCheck: PropTypes.func
});

/**
 * Get MultipleChoice component default props
 */
MultipleChoice.defaultProps = $.extend({}, Component.defaultProps, {
    onCheck: function () { }

});
