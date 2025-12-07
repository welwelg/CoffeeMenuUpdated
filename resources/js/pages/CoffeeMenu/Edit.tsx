import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react'; // Changed router to useForm only
import { CircleAlert } from 'lucide-react';

interface CoffeeMenu {
    id: number;
    name: string;
    price: string;
    description: string;
    img: string | null;
    image_url: string | null;
}

interface Props {
    coffeemenu: CoffeeMenu;
}

export default function Edit({ coffeemenu }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Trick Laravel into treating this POST as a PUT for file support
        name: coffeemenu.name,
        price: coffeemenu.price,
        description: coffeemenu.description,
        img: null as File | null,
        image_url: coffeemenu.image_url || '', // Pre-fill existing URL if it exists
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // We use post() because sending Files via actual PUT requests often fails in PHP/Laravel
        post(route('coffee-menu.update', coffeemenu.id));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit Coffee', href: `/coffee-menu/${coffeemenu.id}/edit` }]}>
            <Head title="Edit Coffee" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} className="space-y-4">

                    {/* Errors */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{Object.values(errors).map((err: string, idx) => (
                                    <div key={idx}>{err}</div>
                                ))}
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Basic Fields */}
                    <div>
                        <Label>Name</Label>
                        <Input value={data.name} onChange={e => setData('name', e.target.value)} />
                    </div>
                    <div>
                        <Label>Price</Label>
                        <Input value={data.price} onChange={e => setData('price', e.target.value)} />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Textarea value={data.description} onChange={e => setData('description', e.target.value)} />
                    </div>

                    {/* CURRENT IMAGE PREVIEW */}
                    <div className="mb-4">
                        <Label>Current Image</Label>
                        <div className="mt-2">
                            <img
                                src={coffeemenu.img || coffeemenu.image_url || 'https://placehold.co/300x200?text=No+Image'}
                                alt="Current"
                                className="w-32 h-32 object-cover rounded border"
                            />
                        </div>
                    </div>

                    {/* UPLOAD SECTION */}
                    <div className="p-4 border rounded bg-gray-50 space-y-4">
                        <div>
                            <Label>Replace with File</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={e => setData('img', e.target.files?.[0] || null)}
                                disabled={!!data.image_url}
                                className="bg-white"
                            />
                        </div>
                        <div className="text-center text-xs text-gray-400">OR</div>
                        <div>
                            <Label>Replace with Link</Label>
                            <Input
                                placeholder="https://..."
                                value={data.image_url}
                                onChange={e => setData('image_url', e.target.value)}
                                disabled={!!data.img}
                                className="bg-white"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>{processing ? 'Updating...' : 'Update Coffee'}</Button>
                        <Link href={route('coffee-menu.index')}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
