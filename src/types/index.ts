import { z } from "zod";

export const patientSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  phone: z.string().optional(),
  address: z.string().optional(),
  medical_history: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;

export interface Patient extends PatientFormData {
  id: number;
  created_at: string;
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
  error?: string;
}
