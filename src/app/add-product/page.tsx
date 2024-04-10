import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add Product - Flomazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }
  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default function AddProductPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-3 text-center text-3xl font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          type="text"
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          rows={3}
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          type="url"
          required
          name="imageUrl"
          placeholder="Image URL"
          className="input input-bordered mb-3 w-full"
        />
        <input
          type="number"
          required
          name="price"
          placeholder="Price"
          className="input input-bordered mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
