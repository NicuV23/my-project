import * as React from "react";

export const BrandingSidebar = () => {
  return (
    <aside className="hidden lg:flex w-1/3 bg-gradient-to-br from-red-600 via-red-500 to-rose-400 justify-center items-center p-8">
      <div className="max-w-sm">
        <h1 className="text-3xl font-bold text-white mb-4">EventHub</h1>
        <p className="text-lg text-gray-100">
          Discover and join amazing events happening in your area.
        </p>
      </div>
    </aside>
  );
};
