import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLaender } from "@/lib/querys.ts";

interface DozentenPopoverProps {
  field: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  };
}

export default function CountryPopover({ field }: DozentenPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useQueryClient();
  const { data } = useQuery({
    queryKey: ["laender"],
    queryFn: getLaender,
  });

  const countries = data?.map((row) => ({
    value: row.id,
    label: row.country,
  })) || [{ value: "0", label: "Schweiz" }];

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
            ? countries.find((country) => country.value === value)?.label
            : "Land..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Land suchen..." />
          <CommandEmpty>Kein Land gefunden.</CommandEmpty>
          <CommandGroup>
            {countries.map((country) => (
              <CommandItem
                key={country.value}
                value={country.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  field.onChange(country.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === country.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {country.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
