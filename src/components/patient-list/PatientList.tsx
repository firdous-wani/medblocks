"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Patient } from "@/types";
import { runQuery } from "@/lib/db";

export function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const data = await runQuery(`
        SELECT * FROM patients 
        ORDER BY created_at DESC
      `);
      setPatients(data as Patient[]);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const filteredPatients = patients.filter((patient) => {
    const searchFields = [patient.first_name, patient.last_name, patient.email]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchFields.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Patient Records</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={fetchPatients} variant="outline">
            Refresh
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading patients...</div>
      ) : patients.length === 0 ? (
        <div className="text-center py-8">No patients registered yet.</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>
                    {patient.first_name} {patient.last_name}
                  </TableCell>
                  <TableCell>{formatDate(patient.date_of_birth)}</TableCell>
                  <TableCell className="capitalize">{patient.gender}</TableCell>
                  <TableCell>{patient.email || "-"}</TableCell>
                  <TableCell>{patient.phone || "-"}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      {selectedPatient && (
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>
                              Patient Details: {selectedPatient.first_name}{" "}
                              {selectedPatient.last_name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="font-medium">ID:</span>
                              <span className="col-span-2">
                                {selectedPatient.id}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="font-medium">Name:</span>
                              <span className="col-span-2">
                                {selectedPatient.first_name}{" "}
                                {selectedPatient.last_name}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="font-medium">
                                Date of Birth:
                              </span>
                              <span className="col-span-2">
                                {formatDate(selectedPatient.date_of_birth)}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="font-medium">Gender:</span>
                              <span className="col-span-2 capitalize">
                                {selectedPatient.gender}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="font-medium">Email:</span>
                              <span className="col-span-2">
                                {selectedPatient.email || "-"}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="font-medium">Phone:</span>
                              <span className="col-span-2">
                                {selectedPatient.phone || "-"}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="font-medium">Address:</span>
                              <span className="col-span-2">
                                {selectedPatient.address || "-"}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 items-start gap-4">
                              <span className="font-medium">
                                Medical History:
                              </span>
                              <div className="col-span-2 whitespace-pre-wrap">
                                {selectedPatient.medical_history || "-"}
                              </div>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <span className="font-medium">Registered:</span>
                              <span className="col-span-2">
                                {new Date(
                                  selectedPatient.created_at
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
