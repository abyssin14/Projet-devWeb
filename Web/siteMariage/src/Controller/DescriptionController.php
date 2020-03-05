<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class DescriptionController extends AbstractController
{


    public function index(): Response{
        return $this->render('pages/description.html.twig', ['current_menu' => 'description']);
    }
}