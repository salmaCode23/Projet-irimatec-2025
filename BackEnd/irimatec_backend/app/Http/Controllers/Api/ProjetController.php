<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Projet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjetController extends Controller
{
    // GET /api/contents
    public function index()
    {
        return response()->json(Projet::latest()->get());
    }

    // POST /api/contents
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string|max:255',
            'status' => 'required|in:active,completed',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('contents', 'public');
        }

        $content = Projet::create($validated);

        return response()->json($content, 201);
    }

    // GET /api/contents/{id}
    public function show($id)
    {
        return response()->json(Projet::findOrFail($id));
    }

    // PUT /api/contents/{id}
    public function update(Request $request, $id)
    {
        $content = Projet::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'location' => 'nullable|string|max:255',
            'status' => 'required|in:active,completed',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            if ($content->image) {
                Storage::disk('public')->delete($content->image);
            }
            $validated['image'] = $request->file('image')->store('contents', 'public');
        }

        $content->update($validated);

        return response()->json($content);
    }

    // DELETE /api/contents/{id}
    public function destroy($id)
    {
        $content = Projet::findOrFail($id);
        
        if ($content->image) {
            Storage::disk('public')->delete($content->image);
        }

        $content->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
