"use client";
import React from "react";
import CtypeBook from "@/components/typeBook";

export default function page({ params }) {
  return (
    <div>
      <CtypeBook id={params.id} />
    </div>
  );
}
