"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientForm } from "@/components/patient-form/PatientForm";
import { Toaster } from "@/components/ui/toaster";
import { PatientList } from "@/components/patient-list/PatientList";
import { QueryTool } from "@/components/query-tool/QueryTool";

export default function Home() {
  const [patientListKey, setPatientListKey] = useState<number>(0);

  const handlePatientAdded = () => {
    setPatientListKey((prev) => prev + 1);
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Patient Registration System</h1>
        <p className="text-gray-500">
          A frontend-only patient registration application with PgLite local
          database storage
        </p>
      </header>

      <Tabs defaultValue="register" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="register">Register Patient</TabsTrigger>
          <TabsTrigger value="list">Patient List</TabsTrigger>
          <TabsTrigger value="query">SQL Query Tool</TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="p-4 border rounded-md">
          <PatientForm onPatientAdded={handlePatientAdded} />
        </TabsContent>

        <TabsContent value="list" className="p-4 border rounded-md">
          <PatientList key={patientListKey} />
        </TabsContent>

        <TabsContent value="query" className="p-4 border rounded-md">
          <QueryTool />
        </TabsContent>
      </Tabs>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Patient Registration System using Next.js, PgLite, and Shadcn UI</p>
        <p className="mt-1">
          Data is stored locally in your browser using PgLite (IndexedDB)
        </p>
      </footer>

      <Toaster />
    </main>
  );
}
