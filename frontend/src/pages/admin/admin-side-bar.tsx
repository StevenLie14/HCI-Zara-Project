import { HomeIcon, PackageIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function AdminSideBarSection() {
  return (
    <nav className="h-full w-[289px] bg-white border-r border-solid">
      <div className="flex flex-col h-full">
        <div className="px-8 pt-8 pb-6">
          <h1 className="font-bold text-[34px] text-black">ZARA Admin</h1>
        </div>

        <div className="px-6 space-y-2">
          <Link
            to="/admin-dashboard-page"
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <HomeIcon className="w-9 h-9 text-gray-700" />
            <span className="font-bold text-[19px] text-gray-700">
              Dashboard
            </span>
          </Link>

          <Link
            to="#"
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <PackageIcon className="w-9 h-9 text-gray-700" />
            <span className="font-bold text-[19px] text-gray-700">Produk</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
