import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart } from "lucide-react";

const products = [
  { id: 1, title: "Satin Slip Dress", price: "199.99", image: "/img-3.png" },
  { id: 2, title: "Satin Slip Dress", price: "199.99", image: "/img-5.png" },
  { id: 3, title: "Satin Slip Dress", price: "199.99", image: "/img.png" },
  { id: 4, title: "Satin Slip Dress", price: "199.99", image: "/img-4.png" },
  { id: 5, title: "Satin Slip Dress", price: "199.99", image: "/img-6.png" },
  { id: 6, title: "Satin Slip Dress", price: "199.99", image: "/img-8.png" },
  { id: 7, title: "Satin Slip Dress", price: "199.99", image: "/img-7.png" },
  { id: 8, title: "Satin Slip Dress", price: "199.99", image: "/img-2.png" },
  { id: 9, title: "Satin Slip Dress", price: "199.99", image: "/img-9.png" },
];

const sortOptions = [
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
  "Popular",
];
const showOptions = ["10", "20", "30", "All"];

const MainContentSection = () => {
  return React.createElement(
    "section",
    { className: "w-full h-full overflow-y-auto py-5 px-6" },
    React.createElement(
      "div",
      { className: "flex items-center mb-8 gap-4 px-6 pt-10" },
      React.createElement(
        "div",
        { className: "flex items-center gap-2" },
        React.createElement(
          "span",
          { className: "font-normal text-xl" },
          "Sort by:"
        ),
        React.createElement(
          Select,
          { defaultValue: "Newest" },
          React.createElement(
            SelectTrigger,
            {
              className:
                "w-[193px] h-[37px] border-[#c0c0c0] bg-white rounded-[4px]",
            },
            React.createElement(SelectValue, { placeholder: "Newest" })
          ),
          React.createElement(
            SelectContent,
            null,
            ...sortOptions.map((option) =>
              React.createElement(
                SelectItem,
                { key: option, value: option },
                option
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "flex items-center gap-2 ml-6" },
        React.createElement(
          "span",
          { className: "font-normal text-xl" },
          "Show:"
        ),
        React.createElement(
          Select,
          { defaultValue: "10" },
          React.createElement(
            SelectTrigger,
            {
              className:
                "w-[193px] h-[37px] border-[#c0c0c0] bg-white rounded-[4px]",
            },
            React.createElement(SelectValue, { placeholder: "10" })
          ),
          React.createElement(
            SelectContent,
            null,
            ...showOptions.map((option) =>
              React.createElement(
                SelectItem,
                { key: option, value: option },
                option
              )
            )
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-7" },
      ...products.map((product) =>
        React.createElement(
          Card,
          {
            key: product.id,
            className : "w-full h-[408px] rounded-2xl overflow-hidden shadow-[0px_4px_6px_#0000001a,0px_2px_4px_#0000001a] border-0 transform transition-transform duration-300 hover:scale-[1.02]",
          },
          React.createElement("div", {
            className: "w-full h-64 bg-cover bg-center",
            style: { backgroundImage: `url(${product.image})` },
          }),
          React.createElement(
            CardContent,
            { className: "p-0" },
            React.createElement(
              "div",
              { className: "p-5 h-[152px] flex flex-col" },
              React.createElement(
                "h3",
                {
                  className:
                    "font-semibold text-lg leading-[18px] font-['Poppins-SemiBold',Helvetica]",
                },
                product.title
              ),
              React.createElement(
                "p",
                {
                  className:
                    "text-gray-500 text-base mt-2 font-['Poppins-Regular',Helvetica]",
                },
                `$ ${product.price}`
              ),
              React.createElement(
                Button,
                {
                  className:
                    "mt-5 h-10 rounded-full bg-[#232323] hover:bg-[#333333] text-white font-medium",
                },
                React.createElement(
                  "span",
                  { className: "font-['Poppins-Medium',Helvetica]" },
                  "Add to Cart"
                ),
                React.createElement(ShoppingCart, {
                  className: "ml-2 h-4 w-3.5",
                })
              )
            )
          )
        )
      )
    )
  );
};

export default MainContentSection;
