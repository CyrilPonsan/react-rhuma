<?php

namespace App\Controller;

use App\Entity\Panier;
use App\Entity\Vente;
use App\Repository\ProduitRepository;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
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
        if ($user) :
            $result = false;
        else :
            $result = true;
        endif;
        return $this->json(['result' => $result]);
    }

    #[Route('/api/setvente', name: 'api_setvente')]
    public function setVente(
        UserRepository $clientRepository,
        ProduitRepository $produitRepository,
        ManagerRegistry $doctrine
    ): Response {

        $data = json_decode($_POST['cart']);
        $manager = $doctrine->getManager();
        $vente = new Vente();
        $vente->setDate(new \DateTime());
        $vente->setUser($clientRepository->findOneBy(['id' => 1]));
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
}
