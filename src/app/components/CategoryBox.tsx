"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected: boolean;
  description: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  description,
}) => {
  const params = useSearchParams();
  const router = useRouter();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    let updateQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updateQuery["category"];
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label,params,router]);

  return (
    <div
      onClick={handleClick}
      className={`flex 
      flex-col 
      items-center 
      justify-center 
      gap-2 p-3         border-b-2 hover:text-neutral-800 transition cursor-pointer
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
  
      <Icon size={26}></Icon>
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
