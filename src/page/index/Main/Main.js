import React from 'react'

import { connect } from 'react-redux'
// import { addTodo } from '../actions/tabAction';

import BottomBar from '../BottomBar/BottomBar'

@connect(
    state => ({
    })
)
class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let num = this.props.num;
        return (
            <div>
                <BottomBar></BottomBar>
            </div>
        )
    }
}

export default Main;    
