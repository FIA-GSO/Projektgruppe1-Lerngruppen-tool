<?php
declare(strict_types=1);

namespace App\Http\Controllers\Group;

use App\Http\Services\GroupService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class JoinGroupController
{

    public function __construct(private readonly GroupService $groupService)
    {
    }

    public function joinGroup(Request $request): Response
    {
        try {
            $request->validate([
                'groupid' => ['required', 'integer'],
            ]);
        } catch (\Throwable $throwable) {
            return new Response($throwable, ResponseAlias::HTTP_BAD_REQUEST);
        }

        $joinerId = User::where('token', $request->bearerToken())->get()->pluck('id')->first();

        if (!$joinerId) {
            return new Response('unauthorized', ResponseAlias::HTTP_UNAUTHORIZED);
        }


        return new Response('', $this->groupService->joinGroup($request->all(), $joinerId));

    }
}
