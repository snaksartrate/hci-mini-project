import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs ${className}`}>
      <ol className="flex items-center space-x-1.5 flex-wrap">
        {/* Root Home Item */}
        <li className="inline-flex items-center">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </a>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center space-x-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600 shrink-0" aria-hidden="true" />
              {isLast || !item.href ? (
                <span
                  className="font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[200px] sm:max-w-[320px]"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
