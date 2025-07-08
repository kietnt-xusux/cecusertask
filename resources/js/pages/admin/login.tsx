import React, {FormEventHandler, useState} from 'react';
import {Link, router} from '@inertiajs/react'
import { Head, useForm } from '@inertiajs/react';
import {Toaster} from "sonner";
import {EyeIcon, EyeOffIcon, LoaderCircle} from "lucide-react";
import notify from "@/components/notify";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function AdminLogin () {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [passwordType, setPasswordType] = useState('password');

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.auth.store'), {
            onFinish: () => {
                reset('password')
                clearErrors();
            },
            onError: (e) => {
                notify.error(e.email ?? "メールアドレス、またはパスワードに誤りがあります");
            }
        })
    }

    const changePasswordType = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    }

    return <>
        <Toaster />
        <Head title="ログイン" />
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>アカウントにログイン</CardTitle>
                            <CardDescription>
                                メールアドレスを入力してログイン
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">メールアドレス</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            name="email"
                                            required
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">パスワード</Label>
                                            <Link
                                                href={'/admin/password-reset'}
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                パスワードをお忘れですか？
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={passwordType}
                                                name="password"
                                                required
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                            <span
                                                className='absolute right-2 top-1.5 cursor-pointer px-0.5'
                                                onClick={changePasswordType}
                                            >
                                                {passwordType === 'password' ?
                                                    <EyeOffIcon />:
                                                    <EyeIcon />
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Button type="submit" className="w-full">
                                            {processing ? <LoaderCircle className="animate-spin" /> : 'ログイン'}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </>
}
