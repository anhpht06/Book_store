import React from "react";
import CcategoryBook from "@/components/categoryBook";
export default function page({ params }) {
  return (
    <div>
      <head>
        <title>Category Book</title>
      </head>
      <CcategoryBook id={params.id} />
    </div>
  );
}
