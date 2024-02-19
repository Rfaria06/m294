"use client";

import { getLaender } from "@/lib/querys";
import { Row_laender } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
type countryPickerElement = { value: string; label: string };

function CountryPickerData(): countryPickerElement[] {
  const [data, setData] = useState<Row_laender[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLaender();
        setData(result);
        if (!hasFetchedData.current) {
          hasFetchedData.current = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return data.map((row) => ({
    value: row.id,
    label: row.country,
  }));
}

export default CountryPickerData;
