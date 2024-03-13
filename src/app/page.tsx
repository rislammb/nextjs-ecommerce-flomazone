import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex justify-between gap-6">
        <h1 className="text-3xl">Welcome to Nextjs Ecommerce</h1>
        <Link href={"/add-product"} className="btn btn-primary">
          Add
        </Link>
      </div>

      <div className="flex gap-6 flex-wrap justify-center">
        <Suspense
          fallback={<h3 className="text-center text-3xl">Loading..</h3>}
        >
          {products?.length > 0 &&
            products.map((product) => (
              <div key={product.id} className="card bg-blue-50 max-w-sm">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={320}
                  height={240}
                  className="w-full object-cover rounded-t-2xl h-[240px]"
                />
                <div className="card-body">
                  <h2 className="card-title text-green-700">{product.name}</h2>
                  <p>{product.description.substring(0, 145)}</p>
                  <p className="font-bold">Price: ${product.price / 100}</p>
                </div>
              </div>
            ))}
        </Suspense>
      </div>
    </div>
  );
}
