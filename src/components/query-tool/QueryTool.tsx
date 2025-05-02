"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QueryResult } from "@/types";
import { runQuery } from "@/lib/db";

export function QueryTool() {
  const [query, setQuery] = useState<string>("SELECT * FROM patients LIMIT 10");
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const executeQuery = async () => {
    if (!query.trim()) {
      setError("Query cannot be empty");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await runQuery(query);

      const columns =
        result.length > 0
          ? Object.keys(result[0] as Record<string, unknown>)
          : [];
      setQueryResult({
        columns,
        rows: result as Record<string, any>[],
      });
    } catch (error) {
      console.error("Error executing query:", error);
      setError(
        `Error executing query: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      setQueryResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Sample queries (for quick access)
  const sampleQueries = [
    {
      label: "All Patients",
      query: "SELECT * FROM patients ORDER BY created_at DESC",
    },
    {
      label: "Count by Gender",
      query: "SELECT gender, COUNT(*) as count FROM patients GROUP BY gender",
    },
    {
      label: "Patients by Age",
      query: `SELECT 
        first_name, 
        last_name, 
        date_of_birth, 
        EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth::date)) as age 
      FROM patients 
      ORDER BY age DESC`,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">SQL Query Tool</h2>

      <div className="space-y-2">
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter SQL query..."
          className="font-mono min-h-[120px]"
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={executeQuery} disabled={isLoading}>
            {isLoading ? "Executing..." : "Execute Query"}
          </Button>

          {sampleQueries.map((sampleQuery, idx) => (
            <Button
              key={idx}
              variant="outline"
              onClick={() => setQuery(sampleQuery.query)}
            >
              {sampleQuery.label}
            </Button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
          {error}
        </div>
      )}

      {queryResult && queryResult.columns.length > 0 && (
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {queryResult.columns.map((column, idx) => (
                  <TableHead key={idx}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {queryResult.rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={queryResult.columns.length}
                    className="text-center"
                  >
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                queryResult.rows.map((row, idx) => (
                  <TableRow key={idx}>
                    {queryResult.columns.map((column, colIdx) => (
                      <TableCell key={colIdx}>
                        {row[column] === null ? "NULL" : String(row[column])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {queryResult && queryResult.columns.length === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-600">
          Query executed successfully with no results to display.
        </div>
      )}
    </div>
  );
}
