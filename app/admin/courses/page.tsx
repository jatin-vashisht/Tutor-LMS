import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link className={buttonVariants()} href="/admin/courses/create">
          <Plus /> Create Course
        </Link>
      </div>
      <div>
        <h1>You will see all your courses here</h1>
      </div>
    </>
  );
};

export default page;
