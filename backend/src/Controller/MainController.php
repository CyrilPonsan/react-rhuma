<?php

namespace App\Controller;

use App\Entity\Adresse;
use App\Entity\Panier;
use App\Entity\User;
use App\Entity\Vente;
use App\Repository\AdresseRepository;
use App\Repository\PanierRepository;
use App\Repository\ProduitRepository;
use App\Repository\UserRepository;
use App\Repository\VenteRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class MainController extends AbstractController
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $userPasswordHasherInterface)
    {
        $this->passwordHasher = $userPasswordHasherInterface;
    }

    #[Route('/api/getproduits', name: 'api_getproduits')]
    public function getProduits(ProduitRepository $produitRepository): Response
    {
        $produits = $produitRepository->findAll();
        return $this->json(['produits' => $produits]);
    }

    #[Route('/api/checkemail', name: "api_checkemail")]
    public function checkEmail(UserRepository $userRepository): Response
    {
        $email = strip_tags($_POST['email']);
        $user = $userRepository->findOneBy(['email' => $email]);
        if (isset($user)) :
            $result = false;
        else :
            $result = true;
        endif;
        return $this->json(['result' => $result]);
    }

    #[Route('/api/client/setvente', name: 'api_setvente')]
    public function setVente(
        UserRepository $userRepository,
        ProduitRepository $produitRepository,
        ManagerRegistry $doctrine
    ): Response {

        $user = $userRepository->findOneBy(['email' => $this->getUser()->getUserIdentifier()]);
        $data = json_decode($_POST['cart']);
        $manager = $doctrine->getManager();
        $vente = new Vente();
        $vente->setDate(new \DateTime());
        $vente->setUser($user);
        foreach ($data as $el) :
            $panier = new Panier();
            $panier->setVente($vente);
            $panier->setProduit($produitRepository->findOneBy(['id' => $el->id]));
            $panier->setPrixVente($el->prix);
            $panier->setQuantite($el->quantite);
            $manager->persist($panier);
        endforeach;
        $manager->persist($vente);
        $manager->flush();

        return $this->json(['response' => true]);
    }

    #[Route('/api/client/getuser', name: 'api_client_getuser')]
    public function getClient(UserRepository $userRepository, AdresseRepository $adresseRepository): Response
    {
        $user = $userRepository->findOneBy(['email' => $this->getUser()->getUserIdentifier()]);
        $adresse = $adresseRepository->findBy(['user' => $user, 'main' => 1]);

        return $this->json(['user' => $adresse]);
    }

    #[route('/api/register-user', name: 'api_register-user')]
    public function registerUser(UserRepository $userRepository, ManagerRegistry $doctrine): Response
    {
        $data = $this->stripTag();
        $email = $userRepository->findOneBy(['email' => $data[0]]);
        if (isset($email)) :
            $result = false;
        else :
            $user = new User();
            $user->setEmail($data[0]);
            $hash = $this->passwordHasher->hashPassword($user, $data[1]);
            $user->setPassword($hash);
            $manager = $doctrine->getManager();
            $manager->persist($user);
            $manager->flush();
            $result = true;
        endif;
        return $this->json(['result' => $result]);
    }

    #[Route('/api/register-adresse', name: 'api_register-adresse')]
    public function registerAdresse(ManagerRegistry $doctrine, UserRepository $userRepository): Response
    {
        $data = strip_tags($_POST['data']);
        $data = json_decode(($data));
        $user = $userRepository->findOneBy(['email' => $data->email]);
        $adresse = new Adresse();
        $adresse->setCivilite($data->civilite);
        $adresse->setPrenom($data->prenom);
        $adresse->setNom($data->nom);
        $adresse->setAdresse($data->adresse);
        $adresse->setComplement($data->complement);
        $adresse->setCodePostal($data->codePostal);
        $adresse->setVille($data->ville);
        $adresse->setUser($user);
        $adresse->setMain(true);
        $manager = $doctrine->getManager();
        $manager->persist($adresse);
        $manager->flush();

        return $this->json(['result' => true]);
    }

    #[Route('/api/client/getventes', name: 'api_client_getventes')]
    public function getVentes(PanierRepository $panierRepository, UserRepository $userRepository, VenteRepository $venteRepository): Response
    {
        $user = $userRepository->findOneBy(['email' => $this->getUser()->getUserIdentifier()]);
        $ventes = $venteRepository->findBy(['user' => $user]);
        $tmp = array();
        foreach ($ventes as $vente) :
            $paniers = $panierRepository->findBy(['vente' => $vente]);
            $quantite = 0;
            $total = 0;
            foreach ($paniers as $panier) :
                $quantite += $panier->getQuantite();
                $total += $panier->getQuantite() * $panier->getPrixVente();
            endforeach;
            array_push($tmp, [
                'id' => $vente->getId(),
                'date' => $vente->getDate(),
                'quantite' => $quantite,
                'total' => $total
            ]);
        endforeach;
        return $this->json([
            'ventes' => $tmp
        ]);
    }

    #[Route('/api/client/handshake', name: 'api_client_handshake')]
    public function handShake(): Response
    {
        if ($this->getUser()) :
            $result = true;
        else :
            $result = false;
        endif;
        return $this->json(['result' => $result]);
    }

    private function stripTag(): array
    {
        $tmp = json_decode($_POST['data']);
        $data = array();
        foreach ($tmp as $el) :
            array_push($data, strtolower(strip_tags($el)));
        endforeach;
        return $data;
    }
}
