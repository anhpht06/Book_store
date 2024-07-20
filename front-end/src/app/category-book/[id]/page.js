import React from "react";
import CcategoryBook from "@/components/categoryBook";
export default function page({ params }) {
  return (
    <div>
      <CcategoryBook id={params.id} />
    </div>
  );
}
