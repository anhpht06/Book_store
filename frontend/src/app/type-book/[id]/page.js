"use client";
import React from "react";
import CtypeBook from "@/components/typeBook";

export default function page({ params }) {
  return (
    <div>
      <head>
        <title>Type Book</title>
      </head>
      <CtypeBook id={params.id} />
    </div>
  );
}
