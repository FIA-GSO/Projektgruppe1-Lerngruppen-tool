<?php
declare(strict_types=1);

namespace App\Http\Controllers\Group;

use App\Http\Services\GroupService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class AddMemberToGroupController
{

    public function __construct(private readonly GroupService $groupService)
    {
    }

    public function add(Request $request): Response
    {
        try {
            $request->validate([
                'email' => [
                    'required',
                    function ($attribute, $value, $fail) {
                        if (!str_contains($value, '@gso.schule.koeln')) {
                            $throwable = $fail('The email must end with @gso.schule.koeln');
                        }
                    },
                ],
                'groupid' => ['integer', 'required']
            ]);
        } catch (\Throwable $throwable) {
            return new Response($throwable, ResponseAlias::HTTP_BAD_REQUEST);
        }

        $admin = User::where('token', $request->bearerToken())->get()->pluck('id')->first();

        if (!$admin) {
            return new Response('unauthorized', ResponseAlias::HTTP_UNAUTHORIZED);
        }


        return new Response('', $this->groupService->addGroupMember($request->all()));

    }
}
