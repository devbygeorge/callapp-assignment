interface Person {
  id: number | null;
  name: string;
  email: string;
  gender: string | null;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

export type { Person };
