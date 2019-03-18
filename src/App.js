import React, {Component} from 'react';
import './App.css';
import Column from "./components/Column";
import {getColumns, moveTask, seedData} from "./services/coulmns-service";
import Task from "./components/Task";
import Header from "./components/Header";
import columnsSeed from './data/columns';

class App extends Component {

    constructor() {
        super();
        seedData(JSON.parse(JSON.stringify(columnsSeed)));
        this.state = {
            columns: getColumns(),
            draggedItem: {}
        };

    }

    onDragStart = (ev, taskId, colId) => {
        this.setState({draggedItem: {taskId, colId}});
        ev.dataTransfer.setDragImage(ev.target, 20, 20);
    };

    onDragOver = (ev, colId) => {
        ev.preventDefault();
        if (this.state.draggedItem.targetColId === colId) {
            return;
        }

        this.setState(() => {
            return {
                draggedItem: {...this.state.draggedItem, targetColId: colId}}
        });

    };

    onDrop = (ev, targetColId) => {
        ev.preventDefault();
        if (this.state.draggedItem.colId === targetColId) {
            this.setState({
                draggedItem: {}
            });
            return;
        }
        moveTask(this.state.draggedItem.colId, this.state.draggedItem.taskId, targetColId);

        this.setState({
            columns: getColumns(),
            draggedItem: {}
        });
    };

    getTasks(column) {
        return column.tasks.map(t =>
            <Task key={t.id} color={t.bgColor}
                  description={t.description}
                  dragStartHandler={(e) => this.onDragStart(e, t.id, column.id)}
                  name={t.name}/>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.draggedItem.colId !== nextState.draggedItem.targetColId;
    }

    render() {

        const columns = this.state.columns;
        return (
            <React.Fragment>
                <Header title={'React Kanban Board'}/>
                <div className="container-fluid">
                    <div className="row justify-content-between px-2">
                        {Object.keys(columns).map(
                            key => (
                                <Column key={columns[key].id}
                                        selectedColumn={columns[key]}
                                        dragOverHandler={(e) => this.onDragOver(e, columns[key].id)}
                                        dropHandler={(e) => this.onDrop(e, columns[key].id)}
                                        highlight={this.state.draggedItem.targetColId === columns[key].id}>
                                    {this.getTasks(columns[key])}
                                </Column>
                            )
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
