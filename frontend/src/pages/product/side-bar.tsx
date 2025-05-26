import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export default function SidebarSection() {
  const filterOptions = [
    {
      id: "product-type",
      label: "Product Type",
      options: [
        "Shirts",
        "T-Shirts",
        "Pants",
        "Jeans",
        "Jackets",
        "Shoes",
        "Accessories",
      ],
    },
    {
      id: "size",
      label: "Size",
      options: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: "color",
      label: "Color",
      options: ["Black", "White", "Blue", "Red", "Green", "Gray", "Navy"],
    },
  ];

  return (
    <section className="w-full max-w-[414px] py-4 border-r-2 pt-15">
      <div className="flex flex-col w-full gap-6">
        <h2 className="font-bold text-4xl tracking-tight [font-family:'Montserrat-Bold',Helvetica] text-center">
          Women&apos;s Products
        </h2>

        <div className="flex flex-col gap-6 px-6">
          {filterOptions.map((filter) => (
            <Select key={filter.id}>
              <SelectTrigger className="w-full h-[62px] rounded-[7px] border-[1.7px] border-[#c0c0c0] bg-white [font-family:'Montserrat-Regular',Helvetica] text-[17.5px] px-4">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option} value={option.toLowerCase()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>
    </section>
  );
}
