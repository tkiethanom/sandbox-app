import React, {Component} from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import './SortableItem.scss';

const itemTarget = {

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: overIndex } = props.findItem(overId);
            props.moveItem(draggedId, overIndex);
        }
    }
};

const itemSource = {
    beginDrag(props) {
        return {
            id: props.id,
            originalIndex: props.findItem(props.id).index
        };
    },

    endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            props.moveItem(droppedId, originalIndex);
        }
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}
function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class SortableItem extends Component {

    render(){
        const { id, text, isDragging, connectDragSource, connectDropTarget } = this.props;

        return connectDragSource(connectDropTarget(
            <div className={"sortable-item " + (isDragging ? "dragging" : "")} data-id={id}>
                <div>{text}</div>
            </div>
        ) );
    }
}

SortableItem.propTypes = {
    id: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    findItem: React.PropTypes.func.isRequired,
    moveItem: React.PropTypes.func.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
}

export default DragSource('sortable-item', itemSource, collect)( DropTarget('sortable-item', itemTarget, collectTarget )(SortableItem) );