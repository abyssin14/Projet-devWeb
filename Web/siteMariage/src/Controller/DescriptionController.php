<?php

namespace App\Controller;

use App\Repository\UtilisateurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Utilisateur;


class DescriptionController extends AbstractController
{

    private $repository;

    public function __construct(UtilisateurRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(): Response{
        /*$utilisateurs = $this->repository->find();
        dump($utilisateurs);*/
        /*
        $testUser = new utilisateur();
        $testUser->setNom('Pestiaux');
        $testUser->setPrenom('Tristan');
        $em = $this->getDoctrine()->getManager();
        $em->persist($testUser);
        $em->flush();
        */
        return $this->render('pages/Description/index.html.twig',
                                ['current_menu' => 'description']);
    }

    public function show(Utilisateur $utilisateur, string $slug): Response{
        if($utilisateur->getSlug() !== $slug){
            return $this->redirectToRoute('description.slug',
                                    ['id' => $utilisateur->getId(), 'slug' => $utilisateur->getSlug()],301);
        }
        return $this->render('pages/Description/slug.html.twig',
            ['utilisateur' => $utilisateur, 'current_menu' => 'test']);
    }
}