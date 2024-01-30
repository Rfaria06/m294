"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { getLernende } from "../querys";
import { cn } from "../utils";

type Data = {
  value: string;
  label: string;
};
interface Props {
  field: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  };
}

export default function LernendePopover({ field }: Props) {
  useQueryClient();
  const { data } = useQuery({
    queryKey: ["lernende"],
    queryFn: getLernende,
  });
  const elements: Data[] =
    data?.map((row) => ({
      value: row.id_lernende,
      label: `${row.vorname} ${row.nachname}`,
    })) || [];
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value
            ? elements.find((element) => element.value === value)?.label
            : "Lernende..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="suchen..." />
          <CommandEmpty>Nichts gefunden.</CommandEmpty>
          <CommandGroup>
            {elements.map((element) => (
              <CommandItem
                key={element.value}
                value={element.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  field.onChange(element.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === element.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {element.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
