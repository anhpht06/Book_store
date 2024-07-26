import React from "react";
import Profile from "@/components/profile";
export default function page({ params }) {
  return <div>
    <head>
        <title>Profile</title>
      </head>
    <Profile id={params.id} />
    
  </div>;
}
