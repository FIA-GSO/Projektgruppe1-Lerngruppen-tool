<?php
declare(strict_types=1);

namespace App\Http\Controllers\Termin;

use App\Http\Services\TerminService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;


readonly class TerminEditController
{

    public function __construct(private TerminService $terminService)
    {
    }

    public function edit(Request $request): Response
    {

        $bearerToken = $request->bearerToken();
        $userId = User::where('token', $bearerToken)->pluck('id')->first();
        if (!$userId) {
            return new Response('unauthenticated', ResponseAlias::HTTP_UNAUTHORIZED);
        }

        try {
            $request->validate([
                'thema' => ['string'],
                'termin' => ['date', 'date_format:Y-m-d H:i:s'],
                'duration' => ['integer'],
                'location' => ['string'],
                'postcode' => ['string'],
                'street' => ['string'],

            ]);
        } catch (\Throwable $throwable) {
            return new Response($throwable, ResponseAlias::HTTP_BAD_REQUEST);
        }

        return new Response('', $this->terminService->editTermin($request->all(), (int)$request->route('id'), $userId));
    }
}
