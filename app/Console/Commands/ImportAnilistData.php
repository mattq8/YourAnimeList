<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use App\Models\Anime;
use App\Models\Genre;
use Illuminate\Support\Facades\Http;

#[Signature('anilist:import')]
#[Description('Import all AniList\'s animes to database')]
class ImportAnilistData extends Command
{
    /**
     * Execute the console command.
     */

    private const API_URL = 'https://graphql.anilist.co';

    private const QUERY = <<<'GRAPHQL'
        query ($page: Int, $perPage: Int, $year: Int) {
            Page(page: $page, perPage: $perPage) {
                pageInfo {
                    hasNextPage
                }
                media(type: ANIME, sort: ID, seasonYear: $year) {
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
        $startYear = 1960;
        $currentYear = (int) now()->year + 1;

        for ($year = $startYear; $year <= $currentYear; $year++) {
            $this->info("Anno {$year}...");
            $this->importYear($year);
        }

        $this->info('Import completato.');
        return self::SUCCESS;
    }

    private function importYear(int $year): void
    {
        $page = 1;
        $perPage = 50;
        $hasNextPage = true;

        while ($hasNextPage) {
            $response = Http::retry(3, 2000)->post(self::API_URL, [
                'query' => self::QUERY,
                'variables' => ['page' => $page, 'perPage' => $perPage, 'year' => $year],
            ]);

            if ($response->failed()) {
                $this->error("Richiesta fallita anno {$year}, pagina {$page}: " . $response->body());
                sleep(60);
                continue;
            }

            $data = $response->json('data.Page');
            $mediaList = $data['media'] ?? [];

            foreach ($mediaList as $media) {
                $this->storeAnime($media);
            }

            $hasNextPage = $data['pageInfo']['hasNextPage'] ?? false;
            $page++;

            sleep(2);
        }
    }

    private function storeAnime(array $media): void
    {
        $anime = Anime::updateOrCreate(
            ['anilist_id' => $media['id']],
            [
                'title' => $media['title']['english'] ?? $media['title']['romaji'] ?? 'Untitled',
                'year' => $media['startDate']['year'] ?? null,
                'cover_url' => $media['coverImage']['extraLarge'] ?? null,
                'banner_url' => $media['bannerImage'] ?? null,
                'description' => $media['description'] ?? null,
                'episodes' => $this->resolveEpisodes($media),
                'status' => $media['status'],
            ]
        );

        $genreIds = collect($media['genres'] ?? [])
            ->map(fn(string $name) => Genre::firstOrCreate(['name' => $name])->id)
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
