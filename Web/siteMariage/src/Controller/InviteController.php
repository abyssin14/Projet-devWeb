<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 11-03-20
 * Time: 16:27
 */

namespace App\Controller;


use App\Entity\Invite;
use App\Repository\InviteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use App\Form\InviteType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;


class InviteController extends AbstractController
{
    /**
     * @var InviteRepository
     */
    private $repository;
    /**
     * @var EntityManagerInterface
     */
    private $em;
    /**
     * @var Security
     */
    private $security;

    public function __construct(InviteRepository $repository, EntityManagerInterface $em, Security $security)
    {
        $this->repository = $repository;
        $this->em = $em;
        $this->security = $security;

    }

    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request){

        $invite = new Invite();
        $form = $this->createForm(InviteType::class, $invite);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $this->em->persist($invite);
            $this->em->flush();
            return $this->redirectToRoute('invites.index');
        }
        return $this->render('pages/Invites/index.html.twig',
            [
                'invite' => $invite,
                'form' => $form->createView(),
                'current_menu' => 'invites',
                'user' => $this->security->getUser()->getUsername()
            ]);
    }

}