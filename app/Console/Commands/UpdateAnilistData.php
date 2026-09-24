<?php

namespace App\Console\Commands;

use App\Models\Anime;
use App\Models\Genre;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

#[Signature('anilist:update')]
#[Description('Update all RELEASING and NOT_YET_RELEASED animes in the database')]
class UpdateAnilistData extends Command
{
    /**
     * Execute the console command.
     */

    private const API_URL = 'https://graphql.anilist.co';

    private const QUERY = <<<'GRAPHQL'
        query ($ids: [Int], $page: Int, $perPage: Int) {
            Page(page: $page, perPage: $perPage) {
                pageInfo {
                    hasNextPage
                }
                media(id_in: $ids, type: ANIME) {
                    id
                    title {
                        romaji
                        english
                    }
                    startDate {
                        year
                    }
                    coverImage {
                        extraLarge
                    }
                    bannerImage
                    description(asHtml: false)
                    episodes
                    status
                    genres
                    nextAiringEpisode {
                        episode
                    }
                }
            }
        }
    GRAPHQL;

    public function handle()
    {
        $anilistIds = Anime::whereIn('status', ['RELEASING', 'NOT_YET_RELEASED'])
            ->pluck('anilist_id')
            ->all();

        if (empty($anilistIds)) {
            $this->info('Nessun anime da aggiornare.');
            return self::SUCCESS;
        }

        $this->info(count($anilistIds) . ' anime da controllare.');

        foreach (array_chunk($anilistIds, 50) as $chunk) {
            $response = Http::retry(3, 2000)->post(self::API_URL, [
                'query' => self::QUERY,
                'variables' => ['ids' => $chunk, 'page' => 1, 'perPage' => 50],
            ]);

            if ($response->failed()) {
                $this->error('Richiesta fallita: ' . $response->body());
                sleep(60);
                continue;
            }

            $mediaList = $response->json('data.Page.media') ?? [];

            foreach ($mediaList as $media) {
                $this->updateAnime($media);
            }

            sleep(2);
        }

        $this->info('Update completato.');
        return self::SUCCESS;
    }

    private function updateAnime(array $media): void
    {
        $anime = Anime::where('anilist_id', $media['id'])->first();

        if (!$anime) {
            return;
        }

        $anime->update([
            'title' => $media['title']['english'] ?? $media['title']['romaji'] ?? $anime->title,
            'year' => $media['startDate']['year'] ?? $anime->year,
            'cover_url' => $media['coverImage']['extraLarge'] ?? $anime->cover_url,
            'banner_url' => $media['bannerImage'] ?? $anime->banner_url,
            'description' => $media['description'] ?? $anime->description,
            'episodes' => $this->resolveEpisodes($media),
            'status' => $media['status'],
        ]);

        $genreIds = collect($media['genres'] ?? [])
            ->map(fn (string $name) => Genre::firstOrCreate(['name' => $name])->id)
            ->all();

        $anime->genres()->sync($genreIds);
    }

    private function resolveEpisodes(array $media): ?int
    {
        if ($media['status'] === 'RELEASING' && !empty($media['nextAiringEpisode']['episode'])) {
            return $media['nextAiringEpisode']['episode'] - 1;
        }

        return $media['episodes'] ?? null;
    }
}
