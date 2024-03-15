<?php
declare(strict_types=1);

namespace App\Http\Controllers\Group;

use App\Http\Services\GroupService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ChangeGroupOwnerController
{

    public function __construct(private GroupService $groupService)
    {
    }

    public function changeGroupOwner(Request $request): Response
    {
        try {
            $request->validate([
                'userid' => ['integer', 'required'],
                'groupid' => ['integer', 'required'],
            ]);
        } catch (\Throwable $throwable) {
            return new Response($throwable, ResponseAlias::HTTP_BAD_REQUEST);
        }


        $bearerToken = $request->bearerToken();
        if (!$bearerToken || !$ownerId = User::where('token', $bearerToken)->get()->pluck('id')->first()) {
            return new Response('unauthorized', ResponseAlias::HTTP_UNAUTHORIZED);
        }


        return new Response('', $this->groupService->changeOwner($request->all(), $ownerId));

    }
}
