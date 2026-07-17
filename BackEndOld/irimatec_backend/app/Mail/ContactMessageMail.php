<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    // On reçoit les données (nom, email, message)
    public function __construct($data)
    {
        $this->data = $data;
    }

    // On construit l'email
   public function build()
{
    return $this->from(config('mail.from.address'), config('mail.from.name')) // ton adresse définie dans .env
                ->replyTo($this->data['email'], $this->data['name']) // mail du client
                ->subject('Message de contact depuis le site IRIMATEC')
                ->view('welcome')
                ->with('data', $this->data);
}

}
