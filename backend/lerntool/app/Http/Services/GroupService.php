<?php
declare(strict_types=1);

namespace App\Http\Services;


use App\Models\Group;
use App\Models\Termin;
use App\Models\User;
use App\Models\UserGroup;

use Symfony\Component\HttpFoundation\Response as ResponseAlias;


class GroupService
{


    public function register(array $bag, string $token): int
    {

        $register = Group::create([
            'name' => $bag['name'],
            'groupdatestart' => $bag['groupdatestart'],
            'groupdateend' => $bag['groupdateend'],
            'maxmembers' => $bag['maxmembers'],
            'description' => $bag['description'],
            'topic' => $bag['topic'],
            'thisyearonly' => $bag['thisyearonly'],
        ]);

        $user = User::where('token', $token)->pluck('id')->first();


        if (
            count(
                UserGroup::where('user_id', $user)
                    ->where('admin', true)
                    ->get()) >= 5
        ) {

            return ResponseAlias::HTTP_BAD_REQUEST;
        }


        if (!$register || !UserGroup::create([
                'admin' => true,
                'group_id' => $register->id,
                'user_id' => $user,
            ])) {
            return ResponseAlias::HTTP_BAD_REQUEST;

        }

        return $register->id;
    }

    public function getUserGroups(int $userId): array
    {
        $allGroups = UserGroup::where('user_id', $userId)->get()->all();
        $groupInfo = [];


        foreach ($allGroups as $key => $value) {

            $groupInfo[] = Group::where('id', $value->group_id)->get()->first();
        }

        $response = [];
        foreach ($groupInfo as $key => $values) {
            $response[] = [
                'id' => $values->id,
                'name' => $values->name,
                'description' => $values->description,
                'topic' => $values->topic,
                'membercount' => count(UserGroup::where('id', $values->id)->get()->all()),
                'isOwner' => (bool)UserGroup::where('id', $values->id)->pluck('admin')->first(),
            ];
        }

        return $response;
    }


    public function getSchoolGroups(): array
    {
        $allGroups = Group::get()->all();

        $response = [];
        foreach ($allGroups as $key => $values) {
            $response[] = [
                'id' => $values->id,
                'name' => $values->name,
                'description' => $values->description,
                'topic' => $values->topic,
                'membercount' => count(UserGroup::where('id', $values->id)->get()->all()),
            ];
        }

        return $response;
    }

    public function delete(int $groupId): array
    {
        $deleted = Group::where('id', $groupId)->delete();
        if (!$deleted) {
            return ['status' => 500, 'text' => 'db error record not found'];
        }
        return ['status' => 200, 'text' => 'deleted'];
    }

    public function leaveGroup(int $groupId, int $userId): int
    {
        $toLeave = UserGroup::where('user_id', $userId)
            ->where('group_id', $groupId)
            ->delete();

        if (!$toLeave) {
            return ResponseAlias::HTTP_BAD_REQUEST;
        }

        return ResponseAlias::HTTP_OK;
    }

    public function removeMember(int $userId, int $groupId, int $adminId): int
    {
        $adminCheck = UserGroup::where('group_id', $groupId)->where('user_id', $adminId)->pluck('admin')->first();

        if (!$adminCheck) {
            return ResponseAlias::HTTP_UNAUTHORIZED;
        }

        $toRemove = UserGroup::where('user_id', $userId)
            ->where('group_id', $groupId)
            ->delete();

        if (!$toRemove) {
            return ResponseAlias::HTTP_BAD_REQUEST;
        }

        return ResponseAlias::HTTP_OK;
    }


    public function changeOwner(array $payload, int $ownerId): int
    {
        $toChange = UserGroup::where('user_id', $ownerId)
            ->where('admin', 1)
            ->where('group_id', $payload['groupid'])
            ->get()
            ->first();

        if (!$toChange->id) {
            return ResponseAlias::HTTP_UNAUTHORIZED;
        }

        $changed = $toChange->update(['admin' => 0]);

        UserGroup::where('user_id', $payload['userid'])
            ->where('group_id', $payload['groupid'])
            ->update(['admin' => 1]);

        if (!$changed) {
            return ResponseAlias::HTTP_UNAUTHORIZED;
        }

        return ResponseAlias::HTTP_OK;


    }

