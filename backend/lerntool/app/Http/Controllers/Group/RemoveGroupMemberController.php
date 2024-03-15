<?php
declare(strict_types=1);

namespace App\Http\Controllers\Group;

use App\Http\Services\GroupService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class RemoveGroupMemberController
{

    public function __construct(private GroupService $groupService)
    {
    }

    public function remove(Request $request): Response
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
        $adminId = User::where('token', $bearerToken)->pluck('id')->first();

        if (!$adminId) {
            return new Response('unauthenticated', ResponseAlias::HTTP_UNAUTHORIZED);
        }

        return new Response('',
            $this->groupService->removeMember((int)$request->get('userid'), (int)$request->get('groupid'), $adminId));

    }
}
