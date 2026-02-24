// ProfileInfoCard.tsx
import React from "react";

type InfoItem = {
  label?: string;
  value: string | number;
};

export default function ProfileInfoCard({
  title,
  data = [],
}: {
  title?: string;
  data: InfoItem[];
}) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-6">
      {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}

      <div className="grid grid-cols-4 gap-4 w-full">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-sm text-gray-500">{item.label}</span>
            <span className="text-sm text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
