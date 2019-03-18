import React from "react";

const Task = ({name, description, color, dragStartHandler}) => {
    const taskStyle = {width: '18rem', backgroundColor: color};
    return (
        <div onDragStart={dragStartHandler}
             draggable
             style={taskStyle} className="w-100 py-1 mb-2">
            <div className="font-weight-bold border-bottom">
                {name}
            </div>
            <div>
                {description}
            </div>
        </div>
    );
};

export default Task;