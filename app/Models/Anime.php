<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['anilist_id', 'title', 'year', 'cover_url', 'banner_url', 'description', 'episodes', 'status'])]
class Anime extends Model
{
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
                    ->withPivot('rating', 'status', 'episodes_watched')
                    ->withTimestamps();
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
