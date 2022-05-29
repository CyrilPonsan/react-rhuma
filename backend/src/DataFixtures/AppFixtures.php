<?php

namespace App\DataFixtures;

use App\Entity\Adresse;
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
        $adresse = new Adresse();
        $user->setEmail("toto@toto.fr");
        $hash = $this->passwordHasher->hashPassword($user, "1234");
        $adresse->setCivilite('mr');
        $user->setPassword($hash);
        $adresse->setNom("saisrien");
        $adresse->setPrenom("jean");
        $adresse->setAdresse("2 rue machin");
        $adresse->setCodePostal("94370");
        $adresse->setVille("toto sur marne");
        $adresse->setMain(true);
        $adresse->setUser($user);
        $manager->persist($user);
        $manager->persist($adresse);
        $manager->flush();
    }
}
