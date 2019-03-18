import React from 'react';

const Column = ({selectedColumn, dragOverHandler, dropHandler, children, highlight = false}) => {
    const style = {
        border: highlight ? '2px dashed red' : '2px solid #ccc'
    };
    return (
        <div onDragOver={dragOverHandler}
             onDrop={dropHandler}
             className="column col-md-2 p-2 text-center"
             style={style}>
            <h4 className="title bg-info text-center text-white mb-3 py-1 text-uppercase">{selectedColumn.category}</h4>

            {children}

        </div>
    );
};

export default Column;