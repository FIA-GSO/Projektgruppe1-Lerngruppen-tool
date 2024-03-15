<?php
declare(strict_types=1);

namespace App\Http\Services;

use App\Models\UserGroup;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

use App\Models\Termin;

class TerminService
{
    public function createTermin(array $payload): mixed
    {
        $termin = Termin::create([
            'group_id' => $payload['groupid'],
            'termin' => $payload['termin'],
            'thema' => $payload['thema'],
            'duration' => $payload['duration'],
            'street' => $payload['street'],
            'postcode' => $payload['postcode'],
            'location' => $payload['location'],
        ]);

        if (!$termin) {
            return ResponseAlias::HTTP_BAD_REQUEST;
        }

        return ResponseAlias::HTTP_OK;
    }

    public function editTermin(array $payload, int $terminId, int $userId): int
    {
        if (!UserGroup::where('user_id', $userId)->pluck('admin')->first()) {
            return ResponseAlias::HTTP_UNAUTHORIZED;
        }

        $filteredData = array_filter([
            'termin' => $payload['termin'],
            'thema' => $payload['thema'],
            'duration' => $payload['duration'],
            'street' => $payload['street'],
            'postcode' => $payload['postcode'],
            'location' => $payload['location'],
        ]);

        if (!Termin::where('id', $terminId)->get()->first()->update($filteredData)) {
            return ResponseAlias::HTTP_BAD_REQUEST;
        }

        return ResponseAlias::HTTP_OK;


    }

}
