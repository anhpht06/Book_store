import React from "react";
import SideBarSetting from "@/components/SideBarSetting";
export default function page({ params }) {
  return (
    <div>
      <SideBarSetting id={params.id} />
    </div>
  );
}
