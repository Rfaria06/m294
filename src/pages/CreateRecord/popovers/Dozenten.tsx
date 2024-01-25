"use client";

import { getLaender } from "@/lib/querys";
import { Row_laender } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
type countryPickerElement = { value: string; label: string };

function countryPickerData(): countryPickerElement[] {
  const [data, setData] = useState<Row_laender[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLaender();
        setData(result);

        if (!hasFetchedData.current) {
          toast("Länder erfolgreich geladen.");
          hasFetchedData.current = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return data.map((row) => ({
    value: row.id_country,
    label: row.country,
  }));
}

export default countryPickerData;
