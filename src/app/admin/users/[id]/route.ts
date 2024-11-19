import {NextResponse} from "next/server";
import { redirect } from "next/navigation";
export const dynamic = 'force-static';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    return redirect('/admin/users/detail');
}

export function generateStaticParams() {
    return [{ id: 'any'}];
}
