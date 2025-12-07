import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface CoffeeMenu {
    id: number;
    name: string;
    price: string;
    description: string;
    img: string | null;
    created_at?: string;
    image_url?: string | null; // Added based on our previous DB changes
}

interface Props {
    coffeemenu?: CoffeeMenu[];
}

export default function Welcome({ coffeemenu = [] }: Props) {
    const { auth } = usePage<SharedData>().props;

    const scrollToMenu = () => {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            {/* Main Background */}
            <div className="flex min-h-screen flex-col items-center bg-[#F5F5F0] text-[#1c1917] selection:bg-amber-200 dark:bg-[#0c0a09] dark:text-[#fafaf9]">

                {/* Decorative Background Effects */}
                <div className="fixed inset-0 -z-10 h-full w-full bg-[#F5F5F0] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[#0c0a09] dark:bg-[radial-gradient(#1c1917_1px,transparent_1px)]"></div>
                <div className="fixed top-0 -z-10 h-[500px] w-full bg-gradient-to-b from-amber-50/50 to-transparent blur-3xl dark:from-amber-950/20"></div>

                {/* Navigation */}
                <header className="sticky top-4 z-50 mt-4 w-full max-w-5xl rounded-full border border-white/40 bg-white/60 px-6 py-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/40">
                    <nav className="flex items-center justify-between">
                        <div className="text-lg font-bold tracking-tighter text-amber-900 dark:text-amber-100">
                            ☕ Coffee<span className="text-amber-600">Menu</span>
                        </div>

                        <div className="flex gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex h-9 items-center justify-center rounded-full bg-amber-900 px-6 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 dark:bg-amber-100 dark:text-amber-950 dark:hover:bg-amber-200"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Button variant="ghost" className="rounded-full hover:bg-amber-100 hover:text-amber-900 dark:hover:bg-amber-900/30 dark:hover:text-amber-100" asChild>
                                        <Link href={route('login')}>Log in</Link>
                                    </Button>

                                    <Button className="rounded-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:text-white dark:hover:bg-amber-600" asChild>
                                        <Link href={route('register')}>Register</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="flex w-full max-w-7xl flex-grow flex-col items-center px-4 pt-16 lg:pt-24">
                    {/* Hero Section */}
                    <div className="text-center">
                        <Badge variant="outline" className="mb-4 rounded-full border-amber-200 bg-amber-50 px-4 py-1 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
                            ✨ Freshly roasted daily
                        </Badge>
                        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-stone-900 sm:text-7xl dark:text-stone-50">
                            Sip the <span className="text-amber-600">Extraordinary</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-600 dark:text-stone-400">
                            Welcome to our coffee shop. We source the finest beans from around the globe to bring you a cup that warms your soul.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Button onClick={scrollToMenu} size="lg" className="rounded-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200">
                                View Menu
                            </Button>
                        </div>
                    </div>

                    {/* Coffee Menu Grid */}
                    <div id="menu" className="mt-20 w-full pb-20">
                        <div className="mb-10 flex items-center justify-between border-b border-stone-200 pb-4 dark:border-stone-800">
                            <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
                                Curated Menu
                            </h2>
                            <p className="hidden text-sm text-stone-500 sm:block dark:text-stone-400">
                                {coffeemenu.length} Items Available
                            </p>
                        </div>

                        {coffeemenu.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-stone-50 py-24 text-center dark:border-stone-700 dark:bg-stone-900/50">
                                <div className="mb-4 rounded-full bg-stone-100 p-6 text-4xl dark:bg-stone-800">☕</div>
                                <h3 className="text-lg font-semibold text-stone-900 dark:text-white">Menu Updating</h3>
                                <p className="text-stone-500 dark:text-stone-400">Our baristas are crafting new items. Check back soon!</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {coffeemenu.map((coffee) => (
                                    <Card
                                        key={coffee.id}
                                        className="group relative overflow-hidden rounded-3xl border-0 bg-white shadow-[0_2px_20px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:bg-stone-900 dark:shadow-none dark:ring-1 dark:ring-white/10"
                                    >
                                        {/* Image Section */}
                                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                                            <img
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                // LOGIC: Use Cloudinary (img) OR Text Link (image_url) OR Placeholder
                                                src={
                                                    coffee.img
                                                    ? (coffee.img.startsWith('http') ? coffee.img : `/storage/${coffee.img}`)
                                                    : (coffee.image_url || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600')
                                                }
                                                alt={coffee.name}
                                                loading="lazy"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    // High quality fallback
                                                    target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600';
                                                }}
                                            />

                                            {/* Price Tag styling */}
                                            <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-stone-900 shadow-sm backdrop-blur-sm dark:bg-black/80 dark:text-white">
                                                ₱{coffee.price}
                                            </div>
                                        </div>

                                        <CardContent className="p-5">
                                            <div className="mb-3">
                                                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-50">
                                                    {coffee.name}
                                                </h3>
                                                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                                                    {coffee.description}
                                                </p>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800">
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                                                >
                                                    In Stock
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-auto w-full border-t border-stone-200 bg-white py-12 dark:border-stone-800 dark:bg-stone-950">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                            <div className="max-w-xs">
                                <h3 className="mb-4 text-xl font-bold text-stone-900 dark:text-white">CoffeeMenu</h3>
                                <p className="text-sm text-stone-500 dark:text-stone-400">
                                    Crafting moments of clarity and joy, one cup at a time. Established 2024.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-stone-900 dark:text-stone-100">Shop</h4>
                                    <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
                                        <li><a href="#" className="hover:text-amber-600">Coffee</a></li>
                                        <li><a href="#" className="hover:text-amber-600">Equipment</a></li>
                                        <li><a href="#" className="hover:text-amber-600">Merch</a></li>
                                    </ul>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-stone-900 dark:text-stone-100">Contact</h4>
                                    <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
                                        <li>123 Coffee Street</li>
                                        <li>+63 912 345 6789</li>
                                        <li>info@coffeeshop.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col items-center justify-between border-t border-stone-100 pt-8 text-sm text-stone-400 md:flex-row dark:border-stone-900">
                            <p>&copy; {new Date().getFullYear()} Developed by WelTechCode.</p>
                            <div className="mt-4 flex gap-4 md:mt-0">
                                <a href="#" className="hover:text-stone-600">Privacy</a>
                                <a href="#" className="hover:text-stone-600">Terms</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
