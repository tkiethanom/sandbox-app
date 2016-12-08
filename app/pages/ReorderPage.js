
import React, {Component} from 'react';
import {connect} from 'react-redux';

import { default as TouchBackend } from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Modernizr from 'browsernizr';

import SortableItem from 'components/App/Reorder/SortableItem';

import { updateOrder } from 'actions/App/ItemActions';

import 'isomorphic-fetch';

class ReorderPage extends Component {
    constructor(props){
        super(props);

        this.moveItem = this.moveItem.bind(this);
        this.findItem = this.findItem.bind(this);
    }

    componentWillMount() {

    }

    moveItem(id, atIndex) {
        const { item, index } = this.findItem(id);

        const items = _.clone(this.props.Item.items);

        items.splice(index, 1);
        items.splice(atIndex, 0, item);

        this.props.dispatch(updateOrder(items));
    }

    findItem(id) {
        const items = this.props.Item.items;

        const index = _.findIndex(items, function(x){
            return x.id === id;
        });

        return {
            item: items[index],
            index: index
        };
    }

    render() {
        const items = this.props.Item.items;

        return (
            <div className="reorderpage-container">
                {items.map( item => {
                    return (
                        <SortableItem key={item.id}
                          id={item.id}
                          text={item.text}
                          moveItem={this.moveItem}
                          findItem={this.findItem}
                        />
                    );
                })}
            </div>
        );
    }
}

ReorderPage.propTypes = {};

// Which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        Item: state.Item
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(DragDropContext(Modernizr.touchevents ? TouchBackend : HTML5Backend)(ReorderPage) );
