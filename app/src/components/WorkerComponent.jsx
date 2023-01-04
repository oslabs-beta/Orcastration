import React from "react";
import ContainerComponent from "./ContainerComponent";

export default function WorkerComponent() {
  return (
    <div className="w-64 h-96 bg-slate-400 flex flex-col items-center justify-items-end gap-y-2.5 overflow-auto snap-y scroll-smooth pt-2.5 rounded-md">
      <ContainerComponent />
      <ContainerComponent />
      <ContainerComponent />
      <ContainerComponent />
      <ContainerComponent />
      <ContainerComponent />
      <ContainerComponent />
    </div>
  ) 
}