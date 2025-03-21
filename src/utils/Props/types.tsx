// Define the Company interface
export interface Company {
    id: number;
    email: string;
    phone: string;
    contactPerson: string;
    companyName: string;
    Status: string;
  }
  
  // Define a type for status options
  export type StatusOption = "Approved" | "Pending" | "Rejected";
  
  // Define an enum for user roles
  export enum UserRole {
    Admin = "Admin",
    Editor = "Editor",
    Viewer = "Viewer",
  }
  
  // Define a utility type for a partial Company object
  export type PartialCompany = Partial<Company>;
  
  // Define a type for the table column configuration
  export interface TableColumn {
    key: keyof Company; // Key of the Company interface
    label: string; // Display label for the column
    width?: number; // Optional width for the column
  }
  
  // Define a type for the table props
  export interface TableProps {
    data: Company[];
    columns: TableColumn[];
    showActions?: boolean;
    showStatus?: boolean;
    checkbox?: boolean;
  }