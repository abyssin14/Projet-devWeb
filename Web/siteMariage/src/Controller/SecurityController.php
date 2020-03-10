<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 10-03-20
 * Time: 10:17
 */

namespace App\Controller;

use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SecurityController extends AbstractController
{

    public function login(AuthenticationUtils $authenticationUtils){
        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();
        return $this->render('Security/login.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error
        ]);
    }
}