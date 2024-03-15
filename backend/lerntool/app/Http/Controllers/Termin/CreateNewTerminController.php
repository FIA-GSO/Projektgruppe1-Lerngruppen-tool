<?php
declare(strict_types=1);

namespace App\Http\Controllers\Termin;

use App\Http\Services\TerminService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;


readonly class CreateNewTerminController
{

    public function __construct(private TerminService $terminService)
    {
    }

    public function create(Request $request): Response
    {

        $bearerToken = $request->bearerToken();

        if (!User::where('token', $bearerToken)->first()) {
            return new Response('unauthenticated', ResponseAlias::HTTP_UNAUTHORIZED);
        }

        try {
            $request->validate([
                'thema' => ['string', 'required'],
                'termin' => ['required', 'date', 'date_format:Y-m-d H:i:s'],
                'duration' => ['required', 'integer'],
                'groupid' => ['required', 'integer'],
                'location' => ['string', 'required'],
                'postcode' => ['string', 'required'],
                'street' => ['string', 'required'],


            ]);
        } catch (\Throwable $throwable) {
            return new Response($throwable, ResponseAlias::HTTP_BAD_REQUEST);
        }

        $termin = $this->terminService->createTermin($request->all());

        return new Response('', $termin);
    }
}
