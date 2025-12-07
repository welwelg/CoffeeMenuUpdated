<?php

namespace App\Http\Controllers;

use App\Models\CoffeeMenu;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
// 1. IMPORT THE RAW CLOUDINARY CLASS (Not the Facade)
use Cloudinary\Cloudinary;

class CoffeeMenuController extends Controller
{
    // Helper function to get Cloudinary instance
    private function getCloudinary()
    {
        return new Cloudinary([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key'    => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
            'url' => [
                'secure' => true
            ]
        ]);
    }

    public function dashboard()
    {
        $coffeemenu  = CoffeeMenu::latest()->get();
        return Inertia::render('dashboard', [
            'coffeemenu' => $coffeemenu,
            'totalOrders' => 150,
            'totalSales' => 2500.50,
            'bestSeller' => 'Espresso'
        ]);
    }

    public function index()
    {
        return Inertia::render('CoffeeMenu/Index', [
            'coffeemenu' => CoffeeMenu::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('CoffeeMenu/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:255', Rule::unique('coffee_menus', 'name')],
            'price'       => 'required|numeric|min:0',
            'description' => 'required|string|max:255',
            'img'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'image_url'   => 'nullable|url|max:500',
        ]);

        $finalCloudinaryUrl = null;

        // 2. Initialize Cloudinary Manually
        $cloudinary = $this->getCloudinary();

        try {
            // OPTION A: File Upload
            if ($request->hasFile('img')) {
                $result = $cloudinary->uploadApi()->upload(
                    $request->file('img')->getRealPath(),
                    ['folder' => 'coffee-menu']
                );
                $finalCloudinaryUrl = $result['secure_url'];
            }
            // OPTION B: Link Upload
            elseif ($request->filled('image_url')) {
                $result = $cloudinary->uploadApi()->upload(
                    $request->input('image_url'),
                    ['folder' => 'coffee-menu']
                );
                $finalCloudinaryUrl = $result['secure_url'];
            }
        } catch (\Exception $e) {
            // If upload fails, just continue (or handle error as you wish)
            // dd($e->getMessage());
        }

        CoffeeMenu::create([
            'name'        => $validated['name'],
            'price'       => $validated['price'],
            'description' => $validated['description'],
            'img'         => $finalCloudinaryUrl,
            'image_url'   => null,
        ]);

        return redirect()->route('coffee-menu.index')->with('message', 'Coffee added successfully!');
    }

    public function show(CoffeeMenu $coffeemenu)
    {
        //
    }

    public function edit(CoffeeMenu $coffeemenu)
    {
        return Inertia::render('CoffeeMenu/Edit', compact('coffeemenu'));
    }

    public function update(Request $request, CoffeeMenu $coffeemenu)
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:255', Rule::unique('coffee_menus', 'name')->ignore($coffeemenu->id)],
            'price'       => 'required|numeric|min:0',
            'description' => 'required|string|max:255',
            'img'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'image_url'   => 'nullable|url|max:500',
        ]);

        $dataToUpdate = [
            'name'        => $validated['name'],
            'price'       => $validated['price'],
            'description' => $validated['description'],
        ];

        // 3. Initialize Cloudinary Manually
        $cloudinary = $this->getCloudinary();

        try {
            if ($request->hasFile('img')) {
                $result = $cloudinary->uploadApi()->upload(
                    $request->file('img')->getRealPath(),
                    ['folder' => 'coffee-menu']
                );
                $dataToUpdate['img'] = $result['secure_url'];
                $dataToUpdate['image_url'] = null;
            }
            elseif ($request->filled('image_url') && $request->input('image_url') !== $coffeemenu->image_url) {
                $result = $cloudinary->uploadApi()->upload(
                    $request->input('image_url'),
                    ['folder' => 'coffee-menu']
                );
                $dataToUpdate['img'] = $result['secure_url'];
                $dataToUpdate['image_url'] = null;
            }
        } catch (\Exception $e) {
            // Handle error
        }

        $coffeemenu->update($dataToUpdate);

        return redirect()->route('coffee-menu.index')->with('message', 'Coffee updated successfully!');
    }

    public function destroy(CoffeeMenu $coffeemenu)
    {
        $coffeemenu->delete();
        return redirect()->route('coffee-menu.index')->with('message', 'Coffee deleted successfully!');
    }
}
