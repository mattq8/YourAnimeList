<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['name'])]
class Genre extends Model
{
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class);
    }
}
