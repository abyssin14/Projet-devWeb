<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Cocur\Slugify\Slugify;


/**
 * @ApiResource(
 *  collectionOperations={
 *         "post"={"path"="/cadeaux"},
 *          "get"={"path"="/cadeaux"}
 *     },
 *     itemOperations={
 *         "get"={"path"="/cadeaux/{id}"},
 *         "delete"={"path"="/cadeaux/{id}"},
 *         "put"={"path"="/cadeaux/{id}"}
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\CadeauRepository")
 */


class Cadeau
{

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $prix;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $acheteurs = [];

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $montantsRecoltes = [];

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $payement;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getSlug()
    {
        $slugify = new Slugify();
        return $slugify->slugify($this->nom);
    }

    public function getAcheteurs(): ?array
    {
        return $this->acheteurs;
    }

    public function setAcheteurs(?array $acheteurs): self
    {
        $this->acheteurs = $acheteurs;

        return $this;
    }

    public function getMontantsRecoltes(): ?array
    {
        return $this->montantsRecoltes;
    }

    public function setMontantsRecoltes(?array $montantsRecoltes): self
    {
        $this->montantsRecoltes = $montantsRecoltes;

        return $this;
    }

    public function getPayement(): ?string
    {
        return $this->payement;
    }

    public function setPayement(?string $payement): self
    {
        $this->payement = $payement;

        return $this;
    }
}
