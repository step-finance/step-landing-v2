import { NextResponse } from "next/server";

import { getValidatorSnapshot } from "@/lib/validator/queries";

export const revalidate = 60;

export async function GET() {
  const snapshot = await getValidatorSnapshot();
  return NextResponse.json(snapshot);
}
