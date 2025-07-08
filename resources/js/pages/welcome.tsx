import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {Button} from "@/components/ui/button";

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            Homepage
        </>
    );
}
