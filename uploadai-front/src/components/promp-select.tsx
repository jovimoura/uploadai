import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Prompts {
  id: string;
  title: string;
  template: string;
}

interface PromptSelectedProps {
  onPromptSelected: (template: string) => void;
}

export const PromptSelect = (props: PromptSelectedProps) => {
  const [prompts, setPrompts] = useState<Prompts[] | null>(null);

  function handlePromptSelected(idPrompt: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === idPrompt);

    if (!selectedPrompt) return;

    return props.onPromptSelected(selectedPrompt.template);
  }

  useEffect(() => {
    api.get("/prompts").then((response) => {
      setPrompts(response.data);
    });
  }, []);

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder='Selecione um prompt...' />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
