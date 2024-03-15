<?php

namespace App\Http\Controllers\Login;

use App\Http\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

readonly class LoginController
{
    public function __construct(private  UserService $userService)
    {
    }

    public function login(Request $request): JsonResponse|Response
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
                'password' => ['string', 'required']
            ]);
        } catch (\Throwable $throwable) {
            return new Response($throwable, ResponseAlias::HTTP_BAD_REQUEST);
        }

        $userToken = $this->userService->login($request->getPayload());

        if (!$userToken){
            return new Response('User not found', ResponseAlias::HTTP_BAD_REQUEST);
        }

        return new JsonResponse(['userToken' => Str::random(6)], ResponseAlias::HTTP_CREATED);

    }
}
