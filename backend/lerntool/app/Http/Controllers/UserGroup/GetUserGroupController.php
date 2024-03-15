<?php
declare(strict_types=1);

namespace App\Http\Controllers\UserGroup;

use App\Http\Services\GroupService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

readonly class GetUserGroupController
{

    public function __construct(private GroupService $groupService)
    {
    }

    public function getUserGroups(Request $request): JsonResponse|Response
    {
        $bearerToken = $request->bearerToken();
        $user = User::where('token', $bearerToken)->pluck('id')->first();
        if (!$user) {
            return new Response('Unauthenticated User', ResponseAlias::HTTP_UNAUTHORIZED);
        }
        $groups = $this->groupService->getUserGroups($user);


        return new JsonResponse($groups, ResponseAlias::HTTP_CREATED);

    }

}
