// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// // Define a Todo interface
// interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }

// export default async function Todos() {
//   const data = await fetch("http://localhost:3001/todos", {
//     cache: "no-store",
//   });
  
//   const todos: Todo[] = await data.json(); // Apply the Todo type to the fetched data

//   return (
//     <div>
//       <div className="w-8/12 pt-10 m-auto">
//         <div className="flex justify-end my-2">
//           <Button size={"sm"} asChild>
//             <Link href={`/todos/create`}>Create</Link>
//           </Button>
//         </div>

//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">Name</th>
//               <th scope="col" className="px-6 py-3">Status</th>
//               <th scope="col" className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todos.map((todo: Todo) => ( // Specify the type for todo here
//               <tr key={todo.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
//                   <div className="ps-3">
//                     <div className="text-base font-semibold">{todo.title}</div>
//                   </div>
//                 </th>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     {todo.completed ? (
//                       <div className="flex items-center">
//                         <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Completed
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Incomplete
//                       </div>
//                     )}
//                   </div>
//                 </td>
//                 <td className="flex gap-x-2">
//                   <Button size={"sm"} asChild>
//                     <Link href={`/todos/update/${todo.id}`}>Update</Link>
//                   </Button>
//                   <Button size={"sm"} variant={"destructive"} asChild>
//                     <Link href={`/todos/delete/${todo.id}`}>Delete</Link>
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// "use client"; // Enable client-side interaction

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// // Define a Todo interface
// interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }

// export default function Todos() {
//   const [todos, setTodos] = useState<Todo[]>([]); // State for todos
//   const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

//   // Fetch todos on component mount
//   useEffect(() => {
//     const fetchTodos = async () => {
//       setIsLoading(true); // Set loading state
//       try {
//         const data = await fetch("http://localhost:3001/todos", {
//           cache: "no-store",
//         });
//         const fetchedTodos: Todo[] = await data.json();
//         setTodos(fetchedTodos); // Set the fetched todos in state
//       } catch (error) {
//         console.error("Failed to fetch todos:", error);
//       } finally {
//         setIsLoading(false); // End loading state
//       }
//     };

//     fetchTodos();
//   }, []); // Empty dependency array to run on mount

//   // Function to handle delete
//   const handleDelete = async (todoId: number) => {
//     try {
//       const response = await fetch(`http://localhost:3001/todos/${todoId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         // Filter out the deleted todo from the state without refreshing
//         setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
//       } else {
//         console.error("Failed to delete todo", response.status);
//       }
//     } catch (error) {
//       console.error("Error occurred while deleting the todo:", error);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>; // Show loading state while fetching
//   }

//   return (
//     <div>
//       <div className="w-8/12 pt-10 m-auto">
//         <div className="flex justify-end my-2">
//           <Button size={"sm"} asChild>
//             <Link href={`/todos/create`}>Create</Link>
//           </Button>
//         </div>

//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">Name</th>
//               <th scope="col" className="px-6 py-3">Status</th>
//               <th scope="col" className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todos.map((todo: Todo) => (
//               <tr
//                 key={todo.id}
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//               >
//                 <th
//                   scope="row"
//                   className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
//                 >
//                   <div className="ps-3">
//                     <div className="text-base font-semibold">{todo.title}</div>
//                   </div>
//                 </th>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     {todo.completed ? (
//                       <div className="flex items-center">
//                         <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> 
//                         Completed
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> 
//                         Incomplete
//                       </div>
//                     )}
//                   </div>
//                 </td>
//                 <td className="flex gap-x-2">
//                   <Button size={"sm"} asChild>
//                     <Link href={`/todos/update/${todo.id}`}>Update</Link>
//                   </Button>
//                   <Button
//                     size={"sm"}
//                     variant={"destructive"}
//                     onClick={() => handleDelete(todo.id)} // Call delete function on click
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define a Todo interface
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]); // State for todos
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true); // Set loading state
      try {
        const data = await fetch("http://localhost:3001/todos", {
          cache: "no-store",
        });
        const fetchedTodos: Todo[] = await data.json();
        setTodos(fetchedTodos); // Set the fetched todos in state
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    fetchTodos();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div>
      <div className="w-8/12 pt-10 m-auto">
        <div className="flex justify-end my-2">
          <Button size={"sm"} asChild>
            <Link href={`/todos/create`}>Create</Link>
          </Button>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo: Todo) => (
              <tr
                key={todo.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="ps-3">
                    <div className="text-base font-semibold">{todo.title}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {todo.completed ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> 
                        Completed
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> 
                        Incomplete
                      </div>
                    )}
                  </div>
                </td>
                <td className="flex gap-x-2">
                  <Button size={"sm"} asChild>
                    <Link href={`/todos/update/${todo.id}`}>Update</Link>
                  </Button>
                  <Button size={"sm"} variant={"destructive"} asChild>
                    <Link href={`/todos/delete/${todo.id}`}>Delete</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
