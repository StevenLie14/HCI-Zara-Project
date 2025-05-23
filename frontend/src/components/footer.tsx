import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

export const FooterSection = () => {
  const footerData = {
    categories: [
      { title: "Woman", link: "#" },
      { title: "Men", link: "#" },
      { title: "Kids", link: "#" },
      { title: "Accessories", link: "#" },
    ],
    policies: [
      { title: "Term & Conditions", link: "#" },
      { title: "Privacy Policy", link: "#" },
      { title: "Cookie Policy", link: "#" },
      { title: "Return Policy", link: "#" },
    ],
    help: [
      { title: "How to Shop", link: "#" },
      { title: "Shipping & Returns", link: "#" },
      { title: "Payment", link: "#" },
      { title: "Contact Us", link: "#" },
    ],
    company: [
      { title: "About Us", link: "#" },
      { title: "Careers", link: "#" },
      { title: "Sustainability", link: "#" },
      { title: "Press", link: "#" },
    ],
  };

  return (
    <footer className="w-full  border-t ">
      <div className="max-w-[1152px] mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <h2 className="font-normal text-2xl tracking-[2.40px] leading-6  [font-family:'GFS_Didot-Regular',Helvetica]">
              ZARA
            </h2>
            <p className="mt-6 text-sm [font-family:'Poppins-Regular',Helvetica] leading-[14px]">
              Koleksi fashion modern dan elegan untuk segala suasana. Temukan
              gaya yang kamu suka hanya di ZARA.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className=" hover:text-gray-900">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className=" hover:text-gray-900">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className=" hover:text-gray-900">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base  [font-family:'Poppins-SemiBold',Helvetica] leading-4">
              Categories
            </h3>
            <ul className="mt-4 space-y-3">
              {footerData.categories.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-base  [font-family:'Poppins-Regular',Helvetica] leading-4"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base  [font-family:'Poppins-SemiBold',Helvetica] leading-4">
              Policies
            </h3>
            <ul className="mt-4 space-y-3">
              {footerData.policies.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-base [font-family:'Poppins-Regular',Helvetica] leading-4"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base  [font-family:'Poppins-SemiBold',Helvetica] leading-4">
              Help
            </h3>
            <ul className="mt-4 space-y-3">
              {footerData.help.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-base  [font-family:'Poppins-Regular',Helvetica] leading-4"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base  [font-family:'Poppins-SemiBold',Helvetica] leading-4">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerData.company.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-base [font-family:'Poppins-Regular',Helvetica] leading-4"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ece9f7] py-4">
        <div className="text-center">
          <p className="text-sm  [font-family:'Poppins-Regular',Helvetica]">
            © 2025 ZARA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
