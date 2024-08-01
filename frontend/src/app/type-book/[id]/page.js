"use client";
import React from "react";
import CtypeBook from "@/components/typeBook";

export default function page({ params }) {
  return (
    <div>
      <title>Type Book</title>

      <CtypeBook id={params.id} />
    </div>
  );
}
