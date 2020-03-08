<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 08-03-20
 * Time: 12:13
 */

namespace App\Controller;
use App\Repository\CadeauRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Cadeau;

class CadeauController extends AbstractController
{
    private $repository;

    public function __construct(CadeauRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(){


        /*$cadeau = new Cadeau();
        $cadeau->setNom('Lampe');
        $cadeau->setPrix('45.99');
        $cadeau->setDescription('Lampe de la marque toto');
        $em = $this->getDoctrine()->getManager();
        $em->persist($cadeau);
        $em->flush();
        $listeCadeaux = $this->repository->findAll();
        dump($listeCadeaux);*/

        $listeCadeaux = $this->repository->findAll();


        return $this->render('pages/Cadeaux/index.html.twig',
            ['current_menu' => 'cadeaux',
                'cadeaux' => $listeCadeaux]);
    }
}