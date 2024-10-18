// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { useRouter } from "next/navigation";
// import { useRef } from "react";

// interface Props {
//   value?: string;
//   checked?: boolean;
// }

// export default function TodoCreate({ value = "", checked = false }: Props) {
//   const titleRef = useRef<HTMLInputElement | null>(null);
//   const isCompletedRef = useRef<HTMLButtonElement | null>(null);
//   const router =  useRouter();

//   const callback =async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Access the value and checked status from the refs
//     const titleValue = titleRef.current?.value || "";
//     const isCompletedValue = isCompletedRef.current?.ariaChecked  || "true";

//     const response = await fetch(`http://localhost:3001/todos/`, {
//       method: 'POST',
//       body: JSON.stringify({title:titleValue,  isCompleted:isCompletedValue})
//     });
//     const todo = await response.json()
//     if(response.ok){

//       router.push('/todos?createdItem='+ todo.id);
//     }
//   };

//   return (
//     <div>
//       <form className="flex flex-col gap-y-2 w-2/3 m-auto pt-10" onSubmit={callback}>
//         <div className="flex items-center space-x-2">
//           <Label htmlFor="title">Title</Label>
//           <Input ref={titleRef} type="text" id="title" name="title" defaultValue={value} autoFocus />
//         </div>
//         <div className="flex items-center space-x-2">
//           <Label htmlFor="airplane-mode">Airplane Mode</Label>
//           <Switch ref={isCompletedRef} id="airplane-mode" defaultChecked={checked} />
//         </div>
//         <Button type="submit">Create</Button>
//       </form>
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface Props {
  value?: string;
  checked?: boolean;
}

export default function TodoCreate({ value = "", checked = false }: Props) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const [isCompleted, setIsCompleted] = useState(checked); // Manage switch state using useState
  const router = useRouter();

  const callback = async (e: React.FormEvent) => {
    e.preventDefault();

    // Access the title value from the ref and the completed state from useState
    const titleValue = titleRef.current?.value || "";

    const response = await fetch(`http://localhost:3001/todos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleValue,
        completed: isCompleted, // Use the correct "completed" key
      }),
    });

    const todo = await response.json();
    if (response.ok) {
      router.push("/todos?createdItem=" + todo.id);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-y-2 w-2/3 m-auto pt-10" onSubmit={callback}>
        <div className="flex items-center space-x-2">
          <Label htmlFor="title">Title</Label>
          <Input ref={titleRef} type="text" id="title" name="title" defaultValue={value} autoFocus />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="completed">Completed</Label>
          <Switch
            id="completed"
            checked={isCompleted}
            onCheckedChange={setIsCompleted} // Update the state when switch is toggled
          />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
