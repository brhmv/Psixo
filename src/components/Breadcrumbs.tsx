import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 py-3 overflow-x-auto whitespace-nowrap scrollbar-none" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-[#251D4B] transition-colors font-medium text-slate-600"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Ana səhifə</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast || !item.path ? (
              <span className="font-semibold text-[#251D4B] truncate max-w-xs sm:max-w-md">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-[#251D4B] transition-colors font-medium text-slate-600 truncate max-w-xs"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
