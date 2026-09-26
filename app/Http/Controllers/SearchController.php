<?php

namespace App\Http\Controllers;

use App\Models\Anime;
use App\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'sometimes|min:0|string',
            'genres' => 'sometimes|array',
            'genres.*' => 'string|exists:genres,name',
            'yearTo' => 'sometimes|nullable|integer|digits:4|min:1960|max:' . date('Y'),
            'yearFrom' => 'sometimes|nullable|integer|digits:4|min:1960|max:' . date('Y'),
        ]);

        $query = Anime::with('genres');

        if (!empty($validated['search'])) {
            $query->where('title', 'like', "{$validated['search']}%");
        }

        if (!empty($validated['genres'])) {
            $query->whereHas('genres', function ($q) use ($validated) {
                $q->whereIn('name', $validated['genres']);
            });
        }

        if (!empty($validated['yearFrom'])) {
            $query->where('year', '>=', $validated['yearFrom']);
        }

        if (!empty($validated['yearTo'])) {
            $query->where('year', '<=', $validated['yearTo']);
        }

        return Inertia::render('Search/Search', [
            'animes' => Inertia::scroll(fn() => $query->paginate()->withQueryString()),
            'genres' => Genre::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
