"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export const deleteProduct = async (idToDelete: number) => {
  await db.product.delete({
    where: {
      id: idToDelete,
    },
  });
  redirect("/products");
};
