<?php
declare(strict_types=1);

namespace App\Http\Services;

use App\Models\Termin;
use App\Models\User;
use App\Models\UserGroup;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\InputBag;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;


class UserService
{

    public function login(InputBag $request): ?string
    {
        $check = User::where('email', $request['email'])->first();

        if (!$check && !password_verify($request['password'], $check->password)) {
            return null;
        }

        $token = Str::random(8);
        $check->token = $token;

        return $token;
    }

    public function register(InputBag $bag): array
    {
        $email = $bag->get('email');
        $check = User::where('email', $email)->pluck('email')->first();
        if ($email === $check) {
            return [
                'statusCode' => ResponseAlias::HTTP_CONFLICT
            ];
        }

        if (!User::create([
            'firstname' => $bag->get('firstname'),
            'lastname' => $bag->get('lastname'),
            'grade' => $bag->get('grade'),
            'year' => $bag->get('year'),
            'email' => $bag->get('email'),
            'password' => $bag->get('password'),

        ])) {
            return [
                'statusCode' => ResponseAlias::HTTP_BAD_REQUEST
            ];
        }

        return [
            'statusCode' => ResponseAlias::HTTP_CREATED
        ];
    }

    public function getAllUserEvents(int $userId): array
    {
        $userGroups = UserGroup::where('user_id', $userId)->get()->all();
        $termine = [];

        foreach ($userGroups as $key => $value) {

            $termine = Termin::where('group_id', $value->group_id)->get()->all();

        }

        if (!$termine) {
            return ['status' => ResponseAlias::HTTP_BAD_REQUEST];

        }

        return $termine;

    }

}
