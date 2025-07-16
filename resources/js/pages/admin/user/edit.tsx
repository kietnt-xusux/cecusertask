import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from "@/components/Admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUserRole } from "@/lib/utils";
import notify from "@/components/notify";
import AvatarUpload from "@/components/avatar-upload";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
}

interface Props {
    user: User;
}

const breadcrumbs = [
    {
        title: 'Users',
        href: '/admin/users',
    },
    {
        title: 'Edit User',
        href: '#',
    }
];

export default function UserEdit({ user }: Props) {
    const { data, setData, put, processing, errors, clearErrors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        avatar: user.avatar || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`, {
            onSuccess: () => {
                notify.success('User updated successfully');
            },
            onError: (errors) => {
                Object.keys(errors).forEach(key => {
                    notify.error(errors[key]);
                });
            },
            onFinish: () => {
                clearErrors();
            }
        });
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
            <div className="h-full flex-1 flex-col space-y-4 p-2 sm:px-6 sm:pt-2 sm:pb-10 md:flex">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Edit User</h2>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Edit User Information</CardTitle>
                        <CardDescription>
                            Update the information for user: {user.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter user name"
                                    required
                                    autoComplete="off"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="example@email.com"
                                    required
                                    autoComplete="off"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Leave blank to keep current password"
                                    autoComplete="new-password"
                                />
                                <p className="text-sm text-gray-500">Leave blank to keep current password</p>
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="role">Role *</Label>
                                <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getUserRole().map((role) => (
                                            <SelectItem key={role.value} value={role.value.toString()}>
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.role && (
                                    <p className="text-sm text-red-500">{errors.role}</p>
                                )}
                            </div>

                            <AvatarUpload
                                value={data.avatar}
                                onChange={(value) => setData('avatar', value)}
                                label="Avatar"
                            />

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
} 