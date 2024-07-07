"use client";

import { useRef } from "react";

interface SearchFormProps {
  searchProducts: (formData: FormData) => Promise<void>;
}

export default function SearchForm({ searchProducts }: SearchFormProps) {
  const queryRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={queryRef}
      action={async (formData) => {
        await searchProducts(formData);
        queryRef.current?.reset();
      }}
    >
      <div className="form-control">
        <input
          name="searchQuery"
          placeholder="Search"
          className="input input-bordered w-full min-w-[100px]"
        />
      </div>
    </form>
  );
}
