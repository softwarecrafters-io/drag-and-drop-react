import React, { useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DroppableProvided,
    DropResult,
    DraggableProvided
} from 'react-beautiful-dnd';
import './App.css';

const initialTasks = [
    {
        id: '1',
        name: 'Shopping',
    },
    {
        id: '2',
        name: 'Working',
    },
    {
        id: '3',
        name: 'Training',
    },
    {
        id: '4',
        name: 'Sleep',
    },
    {
        id: '5',
        name: 'Playing',
    }
]

function App() {
    const [tasks, updateTasks] = useState(initialTasks);

    const handleOnDragEnd = (result:DropResult) => {
        if (!result.destination) return;
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateTasks(items);
    };

    const tasksAsComponents = (tasks:{id:string, name:string}[]) => tasks.map((task, index) =>
        dragableTask(task, index))

    const droppable = (provided:DroppableProvided) => (
        <ul className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
            {tasksAsComponents(tasks)}
            {provided.placeholder}
        </ul>
    )

    return (
        <div className="App">
            <header className="container">
                <h1>Todo List</h1>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="tasks">
                        {droppable}
                    </Droppable>
                </DragDropContext>
            </header>
        </div>
    );
}

function dragableTask(task: { id:string, name:string}, index: number) {
    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided:DraggableProvided) => (
                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className="tasks-thumb">
                    </div>
                    <p>
                        {task.name}
                    </p>
                </li>
            )}
        </Draggable>
    );
}

export default App;
