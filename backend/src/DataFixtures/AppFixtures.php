<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $userPasswordHasherInterface)
    {
        $this->passwordHasher = $userPasswordHasherInterface;
    }
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail("toto@toto.fr");
        $hash = $this->passwordHasher->hashPassword($user, "1234");
        $user->setPassword($hash);
        $user->setNom("Saisrien");
        $user->setPrenom("Jean");
        $user->setAdresse("2 rue Machin");
        $user->setCodePostal(94370);
        $user->setVille("Toto sur Marne");
        $manager->persist($user);
        $manager->flush();
    }
}