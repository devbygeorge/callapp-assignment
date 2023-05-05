interface FormData {
  name: string;
  email: string;
  gender: string;
  street: string;
  city: string;
  phone: string;
}

interface FormField {
  name: string[];
  value: string | null;
  errors?: string[];
}

export type { FormData, FormField };
