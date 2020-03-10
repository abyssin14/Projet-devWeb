<?php

namespace App\Controller;

use App\Repository\UtilisateurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class HomeController extends AbstractController
{

	
	public function index(UtilisateurRepository $repository): Response{
		return $this->render('pages/home.html.twig');
	}
}