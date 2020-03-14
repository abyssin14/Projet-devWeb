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