import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: { query: string; page: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - Flowmazon`,
  };
}

export default async function SearchPage({
  searchParams: { query, page = "1" },
}: SearchPageProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;

  const totalItemCount = await prisma.product.count({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
  });
  const totalPages = Math.ceil(totalItemCount / pageSize);

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  if (products.length === 0) {
    return <div className="text-center">No products found</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
        />
      )}
    </div>
  );
}
