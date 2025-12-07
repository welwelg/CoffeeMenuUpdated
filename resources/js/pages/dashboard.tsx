import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Coffee, DollarSign, Package, Plus, ShoppingBag } from 'lucide-react'; // Assuming lucide-react is installed, otherwise use SVGs

// 1. Define Data Types
interface CoffeeMenu {
    id: number;
    name: string;
    price: string;
    description: string;
    img: string | null;
    image_url?: string | null;
    created_at?: string;
}

interface Props {
    coffeemenu: CoffeeMenu[];
    totalOrders: number;
    totalSales: number;
    bestSeller: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ coffeemenu, totalOrders, totalSales, bestSeller }: Props) {
    // CONSTANT: Reliable Image Placeholder
    const PLACEHOLDER_IMG = 'https://placehold.co/600x400?text=No+Image';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-8 p-6 md:p-8">

                {/* 1. HEADER SECTION */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Overview</h1>
                        <p className="text-sm text-muted-foreground">Here's what's happening with your coffee shop today.</p>
                    </div>
                    {/* Optional: Add Action Button */}
                    {/* <Button>Download Report</Button> */}
                </div>

                {/* 2. STATS CARDS SECTION */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* CARD 1: SALES */}
                    <Card className="border-l-4 border-l-green-500 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                                {/* SVG for Dollar */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tight">₱{totalSales.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>

                    {/* CARD 2: ORDERS */}
                    <Card className="border-l-4 border-l-blue-500 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                                {/* SVG for Orders */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tight">{totalOrders}</div>
                            <p className="text-xs text-muted-foreground">+180 new orders</p>
                        </CardContent>
                    </Card>

                    {/* CARD 3: BEST SELLER */}
                    <Card className="border-l-4 border-l-amber-500 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Best Seller</CardTitle>
                            <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/30">
                                {/* SVG for Coffee */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold tracking-tight truncate">{bestSeller}</div>
                            <p className="text-xs text-muted-foreground">Most popular item</p>
                        </CardContent>
                    </Card>
                </div>

                {/* 3. MENU SECTION */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Inventory Items</h2>
                        <Badge variant="outline" className="px-3 py-1">
                            {coffeemenu.length} Total
                        </Badge>
                    </div>

                    {coffeemenu.length === 0 ? (
                        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed bg-gray-50/50 p-8 text-center animate-in fade-in zoom-in-95 dark:bg-gray-900/20">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">No items found</h3>
                            <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
                                You haven't added any coffee items to your menu yet. Start by adding your first product.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {coffeemenu.map((coffee) => (
                                <Card
                                    key={coffee.id}
                                    className="group overflow-hidden border-border/60 bg-card transition-all hover:border-amber-500/50 hover:shadow-lg dark:hover:border-amber-400/30"
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                                        <img
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            src={
                                                coffee.img
                                                    ? (coffee.img.startsWith('http') ? coffee.img : `/storage/${coffee.img}`)
                                                    : (coffee.image_url || PLACEHOLDER_IMG)
                                            }
                                            alt={coffee.name}
                                            loading="lazy"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                if (target.src !== PLACEHOLDER_IMG) {
                                                    target.src = PLACEHOLDER_IMG;
                                                }
                                            }}
                                        />
                                        {/* Floating Price Tag */}
                                        <div className="absolute top-2 right-2">
                                            <Badge className="bg-white/90 text-stone-900 shadow-sm backdrop-blur-md hover:bg-white/100 dark:bg-black/80 dark:text-white">
                                                ₱{coffee.price}
                                            </Badge>
                                        </div>
                                    </div>

                                    <CardContent className="p-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-semibold leading-none tracking-tight text-foreground line-clamp-1">
                                                    {coffee.name}
                                                </h3>
                                            </div>

                                            <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                                                {coffee.description}
                                            </p>

                                            <div className="mt-2 flex items-center justify-between pt-2 border-t">
                                                <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50">
                                                    In Stock
                                                </Badge>
                                                {/* Optional: Add an Edit button here later */}
                                                <span className="text-xs text-muted-foreground">ID: {coffee.id}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
