<?php 
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app'); // This serves your main Vue app
});

// Define routes for specific Vue components
Route::get('/dashboardTutors', function () {
    return view('app'); // Serves the same main Vue app
});

Route::get('/dashboard', function () {
    return view('app'); // Serves the same main Vue app
});

Route::get('/StudentProfile', function () {
    return view('app'); // Serves the same main Vue app
});

Route::get('/TutorProfile', function () {
    return view('app'); // Serves the same main Vue app
});