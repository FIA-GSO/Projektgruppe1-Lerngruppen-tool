<?php

use App\Http\Controllers\Group\AddMemberToGroupController;
use App\Http\Controllers\Group\ChangeGroupOwnerController;
use App\Http\Controllers\Group\CreateGroupController;
use App\Http\Controllers\Group\DeleteGroupController;
use App\Http\Controllers\Group\GetGroupByIdController;
use App\Http\Controllers\Group\GetGroupOwnership;
use App\Http\Controllers\Group\GroupEditController;
use App\Http\Controllers\Group\JoinGroupController;
use App\Http\Controllers\Group\LeaveGroupController;
use App\Http\Controllers\Group\RemoveGroupMemberController;
use App\Http\Controllers\Login\LoginController;
use App\Http\Controllers\Register\RegisterController;
use App\Http\Controllers\School\GetAllGroupsController;
use App\Http\Controllers\Termin\CreateNewTerminController;
use App\Http\Controllers\Termin\TerminEditController;
use App\Http\Controllers\User\GetUserEvents;
use App\Http\Controllers\UserGroup\GetUserGroupController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/login',[LoginController::class, 'login'])->name('login');
Route::post('/register',[RegisterController::class, 'register'])->name('register');
Route::post('/creategroup',[CreateGroupController::class, 'createGroup'])->name('createGroup');

Route::get('/groupsofuser', [GetUserGroupController::class, 'getUserGroups'])->name('getUserGroups');
Route::get('/getallgroups', [GetAllGroupsController::class, 'getAllSchoolGroups'])->name('getAllSchoolGroups');
Route::delete('/deletegroup', [DeleteGroupController::class, 'delete'])->name('groupDelete');
Route::patch('/changeowner', [ChangeGroupOwnerController::class, 'changeGroupOwner'])->name('changeGroupOwnership');
Route::post('/joingroup', [JoinGroupController::class, 'joinGroup'])->name('joinGroup');
Route::get('/group', [GetGroupByIdController::class, 'getById'])->name('getGroupById');
route::post('/newevent', [CreateNewTerminController::class, 'create'])->name('createNewEvent');
route::post('/manageevent/{id}', [TerminEditController::class, 'edit'])->name('editEvent');
route::post('/editgroup/{id}', [GroupEditController::class, 'edit'])->name('editGroup');
route::delete('/leavegroup', [LeaveGroupController::class, 'leave'])->name('leaveGroup');
route::delete('/removeMember', [RemoveGroupMemberController::class, 'remove'])->name('removeMember');
route::post('/addmember', [AddMemberToGroupController::class, 'add'])->name('addGroupMember');
route::get('/verifyownership/{id}', [GetGroupOwnership::class, 'getOwnership'])->name('getGroupOwnership');
route::get('/getuserevents', [GetUserEvents::class, 'getAllUserEvents'])->name('getAllUserEvents');
