<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 08-03-20
 * Time: 12:13
 */

namespace App\Controller\Admin;

use App\Entity\Cadeau;
use App\Form\CadeauType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\CadeauRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;


class AdminCadeauController extends AbstractController
{
    /**
     * @var CadeauRepository
     */
    private $repository;
    /**
     * @var ObjectManager
     */
    private $em;
    private $security;
    public function __construct(CadeauRepository $repository, EntityManagerInterface $em, Security $security)
    {
        $this->repository = $repository;
        $this->em = $em;
        $this->security = $security;
    }

    /**
     * @return Response
     */
    public function index(){
        $cadeaux = $this->repository->findAll();
        return $this->render('Admin/Cadeaux/index.html.twig',
            [
                'cadeaux' => $cadeaux,
                'current_menu' => 'admin',
                'user' => $this->security->getUser()->getUsername()
            ] );
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
     */
    public function nouveau(Request $request){
        $cadeau = new Cadeau();
        $form = $this->createForm(CadeauType::class, $cadeau);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $this->em->persist($cadeau);
            $this->em->flush();
            return $this->redirectToRoute('admin.cadeau.index');
        }
        return  $this->render('Admin/Cadeaux/new.html.twig',
            [
                'cadeau' => $cadeau,
                'form' => $form->createView(),
                'current_menu' => 'admin',
                'user' => $this->security->getUser()->getUsername()
            ]);
    }
    /**
     * @param Cadeau $cadeau
     * @param Request $request
     * @return Response
     */
    public function edit(Cadeau $cadeau, Request $request){
        $form = $this->createForm(CadeauType::class, $cadeau);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $this->em->flush();
            return $this->redirectToRoute('admin.cadeau.index');
        }

        return  $this->render('Admin/Cadeaux/edit.html.twig',
            ['cadeau' => $cadeau,
                'form' => $form->createView(),
                'current_menu' => 'admin',
                'user' => $this->security->getUser()->getUsername()
            ]);
    }

    public function delete(Cadeau $cadeau, Request $request){
        if($this->isCsrfTokenValid('delete' . $cadeau->getId(), $request->get('_token'))){
            $this->em->remove($cadeau);
            $this->em->flush();
        }
        return $this->redirectToRoute('admin.cadeau.index');
    }


}