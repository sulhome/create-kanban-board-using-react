let columns = [];

export let seedData = (seedColumns) => {
    columns = [...seedColumns];
};

export let removeTask = (colId, taskId) => {
    const column = columns.find(c => c.id === colId);
    if (!column) {
        return;
    }
    const taskIndex = column.tasks.findIndex(t => t.id === taskId);
    column.tasks.splice(taskIndex, 1);
};

export let moveTask = (currentColId, taskId, targetColId) => {
    const column = columns.find(c => c.id === currentColId);
    const currentTask = column.tasks.find(t => t.id === taskId);
    if (!currentTask) {
        return;
    }
    const tasks = columns.find(c => c.id === targetColId).tasks;
    tasks.push(JSON.parse(JSON.stringify(currentTask)));
    removeTask(currentColId, taskId);
};


export let getColumns = () => {
    return columns;
};