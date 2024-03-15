<?php
declare(strict_types=1);

namespace App\Http\Controllers\Group;

use App\Http\Services\GroupService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class DeleteGroupController
{

    public function __construct(private GroupService $groupService)
    {
    }

    public function delete(Request $request): Response
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


        $response = $this->groupService->delete((int)$request->get('groupid'));


        return new Response($response['text'], $response['status']);

    }
}
