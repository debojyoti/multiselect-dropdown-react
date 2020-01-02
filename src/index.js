import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './styles.css';

export class Multiselect extends Component {
    constructor(props) {
        super(props);
        this.state ={
            checked: [],
            dropDownValue: []
          }
          this.checkBox = this.checkBox.bind(this);
    }
    componentWillMount() {
        this._initializeState();
    }
    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this._initializeState();
        }
    }
    _initializeState() {
        this.setState({
            checked: this.props.checked,
            dropDownValue: this.props.options
        });
    }
    removeChip(value) {
        this.checkBox(value, false);
    }
    checkBox(value, condition) {
        let checkedValue = this.state.checked;
        if(condition) {
            checkedValue.push(value);
        } else {
            let index = checkedValue.indexOf(value);
            checkedValue.splice(index, 1);
        }
        this.setState({
            checked: checkedValue
        }, () => {
            this.props.onSelectOptions(this.state.checked); 
        });
    }
    searchFun(e) {
        if(e.target.value.length !== 0) {
            let enteredValue = e.target.value.toLowerCase();
            let presentValue = this.props.options.filter(function(data) {
                return data.name.indexOf(enteredValue) > -1;
            })
            this.setState({dropDownValue: presentValue})
        } else {
            this.setState({dropDownValue: this.props.options})
        }
    }
    returnChip() {
        const chip = this.state.checked ? this.state.checked.map((data, index) =>
            <div className="chip-body" key={index}>
                <p className="chip-text">{data}</p>
                <button className="chip-close" onClick={e => this.removeChip(data)}>&times;</button>
            </div>
        ) : []
        return chip;
    }
    returnList() {
        const list = this.state.dropDownValue ? this.state.dropDownValue.map((data, index) =>
        <label className="container1" key={index}>{data.name}
        <input type="checkbox" value={data.value} onChange={e => this.checkBox(e.target.value, e.target.checked)} checked = {this.state.checked.includes(data.value) ? true : false} />
        <span className="checkmark1"></span>
    </label>
        ) : null;
        return list;
    }
    render() {
        return (
            <div className="multiSelect1">
                <div className="chip1">
                    {this.returnChip()}
                </div>
                <input type="text" name="Search" placeholder={this.props.searchPlaceHolder || "Search"} className="input-box1" onChange={e => this.searchFun(e)}/>
                <div className="search-result1">
                    <div className="list-result">
                        {this.returnList()}
                    </div>
                </div>
            </div>
        )
    }
}

Multiselect.defaultProps = {
    options: []
}

/** define proptypes including fields which is required */
Multiselect.prototypes = {
    options: PropTypes.array.isRequired,
    onSelectOptions: PropTypes.func
}

export default Multiselect;
