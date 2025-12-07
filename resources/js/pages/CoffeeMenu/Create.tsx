import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

type CoffeeFormData = {
    name: string;
    price: string;
    description: string;
    img: File | null;
    image_url: string;
};

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<CoffeeFormData>({
        name: '',
        price: '',
        description: '',
        img: null,
        image_url: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('coffee-menu.store'));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Add New Coffee', href: '/coffee-menu/create' }]}>
            <Head title="Add Coffee" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* ERROR DISPLAY SECTION */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc pl-5">
                                    {/* FIX APPLIED HERE: Added 'as string' */}
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Coffee Name</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    </div>

                    {/* Price */}
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" type="number" step="0.01" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    </div>

                    {/* FILE UPLOAD */}
                    <div className="p-4 border rounded bg-gray-50">
                        <Label htmlFor="img">Option A: Upload Image</Label>
                        <Input
                            id="img"
                            type="file"
                            accept="image/*"
                            // Improved safety check for files
                            onChange={(e) => setData('img', e.target.files?.[0] || null)}
                            disabled={!!data.image_url}
                            className="bg-white"
                        />
                    </div>

                    <div className="text-center text-gray-400 font-bold">- OR -</div>

                    {/* URL INPUT */}
                    <div className="p-4 border rounded bg-gray-50">
                        <Label htmlFor="image_url">Option B: Paste Image Link</Label>
                        <Input
                            id="image_url"
                            type="url"
                            placeholder="https://example.com/coffee.jpg"
                            value={data.image_url}
                            onChange={(e) => setData('image_url', e.target.value)}
                            disabled={!!data.img}
                            className="bg-white"
                        />
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Add Coffee'}</Button>
                        <Link href={route('coffee-menu.index')}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
