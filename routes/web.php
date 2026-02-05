<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

Route::get('/', [EventController::class, 'index'])->name('home');

Route::get('/events/{eventId}', [EventController::class, 'show'])
    ->whereNumber('eventId')
    ->name('events.show');

Route::get('/events/{eventId}/borderel', [EventController::class, 'borderel'])
    ->whereNumber('eventId')
    ->name('events.borderel');