    public function joinGroup(array $payload, int $joinerId): int
    {
        $checked = UserGroup::where('user_id', $joinerId)
            ->where('group_id', $payload['groupid'])->get()->first();

        if ($checked) {
            return ResponseAlias::HTTP_BAD_REQUEST;
        }

        UserGroup::create([
            'user_id' => $joinerId,
            'group_id' => $payload['groupid'],
            'admin' => 0
        ]);

        return ResponseAlias::HTTP_OK;

    }

    public function getById(int $groupId): array
    {
        $group = Group::where('id', $groupId)->first();
        $termine = Termin::where('group_id', $groupId)->get();

        $searchedTermine = [];
        foreach ($termine as $termin) {
            $searchedTermine[] = [
                'id' => $termin->id,
                'description' => $termin->thema,
                'date' => $termin->termin,
                'location' => $termin->ort,
                'street' => $termin->strasse,
                'plz' => $termin->plz,
                'duration' => $termin->dauer,

            ];
        }

        $members = [];
        $membersInGroup = UserGroup::where('group_id', $groupId)->get();
        foreach ($membersInGroup as $member) {
            $userInfo = User::where('id', $member->user_id)->first();
            if ($userInfo) {
                $members[] = [
                    'id' => $userInfo->id,
                    'firstname' => $userInfo->firstname,
                    'lastname' => $userInfo->lastname,
                    'admin' => $member->admin
                ];
            }
        }

        if (empty($members)) {
            return ['error' => 'Unauthorized access'];
        }

        return [
            'id' => $groupId,
            'info' => [
                'name' => $group->name,
                'topic' => $group->topic,
                'description' => $group->description,
            ],
            'appointments' => $searchedTermine,
            'members' => $members,
        ];
    }

    public function editGroup(array $payload, int $groupId, int $userId): int
    {
        if (!UserGroup::where('user_id', $userId)->pluck('admin')->first()) {
            return ResponseAlias::HTTP_UNAUTHORIZED;
        }

        $filteredData = array_filter([
            'name' => $payload['name'] ?? '',
            'description' => $payload['description'] ?? '',
            'topic' => $payload['topic'] ?? '',
            'groupdatestart' => $payload['groupdatestart'] ?? '',
            'groupdateend' => $payload['groupdateend'] ?? '',
        ]);

        if (!Group::where('id', $groupId)->get()->first()->update($filteredData)) {
            return ResponseAlias::HTTP_BAD_REQUEST;
        }

        return ResponseAlias::HTTP_OK;
    }


    public function addGroupMember(array $payload): int
    {
        $isRegistered = User::where('email', $payload['email'])->first();

        if (!$isRegistered) {
            return ResponseAlias::HTTP_NOT_FOUND;
        }
        $isAlreadyMember = UserGroup::where('user_id', $isRegistered->id)->first();

        if ($isAlreadyMember->id) {
            return ResponseAlias::HTTP_BAD_REQUEST;

        }

        $created = UserGroup::create([
            'user_id' => $isRegistered->id,
            'group_id' => $payload['groupid'],
            'admin' => 0,
        ]);

        if (!$created) {
            return ResponseAlias::HTTP_BAD_REQUEST;
        }

        return ResponseAlias::HTTP_OK;

    }

    public function checkGroupOwnership(int $groupId, string $bearerToken): int
    {
        $user = User::where('token', $bearerToken)->first();

        if (!$user) {
            return ResponseAlias::HTTP_BAD_REQUEST;
        }
        $ownership = UserGroup::where('group_id', $groupId)->where('user_id', $user->id)->first();

        if (!$ownership) {
            return ResponseAlias::HTTP_UNAUTHORIZED;
        }
        return ResponseAlias::HTTP_OK;

    }


}
