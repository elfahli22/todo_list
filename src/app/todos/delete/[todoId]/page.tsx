// import { redirect } from 'next/navigation';

// interface TodosDeleteProps {
//   params: {
//     todoId: string;
//   };
// }

// export default async function TodosDelete({ params }: TodosDeleteProps) {
//   const todoId = params.todoId;

//   try {
//     const response = await fetch(`http://localhost:3001/todos/${todoId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       // Redirect to /todos after successful deletion
//       redirect(`/todos?deleteTodo=${todoId}`);
//     } else {
//       // Handle any errors with the request
//       console.error('Failed to delete todo', response.status);
//     }
//   } catch (error) {
//     console.error('Error occurred while deleting the todo:', error);
//   }

//   return (
//     <div className="container">
//       <p>{todoId} </p>
//     </div>
//   );
// }
"use client"; // Enable client-side rendering for this page

import { useRouter } from "next/navigation"; // Client-side routing
import { useEffect } from "react";

interface TodosDeleteProps {
  params: {
    todoId: string;
  };
}

export default function TodosDelete({ params }: TodosDeleteProps) {
  const router = useRouter();
  const todoId = params.todoId;

  useEffect(() => {
    const deleteTodo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/todos/${todoId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Navigate back to the main todos page after deletion
          router.push("/todos");
        } else {
          console.error("Failed to delete todo", response.status);
        }
      } catch (error) {
        console.error("Error occurred while deleting the todo:", error);
      }
    };

    deleteTodo();
  }, [todoId, router]);

  return (
    <div className="container">
      <p>Deleting todo with ID: {todoId}...</p>
    </div>
  );
}
