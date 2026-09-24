<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        $watchingAnimes = $user->animes()
            ->wherePivot('status', 'WATCHING')
            ->get();

        return Inertia::render('Home/Home', [
            'watchingAnimes' => $watchingAnimes
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
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'episodes_watched' => ['required', 'integer', 'min:0'],
            'status' => ['sometimes', 'string', 'in:WATCHING,COMPLETED,DROPPED,PLANNED'],
        ]);

        $dataToUpdate = [
            'episodes_watched' => $validated['episodes_watched'],
        ];

        if (isset($validated['status'])) {
            $dataToUpdate['status'] = $validated['status'];
        }

        $user->animes()->updateExistingPivot($id, $dataToUpdate);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
