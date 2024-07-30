import React from "react";
import CcategoryBook from "@/components/categoryBook";
export default function page({ params }) {
  return (
    <div>
      <title>Category Book</title>

      <CcategoryBook id={params.id} />
    </div>
  );
}
