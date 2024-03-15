<?php
declare(strict_types=1);

namespace App\Http\Controllers\Group;

use App\Http\Services\GroupService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use function Laravel\Prompts\warning;

class GetGroupByIdController
{
    public function __construct(private GroupService $groupService)
    {
    }

    public function getById(Request $request): Response|JsonResponse
    {
        try {
            $request->validate([
                'groupid' => ['integer', 'required'],
            ]);
        } catch (\Throwable $throwable) {
            return new Response($throwable, ResponseAlias::HTTP_BAD_REQUEST);
        }


        $bearerToken = $request->bearerToken();
        if (!$bearerToken) {
            return new Response('unauthorized', ResponseAlias::HTTP_UNAUTHORIZED);
        }


        $response = $this->groupService->getById((int)$request->get('groupid'));

        if (array_key_exists('error', $response)) {
            return new Response('', ResponseAlias::HTTP_BAD_REQUEST);
        }

        return new JsonResponse($response, 200);

    }
}
