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
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

class CadeauController extends AbstractController
{
    private $repository;
    private $security;
    public function __construct(CadeauRepository $repository, Security $security)
    {
        $this->repository = $repository;
        $this->security = $security;
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




       return $this->render('pages/Cadeaux/index.html.twig',
            ['current_menu' => 'cadeaux',
                'cadeaux' => $listeCadeaux,
                'user' => $this->security->getUser()->getUsername()
            ]);

        /*$response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($listeCadeaux));

        return $response;*/
    }

    public function show(Cadeau $cadeau, string $slug){
        if($cadeau->getSlug() !== $slug){
            return $this->redirectToRoute('cadeaux.info',
                ['id' => $cadeau->getId(), 'slug' => $cadeau->getSlug()],301);
        }
         return $this->render('pages/Cadeaux/infos.html.twig',
            ['cadeau' => $cadeau, 'current_menu' => 'cadeaux',  'user' => $this->security->getUser()->getUsername()]);
    }

    public function api( SerializerInterface $serializer){

        $listeCadeaux = $this->repository->findAll();
        $jsonContent = $serializer->serialize($listeCadeaux, 'json');
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent($jsonContent);

        return $response;
    }

}