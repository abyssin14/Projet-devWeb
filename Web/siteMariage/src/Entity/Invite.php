<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\InviteRepository")
 */
class Invite
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $allergie;

    /**
     * @ORM\Column(type="boolean")
     */
    private $accompagnant;

    /**
     * @ORM\Column(type="integer")
     */
    private $enfant;

    /**
     * @ORM\Column(type="boolean")
     */
    private $presentCeremonie;

    /**
     * @ORM\Column(type="boolean")
     */
    private $presentVinDHonneur;

    /**
     * @ORM\Column(type="boolean")
     */
    private $presentRepas;

    /**
     * @ORM\Column(type="boolean")
     */
    private $presentSoiree;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $prenom;

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getAllergie(): ?string
    {
        return $this->allergie;
    }

    public function setAllergie(?string $allergie): self
    {
        $this->allergie = $allergie;

        return $this;
    }

    public function getAccompagnant(): ?bool
    {
        return $this->accompagnant;
    }

    public function setAccompagnant(bool $accompagnant): self
    {
        $this->accompagnant = $accompagnant;

        return $this;
    }

    public function getEnfant(): ?int
    {
        return $this->enfant;
    }

    public function setEnfant(int $enfant): self
    {
        $this->enfant = $enfant;

        return $this;
    }

    public function getPresentCeremonie(): ?bool
    {
        return $this->presentCeremonie;
    }

    public function setPresentCeremonie(bool $presentCeremonie): self
    {
        $this->presentCeremonie = $presentCeremonie;

        return $this;
    }

    public function getPresentVinDHonneur(): ?bool
    {
        return $this->presentVinDHonneur;
    }

    public function setPresentVinDHonneur(bool $presentVinDHonneur): self
    {
        $this->presentVinDHonneur = $presentVinDHonneur;

        return $this;
    }

    public function getPresentRepas(): ?bool
    {
        return $this->presentRepas;
    }

    public function setPresentRepas(bool $presentRepas): self
    {
        $this->presentRepas = $presentRepas;

        return $this;
    }

    public function getPresentSoiree(): ?bool
    {
        return $this->presentSoiree;
    }

    public function setPresentSoiree(bool $presentSoiree): self
    {
        $this->presentSoiree = $presentSoiree;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }
}
