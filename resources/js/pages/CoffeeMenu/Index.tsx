import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, SquareCheckBig, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Coffee Menu', href: '/coffee-menu' }];

interface CoffeeMenu {
    id: number;
    name: string;
    price: string;
    description: string;
    img: string | null;
    image_url: string | null;
}

interface PageProps {
    flash: { message?: string };
    coffeemenu: CoffeeMenu[];
}

export default function Index() {
    const { coffeemenu, flash } = usePage().props as unknown as PageProps;
    const [processing, setProcessing] = useState<number | null>(null);

    // Reliable Placeholder (SVG based, very fast)
    const PLACEHOLDER_IMG = 'https://placehold.co/100x100?text=No+Img';

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            setProcessing(id);
            router.delete(route('coffee-menu.destroy', id), {
                onFinish: () => setProcessing(null),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Coffee Menu" />

            <div className="flex h-full flex-1 flex-col gap-8 p-6 md:p-8">
                {/* 1. HEADER SECTION with Action Button */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Coffee Menu</h1>
                        <p className="text-sm text-muted-foreground">Manage your coffee items, prices, and images.</p>
                    </div>
                    {coffeemenu.length > 0 && (
                        <Link href={route('coffee-menu.create')}>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Coffee
                            </Button>
                        </Link>
                    )}
                </div>

                {/* 2. FLASH MESSAGE */}
                {flash.message && (
                    <Alert
                        variant="default"
                        className="border-green-200 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-300"
                    >
                        <SquareCheckBig className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}

                {/* 3. MAIN CONTENT */}
                <Card className="border-border/60 shadow-sm">
                    <CardHeader>
                        <CardTitle>Current Inventory</CardTitle>
                        <CardDescription>A list of all coffee items currently available on the menu.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {coffeemenu.length === 0 ? (
                            // EMPTY STATE
                            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                                <div className="mb-4 rounded-full bg-muted p-4">
                                    <Plus className="h-8 w-8 opacity-50" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground">No coffees added yet</h3>
                                <p className="mb-4 text-sm">Get started by creating your first coffee menu item.</p>
                                <Link href={route('coffee-menu.create')}>
                                    <Button className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Coffee
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            // TABLE VIEW
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="w-[80px]">Image</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead className="hidden md:table-cell">Description</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {coffeemenu.map((coffee) => (
                                            <TableRow key={coffee.id} className="group">
                                                {/* Image Cell */}
                                                <TableCell>
                                                    <div className="h-12 w-12 overflow-hidden rounded-md border bg-muted">
                                                        <img
                                                            src={
                                                                coffee.img
                                                                    ? coffee.img.startsWith('http')
                                                                        ? coffee.img
                                                                        : `/storage/${coffee.img}`
                                                                    : coffee.image_url || PLACEHOLDER_IMG
                                                            }
                                                            alt={coffee.name}
                                                            className="h-full w-full object-cover"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                if (target.src !== PLACEHOLDER_IMG) {
                                                                    target.src = PLACEHOLDER_IMG;
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </TableCell>

                                                {/* Name Cell */}
                                                <TableCell className="font-medium">{coffee.name}</TableCell>

                                                {/* Price Cell */}
                                                <TableCell>
                                                    <Badge variant="secondary" className="font-mono">
                                                        ₱{coffee.price}
                                                    </Badge>
                                                </TableCell>

                                                {/* Description Cell (Hidden on mobile) */}
                                                <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">
                                                    {coffee.description}
                                                </TableCell>

                                                {/* Actions Cell */}
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={route('coffee-menu.edit', coffee.id)}>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                                <span className="sr-only">Edit</span>
                                                            </Button>
                                                        </Link>

                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                                                            disabled={processing === coffee.id}
                                                            onClick={() => handleDelete(coffee.id, coffee.name)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only">Delete</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
