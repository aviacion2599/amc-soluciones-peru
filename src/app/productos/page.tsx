import { Suspense } from "react";
import ProductosClient from "./ProductosClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-sm text-muted-foreground">Cargando productos...</div>
        </div>
      }
    >
      <ProductosClient />
    </Suspense>
  );
}
