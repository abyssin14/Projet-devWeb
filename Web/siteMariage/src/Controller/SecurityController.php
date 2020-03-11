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
use Symfony\Component\Security\Core\Security;

class SecurityController extends AbstractController
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    
    public function login(AuthenticationUtils $authenticationUtils){
        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();
        return $this->render('Security/login.html.twig', [
            'user' => $lastUsername,
            'error' => $error,
        ]);
    }



}