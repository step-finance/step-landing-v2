import { NextResponse } from "next/server";

import { getValidatorHistory } from "@/lib/validator/queries";

export const revalidate = 60;

export async function GET() {
  const history = await getValidatorHistory();
  return NextResponse.json(history);
}
