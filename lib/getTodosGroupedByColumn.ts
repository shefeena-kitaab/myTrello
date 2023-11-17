import { database } from "@/appwrite"
export const getTodosGroupedByColumn = async()=>
{
    // fetches a list of documents from a specific database and collection
    const data = await database.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!,process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID! );
    const todos=data.documents;

    // group todos by their status 
    const columns = todos.reduce((acc,todo)=>
    {
        {/*if doesn't have an entry for the current todo's status.
            Sets a new entry in the Map where the key is the todo's status and 
            the value is an object with an id (set to the todo's status) and an empty todos array. */}
        if(!acc.get(todo.status))
        {
            acc.set(todo.status,{id: todo.status, todos:[]})
        }
        //pushes the current todo into the todos array corresponding to that status.
        acc.get(todo.status)!.todos.push({
            $id:todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
        });
        return acc;
    }, new Map<TypedColumn, Column>)


    // if the columns doesnt have inprogress, todo and done, add them with empty todos
    const columnTypes: TypedColumn[]= ["todo","InProgress","done"];

    for (const columnType of columnTypes)
    {
        if(!columns.get(columnType))
        {
            columns.set(columnType,{
                id: columnType,
                todos:[],
            });
        }
    }
    //It sorts the columns map based on the order defined in columnTypes array (i.e., "todo", "InProgress", "done")
    const sortedColumns= new Map(
       Array.from(columns.entries()).sort(
        (a,b)=>columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        )
        );

    //structured data of the task management board, organized by columns.
       const board: Board={
        columns:sortedColumns
       }
       return board;
    
};