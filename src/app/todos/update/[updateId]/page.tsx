'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Ensure Switch is correctly imported

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface Params {
  updateId: string; // Dynamic route parameter
}

export default function UpdateTodo({ params }: { params: Params }) {
  const [todo, setTodo] = useState<Todo | null>(null);
  const router = useRouter();
  const todoId = params.updateId; // Extracting the updateId from params

  // Fetch the todo item on component mount
  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch(`http://localhost:3001/todos/${todoId}`);
      if (!response.ok) {
        console.error("Failed to fetch todo");
        return;
      }
      const data = await response.json();
      setTodo(data);
    };

    fetchTodo();
  }, [todoId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!todo) return; // Early return if todo is not fetched

    const response = await fetch(`http://localhost:3001/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: todo.title, completed: todo.completed }), // Ensure correct body format
    });

    if (response.ok) {
      router.push('/todos'); // Redirect after update
    } else {
      console.error('Failed to update todo');
    }
  };

  // Function to handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((prev) => (prev ? { ...prev, title: e.target.value } : null)); // Update title safely
  };

  // Function to handle switch toggle
  const handleSwitchChange = (checked: boolean) => {
    setTodo((prev) => (prev ? { ...prev, completed: checked } : null)); // Update completed status safely
  };

  if (!todo) return <div>Loading...</div>; // Show loading state while fetching

  return (
    <div>
      <h1>Update Todo</h1>
      <form className="flex flex-col gap-y-2 w-2/3 m-auto pt-10" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={todo.title}
            onChange={handleTitleChange} // Call the title change handler
            required
          />
        </div>
        <div>
          <Label htmlFor="completed">Completed</Label>
          <Switch
            id="completed"
            checked={todo.completed}
            onCheckedChange={handleSwitchChange} // Change from onChange to onCheckedChange if using Radix UI Switch
          />
        </div>
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
