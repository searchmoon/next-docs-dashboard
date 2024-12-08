"use server";

import { z } from "zod"; // 유효성 검사 라이브러리
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// zod 를 사용하여 유효성 검사를 하려면 입력 폼에 대한 스키마를 작성해야한다.
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

  //데이터베이스가 업데이트 되었을때, 이 경로가 재검증이 되고, 서버에서 새로운 데이터를 가지고온다.
  // revalidatePath는 재검증역할
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}