import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import "./DataTable.css";
import { getLaender } from "@/lib/querys";
import { Skeleton } from "@/components/ui/skeleton";

function DataTableLaender() {
  const TABLE_NAME = "countries";
  useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["laender"],
    queryFn: getLaender,
  });

  return (
    <div>
      <div className="mb-3">
        <NavLink to={`/laender/create`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Neu</TooltipTrigger>
              <TooltipContent>
                <p>Ein neues Land erstellen</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NavLink>
      </div>
      <div className="table">
        <h1>Länder</h1>
        <Table>
          <TableHeader>
            <TableHead className="text-black">ID</TableHead>
            <TableHead className="text-black">Land</TableHead>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 2 }).map((_, colIndex) => (
                      <TableCell className="text-left" key={colIndex}>
                        <Skeleton className="w-full h-[25px] mb-2" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.map((row) => (
                  <TableRow key={row.id_country}>
                    <TableCell className="text-left">
                      <NavLink to={`/${TABLE_NAME}/${row.id_country}`}>
                        {row.id_country}
                      </NavLink>
                    </TableCell>
                    <TableCell className="text-left">{row.country}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTableLaender;
