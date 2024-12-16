'use client';

import Breadcrumbs from "./Breadcrumbs";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: {
    label: string;
    href: string;
  }[];
}

export default function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-xl text-gray-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
