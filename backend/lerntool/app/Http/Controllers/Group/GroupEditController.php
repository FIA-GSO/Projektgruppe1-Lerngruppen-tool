<?php
declare(strict_types=1);

namespace App\Http\Controllers\Group;

use App\Http\Services\GroupService;
use App\Http\Services\TerminService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;


readonly class GroupEditController
{

    public function __construct(private GroupService $groupService)
    {
    }

    public function edit(Request $request): Response
    {

        $bearerToken = $request->bearerToken();
        $userId = User::where('token', $bearerToken)->pluck('id')->first();
        if (!$userId) {
            return new Response('unauthenticated', ResponseAlias::HTTP_UNAUTHORIZED);
        }

        try {
            $request->validate([
                'name' => ['string'],
                'description' => ['string'],
                'topic' => ['string'],
                'groupdatestart' => ['date', 'date_format:Y-m-d H:i:s'],
                'groupdateend' => ['date', 'date_format:Y-m-d H:i:s'],


            ]);
        } catch (\Throwable $throwable) {
            return new Response($throwable, ResponseAlias::HTTP_BAD_REQUEST);
        }

        return new Response('', $this->groupService->editGroup($request->all(), (int)$request->route('id'), $userId));
    }
}
