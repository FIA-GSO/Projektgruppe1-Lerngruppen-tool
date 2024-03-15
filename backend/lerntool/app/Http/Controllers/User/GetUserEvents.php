<?php
declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Http\Services\GroupService;
use App\Http\Services\UserService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class GetUserEvents
{
    public function __construct(private UserService $userService)
    {
    }

    public function getAllUserEvents(Request $request): JsonResponse|Response
    {
        $bearerToken = $request->bearerToken();
        $user = User::where('token', $bearerToken)->pluck('id')->first();
        if (!$user) {
            return new Response('Unauthenticated User', ResponseAlias::HTTP_UNAUTHORIZED);
        }
        $groups = $this->userService->getAllUserEvents($user);

        if (array_key_exists('status', $groups)){
            return new Response('', ResponseAlias::HTTP_BAD_REQUEST);
        }

        return new JsonResponse($groups, ResponseAlias::HTTP_CREATED);

    }
}
