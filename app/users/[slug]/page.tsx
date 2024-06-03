import Alert from "@/app/components/Alert";
import Spinner from "@/app/components/Spinner";
import { UserUpdateForm } from "@/app/components/users/UpdateForm";
import { UserEdit } from "@/app/components/users/UserEdit";
import { useGetResQuery } from "@/lib/features/res/resActions";
import { useGetUserByIdQuery } from "@/lib/features/users/userActions";
import React from "react";
type Params = {
  params: {
    slug: string;
  };
};
export default function Page({ params }: Params) {
  const { slug } = params;

  let content = <UserEdit params={{ slug }} />;
  return content;
}
