<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Utilisateur;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class UserFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
       $admin = new Utilisateur();
       $admin->setUsername('admin');
       $admin->setPassword($this->encoder->encodePassword($admin,'nimda1'));
        $manager->persist($admin);
        $user1 = new Utilisateur();
        $user1->setUsername('compte1r');
        $user1->setPassword($this->encoder->encodePassword($user1,'etpmoc1'));
        $manager->persist($user1);
        $user2 = new Utilisateur();
        $user2->setUsername('compte2nr');
        $user2->setPassword($this->encoder->encodePassword($user2,'etpmoc2'));
        $manager->persist($user2);
        $manager->flush();
    }
}
