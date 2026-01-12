<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WitnessController;
use App\Http\Controllers\FilehandlerController;
use App\Http\Controllers\BatchController;
use Inertia\Inertia;

// Public routes
Route::get('/partner_info', [PartnerController::class, 'info']);

// Authentication routes
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register']);

Route::middleware(['auth'])->group(function () {
    
    // Dashboard/Home
    Route::get('/', [HomeController::class, 'index'])->name('home.index');
    Route::get('/home', [HomeController::class, 'index']);
    Route::get('/make', [HomeController::class, 'create'])->name('home.create');
    Route::get('/make/claimants/{claimId}', [HomeController::class, 'makeClaimants'])->name('make.claimants');
    Route::post('/addclaim', [HomeController::class, 'addclaim'])->name('home.addclaim');
    Route::post('/updateclaim', [HomeController::class, 'updateclaim'])->name('home.updateclaim');
    Route::get('/delete_client/{clientid}', [HomeController::class, 'deleteClient'])->name('home.delete');
    Route::get('/reminder', [HomeController::class, 'reminder'])->name('reminder');

    // Notes
    Route::get('/add_note', [NoteController::class, 'index'])->name('notes.create');
    Route::post('/add_note', [NoteController::class, 'store'])->name('notes.store');
    Route::get('/show_note', [NoteController::class, 'show'])->name('notes.index');
    Route::get('/view_note/{noteid}', [NoteController::class, 'view'])->name('notes.view');
    Route::post('/update_note', [NoteController::class, 'update'])->name('notes.update');
    Route::get('/delete_note', [NoteController::class, 'destroy'])->name('notes.delete');

    // Witnesses
    Route::get('/add_witness', [WitnessController::class, 'add'])->name('witnesses.create');
    Route::post('/save_witness', [WitnessController::class, 'store'])->name('witnesses.store');
    Route::get('/show_witness', [WitnessController::class, 'show'])->name('witnesses.index');
    Route::get('/edit_witness/{wid}', [WitnessController::class, 'edit'])->name('witnesses.edit');
    Route::post('/update_witness', [WitnessController::class, 'update'])->name('witnesses.update');
    Route::get('/delete_witness', [WitnessController::class, 'destroy'])->name('witnesses.delete');

    // Search & Reports
    Route::get('/reports', [SearchController::class, 'reportIndex'])->name('reports.index');
    Route::get('/search', [SearchController::class, 'index'])->name('search.index');
    Route::get('/export', [SearchController::class, 'export'])->name('export.index');

    // Partners
    Route::get('/partners/all', [PartnerController::class, 'getPartners'])->name('partner.all');
    Route::get('/partners', [PartnerController::class, 'index'])->name('partner.index');
    Route::get('/partner/{id}/edit', [PartnerController::class, 'update'])->name('partner.update');
    Route::get('/partner-name/{name}/edit', [PartnerController::class, 'update'])->name('partner.update.name');
    Route::post('/partner/{id}/edit', [PartnerController::class, 'save'])->name('partner.post.update');
    Route::get('/add-partners/{partnerType}', [PartnerController::class, 'addPartner'])->name('partner.add');
    Route::get('/partners/{partnerType}', [PartnerController::class, 'getPartners'])->name('partner.list');
    Route::post('/add-partners', [PartnerController::class, 'create'])->name('partner.create');

    // File Handlers
    Route::get('/filehandlers/{solicitor_id}', [FilehandlerController::class, 'index'])->name('filehandlers.list');
    Route::get('/add_filehandlers/{solicitor_id}', [FilehandlerController::class, 'add'])->name('filehandlers.add');
    Route::post('/save_filehandlers', [FilehandlerController::class, 'save'])->name('filehandlers.save');
    Route::get('/edit_filehandlers/{id}', [FilehandlerController::class, 'edit'])->name('filehandlers.edit');
    Route::post('/update_filehandlers', [FilehandlerController::class, 'update'])->name('filehandlers.update');
    Route::get('/list_filehandlers/{sid}', [FilehandlerController::class, 'list'])->name('filehandlers.lsit');
    Route::get('/detail_filehandlers/{fid}', [FilehandlerController::class, 'detail'])->name('filehandlers.detail');

    // Users
    Route::get('/users', [UserController::class, 'index'])->name('user.index');
    Route::get('/add-user', [UserController::class, 'addUser'])->name('user.add');
    Route::post('/add-user', [UserController::class, 'add'])->name('user.add.post');
    Route::get('/user/{id}/edit', [UserController::class, 'update'])->name('user.update');
    Route::post('/user/{id}/edit', [UserController::class, 'save'])->name('user.post.update');
    Route::get('/user/deluser/{id}', [UserController::class, 'deluser'])->name('user.deluser');

    // Payments
    Route::get('/add_payment', [PaymentController::class, 'add'])->name('payment.add');
    Route::get('/add_payout', [PaymentController::class, 'addPayout'])->name('payout.add');
    Route::get('/update_payment/{id}', [PaymentController::class, 'update'])->name('payment.update');
    Route::post('/store_update_payment', [PaymentController::class, 'updateStore'])->name('payment.update.store');
    Route::get('/update_payout/{id}', [PaymentController::class, 'update'])->name('payout.update');
    Route::post('/store_update_payout', [PaymentController::class, 'updateStore'])->name('payout.update.store');
    Route::post('/insert_payment', [PaymentController::class, 'store'])->name('payment.insert');
    Route::post('/insert_payout', [PaymentController::class, 'store'])->name('payout.insert');
    Route::get('/delete_invoice', [PaymentController::class, 'destroy'])->name('payment.delete');
    Route::get('/invoice_list', [PaymentController::class, 'invoiceList'])->name('payments.invoice_list');
    Route::get('/payout_list', [PaymentController::class, 'payoutList'])->name('payments.payout_list');
    Route::get('/invoice_view/{invoiceid}', [PaymentController::class, 'view'])->name('payments.invoice_view');

    // Batches
    Route::resource('batches', BatchController::class);
    Route::get('/batches/del/{pid}', [BatchController::class, 'delrow'])->name('batches.delrow');
    Route::get('/batches/markpaid/{bid}', [BatchController::class, 'markpaid'])->name('batches.markpaid');
    Route::get('/batches/askdate/{bid}', [BatchController::class, 'askdate'])->name('batches.askdate');
});
