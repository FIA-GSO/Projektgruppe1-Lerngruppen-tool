<?php
declare(strict_types=1);

namespace App\Http\Controllers\School;

use App\Http\Services\GroupService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

readonly class GetAllGroupsController
{

    public function __construct(private GroupService $groupService)
    {
    }

    public function getAllSchoolGroups(Request $request): JsonResponse|Response
    {
        try {
            $request->validate([
                'name' => ['required', 'string'],
                'groupdatestart' => ['required', 'date'],
                'groupdateend' => ['required', 'date'],
                'maxmembers' => ['required', 'int'],
                'description' => ['required', 'string'],
                'topic' => ['required', 'string'],
                'thisyearonly' => ['required', 'boolean']
            ]);
        } catch (\Throwable $throwable) {
            return new Response($throwable, ResponseAlias::HTTP_BAD_REQUEST);
        }
        $bearerToken = $request->bearerToken();

        $group = $this->groupService->register($request->all(), $bearerToken);

        if ($group === 400) {
            return new Response('bad request', $group);
        }

        return new JsonResponse(['groupid' => (int)$group], ResponseAlias::HTTP_CREATED);

    }

}
