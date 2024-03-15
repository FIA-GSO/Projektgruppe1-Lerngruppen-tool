<?php

namespace App\Http\Controllers\Register;

use App\Http\Services\UserService;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

readonly class RegisterController
{
    public function __construct(private readonly UserService $userService)
    {
    }

    public function register(Request $request): Response
    {
        try {
            $request->validate([
                'email' => [
                    'required',
                    function ($attribute, $value, $fail) {
                        if (!str_contains($value, '@gso.schule.koeln')) {
                            $throwable = $fail('The email must end with @gso.schule.koeln');
                        }
                    },
                ],
                'password' => ['string', 'required'],
                'firstname' => ['string', 'required'],
                'lastname' => ['string', 'required'],
                'grade' => ['string', 'required'],
                'year' => ['string', 'required'],
            ]);
        } catch (\Throwable $throwable) {
            return new Response($throwable, ResponseAlias::HTTP_BAD_REQUEST);
        }
        $payload = $request->getPayload();
        $user = $this->userService->register($payload);


        return new Response('ok', ResponseAlias::HTTP_CREATED);

    }
}
