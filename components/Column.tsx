import React from 'react';
import Card from './Card';


type Props = {
  id: TypedColumn;
  columnData: Column;
};

const Column: React.FC<Props> = ({ id, columnData }) => {
  const { todos } = columnData;

  return (
    <div className="section">
      <h2>{id}</h2>
      <div className="cards">
        {todos.map((todo) => (
          <Card key={todo.$id} id={todo.$id} todo={todo.title} />
        ))}
      </div>
    </div>
  );
};

export default Column;
