import React from "react";

export default function ContainerComponent() {
  return (
    <div className="p-5 m-3 flex flex-col bg-slate-100/90 hover:bg-slate-100 hover:duration-200 w-5/6 min-h-fit snap-start scroll-mt-2 drop-shadow-lg hover:drop-shadow-2xl rounded-md z-30">
      <h1>Container</h1>
      <ul>
        <li>data</li>
        <li>data</li>
        <li>data</li>
      </ul>
      <section className="flex flex-row p-4 gap-4">
        <div className="bg-slate-400 h-14 w-14 bg-red-500/40 rounded-full"></div>
        <div className="bg-slate-400 h-14 w-14 bg-yellow-500/40 rounded-full"></div>
        <div className="bg-slate-400 h-14 w-14 bg-green-500/40 rounded-full"></div>
      </section>
    </div>
  )
}