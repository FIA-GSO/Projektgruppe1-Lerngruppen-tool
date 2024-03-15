<?php
declare(strict_types=1);

namespace App\Http\Controllers\Group;

use App\Http\Services\GroupService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

readonly class GetGroupOwnership
{
    public function __construct(private GroupService $groupService)
    {
    }

    public function getOwnership(Request $request): Response
    {

        $bearerToken = $request->bearerToken();
        $groupId = (int)$request->route('id');
        if (!$bearerToken && $groupId) {
            return new Response('unauthorized', ResponseAlias::HTTP_UNAUTHORIZED);
        }

        return new Response('', $this->groupService->checkGroupOwnership($groupId, $bearerToken));

    }
}
